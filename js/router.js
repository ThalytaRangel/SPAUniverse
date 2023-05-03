export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page

  }
  
  route(event) {
    event = event || window.event;
     event.preventDefault()
   
     window.history.pushState({}, "", event.target.href)
     
     this.handle()
  }

  handle() {
    const { pathname } = window.location
   
    const route = this.routes[pathname] || this.routes[404]
    
    fetch(route).then(data => data.text())
    .then(html => {
     document.querySelector('#app').innerHTML = html
    })
    .then(() => {

      let backgroundUniverse = pathname === "/universe"
      let backgroundExplore = pathname === "/explore"

      if (backgroundUniverse){
        document.querySelector('body').style.setProperty('background-image', 'var(--bg-img-universe)');
      } else if(backgroundExplore){
        document.querySelector('body').style.setProperty('background-image', 'var(--bg-img-explore)');
    } else{
      document.querySelector('body').style.setProperty('background-image', 'var(--bg-img-home)');
    }
   })
  }
}