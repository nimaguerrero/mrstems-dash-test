(self.webpackChunkmrstems_dashboard=self.webpackChunkmrstems_dashboard||[]).push([[6915],{6686:(e,t,n)=>{"use strict";n.d(t,{N0:()=>i});var o=n(639);const r=new o.OlP("JWT_OPTIONS");let i=(()=>{class e{constructor(e=null){this.tokenGetter=e&&e.tokenGetter||function(){}}urlBase64Decode(e){let t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("Illegal base64url string!")}return this.b64DecodeUnicode(t)}b64decode(e){let t="";if((e=String(e).replace(/=+$/,"")).length%4==1)throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");for(let n,o,r=0,i=0;o=e.charAt(i++);~o&&(n=r%4?64*n+o:o,r++%4)?t+=String.fromCharCode(255&n>>(-2*r&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return t}b64DecodeUnicode(e){return decodeURIComponent(Array.prototype.map.call(this.b64decode(e),e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join(""))}decodeToken(e=this.tokenGetter()){if(!e||""===e)return null;const t=e.split(".");if(3!==t.length)throw new Error("The inspected token doesn't appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.");const n=this.urlBase64Decode(t[1]);if(!n)throw new Error("Cannot decode the token.");return JSON.parse(n)}getTokenExpirationDate(e=this.tokenGetter()){let t;if(t=this.decodeToken(e),!t||!t.hasOwnProperty("exp"))return null;const n=new Date(0);return n.setUTCSeconds(t.exp),n}isTokenExpired(e=this.tokenGetter(),t){if(!e||""===e)return!0;const n=this.getTokenExpirationDate(e);return t=t||0,null!==n&&!(n.valueOf()>(new Date).valueOf()+1e3*t)}getAuthScheme(e,t){return"function"==typeof e?e(t):e}}return e.\u0275fac=function(t){return new(t||e)(o.LFG(r))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac}),e})()},1459:(e,t,n)=>{"use strict";n.d(t,{xr:()=>v,hx:()=>b});var o=n(639);const r="undefined"!=typeof performance&&void 0!==performance.now&&"function"==typeof performance.mark&&"function"==typeof performance.measure&&("function"==typeof performance.clearMarks||"function"==typeof performance.clearMeasures),i="undefined"!=typeof PerformanceObserver&&void 0!==PerformanceObserver.prototype&&"function"==typeof PerformanceObserver.prototype.constructor,s="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0);let a={},c={};const g=()=>r?performance.now():Date.now(),l=e=>{a[e]=void 0,c[e]&&(c[e]=void 0),r&&(s||performance.clearMeasures(e),performance.clearMarks(e))},p=e=>{if(r){if(s&&i){const t=new PerformanceObserver(n=>{c[e]=n.getEntries().find(t=>t.name===e),t.disconnect()});t.observe({entryTypes:["measure"]})}performance.mark(e)}a[e]=g()},d=(e,t)=>{try{const n=a[e];return r?(t||performance.mark(`${e}-end`),performance.measure(e,e,t||`${e}-end`),s?c[e]?c[e]:n?{duration:g()-n,startTime:n,entryType:"measure",name:e}:{}:performance.getEntriesByName(e).pop()||{}):n?{duration:g()-n,startTime:n,entryType:"measure",name:e}:{}}catch(n){return{}}finally{l(e),l(t||`${e}-end`)}};var u=n(8583);const h=function(e,t,n,o){return{circle:e,progress:t,"progress-dark":n,pulse:o}};function f(e,t){if(1&e&&o._UZ(0,"span",1),2&e){const e=o.oxw();o.Q6J("ngClass",o.l5B(4,h,"circle"===e.appearance,"progress"===e.animation,"progress-dark"===e.animation,"pulse"===e.animation))("ngStyle",e.theme),o.uIk("aria-label",e.ariaLabel)("aria-valuetext",e.loadingText)}}const m=new o.OlP("ngx-skeleton-loader.config");let v=(()=>{class e{constructor(e){const{appearance:t="line",animation:n="progress",theme:o=null,loadingText:r="Loading...",count:i=1,ariaLabel:s="loading"}=e||{};this.appearance=t,this.animation=n,this.theme=o,this.loadingText=r,this.count=i,this.items=[],this.ariaLabel=s}ngOnInit(){p("NgxSkeletonLoader:Rendered"),p("NgxSkeletonLoader:Loaded"),this.validateInputValues()}validateInputValues(){/^\d+$/.test(`${this.count}`)||((0,o.X6Q)()&&console.error("`NgxSkeletonLoaderComponent` need to receive 'count' a numeric value. Forcing default to \"1\"."),this.count=1),this.items.length=this.count;const e=["progress","progress-dark","pulse","false"];-1===e.indexOf(String(this.animation))&&((0,o.X6Q)()&&console.error(`\`NgxSkeletonLoaderComponent\` need to receive 'animation' as: ${e.join(", ")}. Forcing default to "progress".`),this.animation="progress"),-1===["circle","line",""].indexOf(String(this.appearance))&&((0,o.X6Q)()&&console.error("`NgxSkeletonLoaderComponent` need to receive 'appearance' as: circle or line or empty string. Forcing default to \"''\"."),this.appearance="")}ngOnChanges(e){["count","animation","appearance"].find(t=>e[t]&&(e[t].isFirstChange()||e[t].previousValue===e[t].currentValue))||this.validateInputValues()}ngAfterViewInit(){d("NgxSkeletonLoader:Rendered")}ngOnDestroy(){d("NgxSkeletonLoader:Loaded")}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(m,8))},e.\u0275cmp=o.Xpm({type:e,selectors:[["ngx-skeleton-loader"]],inputs:{appearance:"appearance",animation:"animation",theme:"theme",loadingText:"loadingText",count:"count",ariaLabel:"ariaLabel"},features:[o.TTD],decls:1,vars:1,consts:[["class","loader","aria-busy","true","aria-valuemin","0","aria-valuemax","100","role","progressbar","tabindex","0",3,"ngClass","ngStyle",4,"ngFor","ngForOf"],["aria-busy","true","aria-valuemin","0","aria-valuemax","100","role","progressbar","tabindex","0",1,"loader",3,"ngClass","ngStyle"]],template:function(e,t){1&e&&o.YNc(0,f,1,9,"span",0),2&e&&o.Q6J("ngForOf",t.items)},directives:[u.sg,u.mk,u.PC],styles:['.loader[_ngcontent-%COMP%]{background:#eff1f6 no-repeat;border-radius:4px;box-sizing:border-box;display:inline-block;height:20px;margin-bottom:10px;overflow:hidden;position:relative;width:100%;will-change:transform}.loader[_ngcontent-%COMP%]:after, .loader[_ngcontent-%COMP%]:before{box-sizing:border-box}.loader.circle[_ngcontent-%COMP%]{border-radius:50%;height:40px;margin:5px;width:40px}.loader.progress[_ngcontent-%COMP%], .loader.progress-dark[_ngcontent-%COMP%]{transform:translateZ(0)}.loader.progress-dark[_ngcontent-%COMP%]:after, .loader.progress-dark[_ngcontent-%COMP%]:before, .loader.progress[_ngcontent-%COMP%]:after, .loader.progress[_ngcontent-%COMP%]:before{box-sizing:border-box}.loader.progress-dark[_ngcontent-%COMP%]:before, .loader.progress[_ngcontent-%COMP%]:before{-webkit-animation:progress 2s ease-in-out infinite;animation:progress 2s ease-in-out infinite;background-size:200px 100%;content:"";height:100%;left:0;position:absolute;top:0;width:200px;z-index:1}.loader.progress[_ngcontent-%COMP%]:before{background-image:linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.6),hsla(0,0%,100%,0))}.loader.progress-dark[_ngcontent-%COMP%]:before{background-image:linear-gradient(90deg,transparent,rgba(0,0,0,.2),transparent)}.loader.pulse[_ngcontent-%COMP%]{-webkit-animation:pulse 1.5s cubic-bezier(.4,0,.2,1) infinite;-webkit-animation-delay:.5s;animation:pulse 1.5s cubic-bezier(.4,0,.2,1) infinite;animation-delay:.5s}@media (prefers-reduced-motion:reduce){.loader.progress[_ngcontent-%COMP%], .loader.progress-dark[_ngcontent-%COMP%], .loader.pulse[_ngcontent-%COMP%]{-webkit-animation:none;animation:none}.loader.progress[_ngcontent-%COMP%], .loader.progress-dark[_ngcontent-%COMP%]{background-image:none}}@-webkit-keyframes progress{0%{transform:translate3d(-200px,0,0)}to{transform:translate3d(calc(200px + 100vw),0,0)}}@keyframes progress{0%{transform:translate3d(-200px,0,0)}to{transform:translate3d(calc(200px + 100vw),0,0)}}@-webkit-keyframes pulse{0%{opacity:1}50%{opacity:.4}to{opacity:1}}@keyframes pulse{0%{opacity:1}50%{opacity:.4}to{opacity:1}}'],changeDetection:0}),e})(),b=(()=>{class e{static forRoot(t){return{ngModule:e,providers:[{provide:m,useValue:t}]}}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[u.ez]]}),e})()},1856:(e,t,n)=>{"use strict";n.d(t,{p:()=>g});const o=["ADMIN","USER"];var r=n(639),i=n(6686),s=n(6518);let a=(()=>{class e{constructor(e){this.authServ=e,this.roleAs="",this.helper=new i.N0,this.token=this.authServ.getToken(),this.decodeToken()}decodeToken(){const{role:e}=this.helper.decodeToken(this.token);this.roleAs=e}getRole(){return this.roleAs}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(s.e))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var c=n(6868);let g=(()=>{class e{constructor(e,t){this.roleServ=e,this.router=t}canActivate(e,t){return this.checkRole(e,t)}canActivateChild(e,t){return this.canActivate(e,t)}checkRole(e,t){return!(e.data.role!==this.roleServ.getRole()&&"ADMIN"!==this.roleServ.getRole()||!o.includes(this.roleServ.getRole()))||(this.router.navigate(["/panel"]),!1)}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(a),r.LFG(c.F0))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},6583:(e,t,n)=>{"use strict";n.d(t,{u:()=>a});var o=n(639),r=n(6686),i=n(6518);let s=(()=>{class e{constructor(e){this.authServ=e,this.helper=new r.N0,this.token=this.authServ.getToken()}isTokenExpired(){return!this.helper.isTokenExpired(this.token)}}return e.\u0275fac=function(t){return new(t||e)(o.LFG(i.e))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),a=(()=>{class e{constructor(e){this.tokenExp=e}canActivate(e,t){return this.tokenExp.isTokenExpired()}canActivateChild(e,t){return this.canActivate(e,t)}}return e.\u0275fac=function(t){return new(t||e)(o.LFG(s))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},8424:(e,t,n)=>{"use strict";n.d(t,{N:()=>r});var o=n(639);let r=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["Loading"]],decls:5,vars:0,consts:[[1,"contain-spinner"],[1,"spinner"],[1,"spinner-inner-1"],[1,"spinner-inner-2"],[1,"spinner-inner-3"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o._UZ(2,"span",2),o._UZ(3,"span",3),o._UZ(4,"span",4),o.qZA(),o.qZA())},styles:[".contain-spinner[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;justify-content:center;align-items:center;padding:1rem}.contain-spinner[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%]{width:2rem;height:2rem;animation:spinner .75s linear infinite}.contain-spinner[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;border-radius:50%}.contain-spinner[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%]   .spinner-inner-1[_ngcontent-%COMP%]{background:linear-gradient(90deg,#6a67ce00 0,#6a67ce00 50%,#6a67ce 51%)}.contain-spinner[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%]   .spinner-inner-2[_ngcontent-%COMP%]{background:linear-gradient(0deg,#fff0 0,#fff)}.contain-spinner[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%]   .spinner-inner-3[_ngcontent-%COMP%]{top:.2rem;left:.2rem;width:1.6rem;height:1.6rem;background:#fff}@keyframes spinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"]}),e})()},9942:(e,t,n)=>{"use strict";n.d(t,{S:()=>d});var o=n(5319),r=n(639),i=n(534),s=n(8613),a=n(6868),c=n(7823),g=n(6518);const l=function(){return["/panel/myprofile"]};let p=(()=>{class e{constructor(e,t){this.userServ=e,this.authServ=t,this.profile="",this.subs=new o.w}ngOnInit(){this.getProfile()}ngOnDestroy(){this.subs.unsubscribe()}getProfile(){this.subs.add(this.userServ.getProfile().subscribe(e=>this.profile=e))}logout(){this.authServ.logout()}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(s.K),r.Y36(g.e))},e.\u0275cmp=r.Xpm({type:e,selectors:[["User-options"]],decls:11,vars:3,consts:[[1,"dropdown"],[1,"dd-button"],["alt","Perfil",1,"user-img","img-circle",3,"src"],["type","checkbox","id","test",1,"dd-input"],[1,"dd-menu"],[1,"text-sm",3,"routerLink"],[1,"text-sm",3,"click"]],template:function(e,t){1&e&&(r.TgZ(0,"label",0),r.TgZ(1,"div",1),r._UZ(2,"img",2),r.qZA(),r._UZ(3,"input",3),r.TgZ(4,"ul",4),r.TgZ(5,"li"),r.TgZ(6,"a",5),r._uU(7,"Ver perfil"),r.qZA(),r.qZA(),r.TgZ(8,"li"),r.TgZ(9,"a",6),r.NdJ("click",function(){return t.logout()}),r._uU(10,"Cerrar Sesi\xf3n"),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&e&&(r.xp6(2),r.Q6J("src",t.profile,r.LSH),r.xp6(4),r.Q6J("routerLink",r.DdM(2,l)))},directives:[a.yS,c.YI],styles:['a[_ngcontent-%COMP%]{text-decoration:none;color:#141618}a[_ngcontent-%COMP%]:hover{color:#222}.dropdown[_ngcontent-%COMP%]{display:inline-block;position:relative}.dd-button[_ngcontent-%COMP%]{display:inline-block;padding:0 1rem;background-color:initial;cursor:pointer;white-space:nowrap}.dd-button[_ngcontent-%COMP%]:after{content:"";position:absolute;top:50%;right:.1rem;transform:translateY(-50%);width:0;height:0;border-left:5px solid #0000;border-right:5px solid #0000;border-top:5px solid #53575a;cursor:pointer}.dd-input[_ngcontent-%COMP%]{display:none}.dd-menu[_ngcontent-%COMP%]{z-index:3;position:absolute;top:100%;right:.2rem;border-radius:4px;padding:0;margin-top:.5rem;box-shadow:0 10px 20px #0d324d30,0 6px 6px #0d324d3b;background-color:#fff;list-style-type:none;overflow:hidden}.dd-input[_ngcontent-%COMP%] + .dd-menu[_ngcontent-%COMP%]{display:none}.dd-input[_ngcontent-%COMP%]:checked + .dd-menu[_ngcontent-%COMP%]{display:block}.dd-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:10px 20px;white-space:nowrap}.dd-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:#f6f6f6}.dd-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;margin:-10px -20px;padding:10px 20px}.dd-menu[_ngcontent-%COMP%]   li.divider[_ngcontent-%COMP%]{padding:0;border-bottom:1px solid #dfe0e0}']}),e})(),d=(()=>{class e{constructor(e,t,n){this.toggleServ=e,this.userServ=t,this.router=n,this.isToggleActive=!1,this.isToggleActive$=this.toggleServ.isToggleActiveSub.asObservable(),this.url="",this.count=0,this.subs=new o.w,this.isopened=!1}ngOnInit(){this.isToggleActive$.subscribe(e=>this.isToggleActive=e),this.getProfileImg(),this.getCountPendingReports()}ngOnDestroy(){this.subs.unsubscribe()}toggle(){this.toggleServ.toggle(this.isToggleActive)}getProfileImg(){this.subs.add(this.userServ.getProfile().subscribe(e=>this.url=e))}goToReports(){this.router.navigate(["/panel/reports"])}goToProfile(){this.router.navigate(["/panel/myprofile"])}getCountPendingReports(){this.userServ.getCountPendingReports().subscribe(e=>this.count=e)}isLogged(){return this.userServ.isLogged()}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(i.Y),r.Y36(s.K),r.Y36(a.F0))},e.\u0275cmp=r.Xpm({type:e,selectors:[["Navbar"]],decls:9,vars:1,consts:[[1,"topbar"],[1,"toggle",3,"click"],["name","menu-outline"],[1,"user"],[1,"reports",3,"click"],["name","mail-outline",1,"reports__icon"],[1,"reports__count"]],template:function(e,t){1&e&&(r.TgZ(0,"div",0),r.TgZ(1,"div",1),r.NdJ("click",function(){return t.toggle()}),r._UZ(2,"ion-icon",2),r.qZA(),r.TgZ(3,"div",3),r.TgZ(4,"div",4),r.NdJ("click",function(){return t.goToReports()}),r._UZ(5,"ion-icon",5),r.TgZ(6,"span",6),r._uU(7),r.qZA(),r.qZA(),r._UZ(8,"User-options"),r.qZA(),r.qZA()),2&e&&(r.xp6(7),r.Oqu(t.count))},directives:[c.gu,p],styles:[".topbar[_ngcontent-%COMP%]{box-shadow:0 7px 25px #00000014;width:100%;justify-content:space-between;padding:0 10px}.topbar[_ngcontent-%COMP%], .topbar[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]{height:60px;display:flex;align-items:center}.topbar[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]{position:relative;width:60px;justify-content:center;font-size:2.5em;cursor:pointer}.topbar[_ngcontent-%COMP%]   .user[_ngcontent-%COMP%]{display:flex;justify-content:space-around;align-items:center;width:20%}@media screen and (min-width: 760px){.topbar[_ngcontent-%COMP%]   .user[_ngcontent-%COMP%]{width:10%}}.topbar[_ngcontent-%COMP%]   .user[_ngcontent-%COMP%]   .reports[_ngcontent-%COMP%]{position:relative;cursor:pointer}.topbar[_ngcontent-%COMP%]   .user[_ngcontent-%COMP%]   .reports__icon[_ngcontent-%COMP%]{font-size:1.333rem}.topbar[_ngcontent-%COMP%]   .user[_ngcontent-%COMP%]   .reports__count[_ngcontent-%COMP%]{position:absolute;top:-.2rem;right:-.4rem;width:.8rem;height:.8rem;color:#fff;font-size:.563rem;background-color:#ffb900;text-align:center;padding:.1rem 0 0;border-radius:50%}"]}),e})()},1202:(e,t,n)=>{"use strict";n.d(t,{k:()=>P});var o=n(639),r=n(8002),i=n(1841),s=n(9143);let a=(()=>{class e{constructor(e,t){this.http=e,this.env=t,this.apiUrl=this.env.getApiUrl()}getSidebar(){return this.http.get(`${this.apiUrl}/sidebar`).pipe((0,r.U)(({sidebar:e})=>e))}}return e.\u0275fac=function(t){return new(t||e)(o.LFG(i.eN),o.LFG(s.I))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var c=n(534),g=n(8613),l=n(6518),p=n(8583),d=n(6868),u=n(7823),h=n(8424);const f=function(e){return[e]};function m(e,t){if(1&e&&(o.ynx(0),o.TgZ(1,"li"),o.TgZ(2,"a",3),o.TgZ(3,"span",4),o._UZ(4,"ion-icon",10),o.qZA(),o.TgZ(5,"span",9),o._uU(6),o.qZA(),o.qZA(),o.qZA(),o.BQk()),2&e){const e=t.$implicit;o.xp6(2),o.Q6J("routerLink",o.VKq(3,f,e.link)),o.xp6(2),o.Q6J("name",e.icon),o.xp6(2),o.Oqu(e.title)}}const v=function(e){return{"navigation-active":e}},b=function(){return["/perfil"]},O=function(){return["/admin/backups"]};function _(e,t){if(1&e&&(o.ynx(0),o.TgZ(1,"div",2),o.TgZ(2,"ul"),o.TgZ(3,"li"),o.TgZ(4,"a",3),o.TgZ(5,"span",4),o._UZ(6,"ion-icon",5),o.qZA(),o.TgZ(7,"span",6),o._uU(8),o.qZA(),o.qZA(),o.qZA(),o.YNc(9,m,7,5,"ng-container",7),o.TgZ(10,"li"),o.TgZ(11,"a",3),o.TgZ(12,"span",4),o._UZ(13,"ion-icon",8),o.qZA(),o.TgZ(14,"span",9),o._uU(15,"Backups"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.BQk()),2&e){const e=t.$implicit,n=o.oxw();o.xp6(1),o.Q6J("ngClass",o.VKq(5,v,n.isToggleActive)),o.xp6(3),o.Q6J("routerLink",o.DdM(7,b)),o.xp6(4),o.Oqu(n.getCompleteName()),o.xp6(1),o.Q6J("ngForOf",e),o.xp6(2),o.Q6J("routerLink",o.DdM(8,O))}}function C(e,t){1&e&&o._UZ(0,"Loading")}let P=(()=>{class e{constructor(e,t,n,o){this.sidebarServ=e,this.toggleServ=t,this.userServ=n,this.authServ=o,this.isToggleActive=!1,this.isToggleActive$=this.toggleServ.isToggleActiveSub.asObservable()}ngOnInit(){this.isToggleActive$.subscribe(e=>this.isToggleActive=e),this.sidebar$=this.sidebarServ.getSidebar()}getCompleteName(){const{user:e}=this.userServ.getTokenInformation();return`${e.name} ${e.lastname}`}logout(){this.authServ.logout()}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(a),o.Y36(c.Y),o.Y36(g.K),o.Y36(l.e))},e.\u0275cmp=o.Xpm({type:e,selectors:[["Sidebar"]],decls:4,vars:4,consts:[[4,"ngIf","ngIfElse"],["loading",""],[1,"navigation","animated","fadein",3,"ngClass"],["routerLinkActive","router-link-active",3,"routerLink"],[1,"icon"],["name","logo-apple"],[1,"title","user-dash"],[4,"ngFor","ngForOf"],["name","cloud-done-outline"],[1,"title"],[3,"name"]],template:function(e,t){if(1&e&&(o.YNc(0,_,16,9,"ng-container",0),o.ALo(1,"async"),o.YNc(2,C,1,0,"ng-template",null,1,o.W1O)),2&e){const e=o.MAs(3);o.Q6J("ngIf",o.lcZ(1,2,t.sidebar$))("ngIfElse",e)}},directives:[p.O5,p.mk,d.yS,d.Od,u.YI,u.gu,p.sg,h.N],pipes:[p.Ov],styles:['.navigation[_ngcontent-%COMP%]{position:fixed;width:300px;height:100%;background-color:#6a67ce;transition:.5s;overflow:hidden}@media screen and (max-width: 875px){.navigation[_ngcontent-%COMP%]{width:80px}}@media screen and (max-width: 675px){.navigation[_ngcontent-%COMP%]{width:0}}.navigation-active[_ngcontent-%COMP%]{width:80px}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0;padding:0;position:absolute;top:0;left:0;width:100%}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{position:relative;width:100%;padding-left:10px;list-style:none;border-top-left-radius:30px;border-bottom-left-radius:30px;cursor:pointer}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child{margin-bottom:40px;pointer-events:none}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .router-link-active[_ngcontent-%COMP%]{background-color:#fff;color:#6a67ce;border-top-left-radius:30px;border-bottom-left-radius:30px}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:#fff;margin-left:10px;width:calc(100% - 10px)}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]{color:#6a67ce}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .router-link-active[_ngcontent-%COMP%]:before, .navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]:before{content:"";position:absolute;top:-50px;right:0;width:50px;height:50px;border-radius:50%;box-shadow:35px 35px 0 10px #fff;pointer-events:none}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .router-link-active[_ngcontent-%COMP%]:after, .navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:-50px;right:0;width:50px;height:50px;background:#0000;border-radius:50%;box-shadow:35px -35px 0 10px #fff}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{position:relative;display:block;width:100%;display:flex;text-decoration:none;color:#fff}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{position:relative;display:block;min-width:60px;height:60px;line-height:70px;text-align:center}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:1.75em}.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{position:relative;display:block;padding:0 10px;height:60px;line-height:60px;text-align:start;white-space:nowrap}.user-dash[_ngcontent-%COMP%]{max-width:200px;text-overflow:ellipsis;overflow:hidden}']}),e})()},977:(e,t,n)=>{"use strict";n.d(t,{h:()=>i});var o=n(8259),r=n.n(o);class i{constructor(e){this.router=e}submitSuccess(e,t,n,o){r().fire({icon:"success",title:"ok",text:t}),this.router.navigate([o])}error(e){r().fire({icon:"error",title:"Error",text:e})}submitSuccessNoRedirect(e,t,n){r().fire({icon:"success",title:e,text:t})}}},9530:(e,t,n)=>{"use strict";n.d(t,{f:()=>i});var o=n(8259),r=n.n(o);class i{constructor(){}existImg(e){return 0!=e.target.files.length||(r().fire({icon:"error",title:"No hay imagen"}),!1)}sizeImg(e,t){return!(e.size>=t&&(r().fire({icon:"error",title:"La imagen no puede superar los 4mb"}),1))}typesImg(e,t){return!!t.includes(e.type)||(r().fire({icon:"error",title:"No es una imagen"}),!1)}}},981:(e,t,n)=>{"use strict";n.d(t,{G:()=>o});const o=["image/jpg","image/png","image/jpeg","image/webp"]},534:(e,t,n)=>{"use strict";n.d(t,{Y:()=>i});var o=n(7709),r=n(639);let i=(()=>{class e{constructor(){this.isToggleActiveSub=new o.xQ}toggle(e){this.isToggleActiveSub.next(!e)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},8613:(e,t,n)=>{"use strict";n.d(t,{K:()=>g});var o=n(6686),r=n(8002),i=n(639),s=n(6518),a=n(1841),c=n(9143);let g=(()=>{class e{constructor(e,t,n){this.auth=e,this.http=t,this.env=n,this.apiUrl=this.env.getApiUrl()}getTokenInformation(){const e=this.auth.getToken(),t=new o.N0;return{user:t.decodeToken(e),expirationDate:t.getTokenExpirationDate(e)}}isLogged(){return"true"===localStorage.getItem("islogged")}getUser(){return this.user}getProfile(){return this.http.get(`${this.apiUrl}/users/profile`).pipe((0,r.U)(({url:e})=>e))}getCountPendingReports(){return this.http.get(`${this.apiUrl}/users/reports/count`).pipe((0,r.U)(({count:e})=>e))}getExpirationDate(){return this.expirationDate}}return e.\u0275fac=function(t){return new(t||e)(i.LFG(s.e),i.LFG(a.eN),i.LFG(c.I))},e.\u0275prov=i.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},9757:(e,t,n)=>{"use strict";n.d(t,{S:()=>r});var o=n(639);let r=(()=>{class e{constructor(){this.onlyEmail="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$",this.onlyNumber="[0-9]{1,6}",this.onlyString="^[a-zA-Z_ ]*$"}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);