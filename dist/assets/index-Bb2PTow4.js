var _f=i=>{throw TypeError(i)};var $a=(i,e,t)=>e.has(i)?_f("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t);function xf(i,e){for(var t=0;t<e.length;t++){const n=e[t];if(typeof n!="string"&&!Array.isArray(n)){for(const s in n)if(s!=="default"&&!(s in i)){const a=Object.getOwnPropertyDescriptor(n,s);a&&Object.defineProperty(i,s,a.get?a:{enumerable:!0,get:()=>n[s]})}}}return Object.freeze(Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zl="169",Mf=0,Od=1,Sf=2,Pu=1,Lu=2,xi=3,ri=0,sn=1,nn=2,Yi=0,pa=1,yn=2,Ud=3,Fd=4,wf=5,ys=100,Ef=101,Tf=102,Cf=103,Af=104,Rf=200,Pf=201,Lf=202,If=203,Xc=204,qc=205,Df=206,kf=207,Nf=208,Of=209,Uf=210,Ff=211,Bf=212,$f=213,zf=214,jc=0,Yc=1,Kc=2,ya=3,Jc=4,Zc=5,Qc=6,el=7,Iu=0,Gf=1,Hf=2,Ki=0,Vf=1,Wf=2,Xf=3,Du=4,qf=5,jf=6,Yf=7,ku=300,ba=301,_a=302,tl=303,nl=304,zo=306,So=1e3,xs=1001,il=1002,bn=1003,Kf=1004,Tr=1005,Wn=1006,tc=1007,Ms=1008,Ei=1009,Nu=1010,Ou=1011,ur=1012,Ql=1013,Es=1014,ii=1015,yr=1016,ed=1017,td=1018,xa=1020,Uu=35902,Fu=1021,Bu=1022,Xn=1023,$u=1024,zu=1025,fa=1026,Ma=1027,nd=1028,id=1029,Gu=1030,sd=1031,ad=1033,co=33776,lo=33777,ho=33778,uo=33779,sl=35840,al=35841,rl=35842,ol=35843,cl=36196,ll=37492,dl=37496,hl=37808,ul=37809,pl=37810,fl=37811,ml=37812,gl=37813,vl=37814,yl=37815,bl=37816,_l=37817,xl=37818,Ml=37819,Sl=37820,wl=37821,po=36492,El=36494,Tl=36495,Hu=36283,Cl=36284,Al=36285,Rl=36286,Jf=3200,Zf=3201,Vu=0,Qf=1,Xi="",Tn="srgb",is="srgb-linear",rd="display-p3",Go="display-p3-linear",wo="linear",bt="srgb",Eo="rec709",To="p3",Xs=7680,Bd=519,em=512,tm=513,nm=514,Wu=515,im=516,sm=517,am=518,rm=519,Pl=35044,$d=35048,zd="300 es",Mi=2e3,Co=2001;class Ra{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fo=Math.PI/180,Ao=180/Math.PI;function Ji(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]).toLowerCase()}function Jt(i,e,t){return Math.max(e,Math.min(t,i))}function om(i,e){return(i%e+e)%e}function nc(i,e,t){return(1-t)*i+t*e}function ti(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Me{constructor(e=0,t=0){Me.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*n-r*s+e.x,this.y=a*s+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,n,s,a,r,o,c,l){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,r,o,c,l)}set(e,t,n,s,a,r,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=a,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,r=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],v=s[0],m=s[3],f=s[6],_=s[1],b=s[4],M=s[7],I=s[2],w=s[5],E=s[8];return a[0]=r*v+o*_+c*I,a[3]=r*m+o*b+c*w,a[6]=r*f+o*M+c*E,a[1]=l*v+h*_+d*I,a[4]=l*m+h*b+d*w,a[7]=l*f+h*M+d*E,a[2]=u*v+p*_+g*I,a[5]=u*m+p*b+g*w,a[8]=u*f+p*M+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*r*h-t*o*l-n*a*h+n*o*c+s*a*l-s*r*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*r-o*l,u=o*c-h*a,p=l*a-r*c,g=t*d+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*l-h*n)*v,e[2]=(o*n-s*r)*v,e[3]=u*v,e[4]=(h*t-s*c)*v,e[5]=(s*a-o*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(r*t-n*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,a,r,o){const c=Math.cos(a),l=Math.sin(a);return this.set(n*c,n*l,-n*(c*r+l*o)+r+e,-s*l,s*c,-s*(-l*r+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ic.makeScale(e,t)),this}rotate(e){return this.premultiply(ic.makeRotation(-e)),this}translate(e,t){return this.premultiply(ic.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ic=new Ye;function Xu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function cm(){const i=Ro("canvas");return i.style.display="block",i}const Gd={};function mo(i){i in Gd||(Gd[i]=!0,console.warn(i))}function lm(i,e,t){return new Promise(function(n,s){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}function dm(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function hm(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Hd=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Vd=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),za={[is]:{transfer:wo,primaries:Eo,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Tn]:{transfer:bt,primaries:Eo,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Go]:{transfer:wo,primaries:To,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Vd),fromReference:i=>i.applyMatrix3(Hd)},[rd]:{transfer:bt,primaries:To,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Vd),fromReference:i=>i.applyMatrix3(Hd).convertLinearToSRGB()}},um=new Set([is,Go]),dt={enabled:!0,_workingColorSpace:is,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!um.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=za[e].toReference,s=za[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return za[i].primaries},getTransfer:function(i){return i===Xi?wo:za[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(za[e].luminanceCoefficients)}};function ma(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function sc(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qs;class pm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{qs===void 0&&(qs=Ro("canvas")),qs.width=e.width,qs.height=e.height;const n=qs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=qs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ro("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=ma(a[r]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ma(t[n]/255)*255):t[n]=ma(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let fm=0;class qu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=Ji(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(ac(s[r].image)):a.push(ac(s[r]))}else a=ac(s);n.url=a}return t||(e.images[this.uuid]=n),n}}function ac(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mm=0;class an extends Ra{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,n=xs,s=xs,a=Wn,r=Ms,o=Xn,c=Ei,l=an.DEFAULT_ANISOTROPY,h=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=Ji(),this.name="",this.source=new qu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ku)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case So:e.x=e.x-Math.floor(e.x);break;case xs:e.x=e.x<0?0:1;break;case il:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case So:e.y=e.y-Math.floor(e.y);break;case xs:e.y=e.y<0?0:1;break;case il:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=ku;an.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,n=0,s=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*n+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*n+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*n+r[11]*s+r[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,a;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],g=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,M=(p+1)/2,I=(f+1)/2,w=(h+u)/4,E=(d+v)/4,C=(g+m)/4;return b>M&&b>I?b<.01?(n=0,s=.707106781,a=.707106781):(n=Math.sqrt(b),s=w/n,a=E/n):M>I?M<.01?(n=.707106781,s=0,a=.707106781):(s=Math.sqrt(M),n=w/s,a=C/s):I<.01?(n=.707106781,s=.707106781,a=0):(a=Math.sqrt(I),n=E/a,s=C/a),this.set(n,s,a,t),this}let _=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-v)/_,this.z=(u-h)/_,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gm extends Ra{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new an(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new qu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ts extends gm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ju extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=bn,this.minFilter=bn,this.wrapR=xs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class vm extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=bn,this.minFilter=bn,this.wrapR=xs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pa{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,a,r,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3];const u=a[r+0],p=a[r+1],g=a[r+2],v=a[r+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(d!==v||c!==u||l!==p||h!==g){let m=1-o;const f=c*u+l*p+h*g+d*v,_=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const I=Math.sqrt(b),w=Math.atan2(I,f*_);m=Math.sin(m*w)/I,o=Math.sin(o*w)/I}const M=o*_;if(c=c*m+u*M,l=l*m+p*M,h=h*m+g*M,d=d*m+v*M,m===1-o){const I=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=I,l*=I,h*=I,d*=I}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,a,r){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=a[r],u=a[r+1],p=a[r+2],g=a[r+3];return e[t]=o*g+h*d+c*p-l*u,e[t+1]=c*g+h*u+l*d-o*p,e[t+2]=l*g+h*p+o*u-c*d,e[t+3]=h*g-o*d-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(a/2),u=c(n/2),p=c(s/2),g=c(a/2);switch(r){case"XYZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"YZX":this._x=u*h*d+l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d-u*p*g;break;case"XZY":this._x=u*h*d-l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],a=t[8],r=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(a-l)*p,this._z=(r-s)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(a+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(a-l)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(r-s)/p,this._x=(a+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Jt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,a=e._z,r=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+r*o+s*l-a*c,this._y=s*h+r*c+a*o-n*l,this._z=a*h+r*l+n*c-s*o,this._w=r*h-n*o-s*c-a*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,a=this._z,r=this._w;let o=r*e._w+n*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=n,this._y=s,this._z=a,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*r+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*a+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=r*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=a*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*s,this.y=a[1]*t+a[4]*n+a[7]*s,this.z=a[2]*t+a[5]*n+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*n+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*n+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*n+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,a=e.x,r=e.y,o=e.z,c=e.w,l=2*(r*s-o*n),h=2*(o*t-a*s),d=2*(a*n-r*t);return this.x=t+c*l+r*d-o*h,this.y=n+c*h+o*l-a*d,this.z=s+c*d+a*h-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s,this.y=a[1]*t+a[5]*n+a[9]*s,this.z=a[2]*t+a[6]*n+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,a=e.z,r=t.x,o=t.y,c=t.z;return this.x=s*c-a*o,this.y=a*r-n*c,this.z=n*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return rc.copy(this).projectOnVector(e),this.sub(rc)}reflect(e){return this.sub(rc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const rc=new L,Wd=new Pa;class Us{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Gn):Gn.fromBufferAttribute(a,r),Gn.applyMatrix4(e.matrixWorld),this.expandByPoint(Gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Cr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cr.copy(n.boundingBox)),Cr.applyMatrix4(e.matrixWorld),this.union(Cr)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gn),Gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ga),Ar.subVectors(this.max,Ga),js.subVectors(e.a,Ga),Ys.subVectors(e.b,Ga),Ks.subVectors(e.c,Ga),Ui.subVectors(Ys,js),Fi.subVectors(Ks,Ys),ls.subVectors(js,Ks);let t=[0,-Ui.z,Ui.y,0,-Fi.z,Fi.y,0,-ls.z,ls.y,Ui.z,0,-Ui.x,Fi.z,0,-Fi.x,ls.z,0,-ls.x,-Ui.y,Ui.x,0,-Fi.y,Fi.x,0,-ls.y,ls.x,0];return!oc(t,js,Ys,Ks,Ar)||(t=[1,0,0,0,1,0,0,0,1],!oc(t,js,Ys,Ks,Ar))?!1:(Rr.crossVectors(Ui,Fi),t=[Rr.x,Rr.y,Rr.z],oc(t,js,Ys,Ks,Ar))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const mi=[new L,new L,new L,new L,new L,new L,new L,new L],Gn=new L,Cr=new Us,js=new L,Ys=new L,Ks=new L,Ui=new L,Fi=new L,ls=new L,Ga=new L,Ar=new L,Rr=new L,ds=new L;function oc(i,e,t,n,s){for(let a=0,r=i.length-3;a<=r;a+=3){ds.fromArray(i,a);const o=s.x*Math.abs(ds.x)+s.y*Math.abs(ds.y)+s.z*Math.abs(ds.z),c=e.dot(ds),l=t.dot(ds),h=n.dot(ds);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const ym=new Us,Ha=new L,cc=new L;class Fs{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ym.setFromPoints(e).getCenter(n);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ha.subVectors(e,this.center);const t=Ha.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ha,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ha.copy(e.center).add(cc)),this.expandByPoint(Ha.copy(e.center).sub(cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gi=new L,lc=new L,Pr=new L,Bi=new L,dc=new L,Lr=new L,hc=new L;class od{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gi.copy(this.origin).addScaledVector(this.direction,t),gi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){lc.copy(e).add(t).multiplyScalar(.5),Pr.copy(t).sub(e).normalize(),Bi.copy(this.origin).sub(lc);const a=e.distanceTo(t)*.5,r=-this.direction.dot(Pr),o=Bi.dot(this.direction),c=-Bi.dot(Pr),l=Bi.lengthSq(),h=Math.abs(1-r*r);let d,u,p,g;if(h>0)if(d=r*c-o,u=r*o-c,g=a*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,p=d*(d+r*u+2*o)+u*(r*d+u+2*c)+l}else u=a,d=Math.max(0,-(r*u+o)),p=-d*d+u*(u+2*c)+l;else u=-a,d=Math.max(0,-(r*u+o)),p=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-r*a+o)),u=d>0?-a:Math.min(Math.max(-a,-c),a),p=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-a,-c),a),p=u*(u+2*c)+l):(d=Math.max(0,-(r*a+o)),u=d>0?a:Math.min(Math.max(-a,-c),a),p=-d*d+u*(u+2*c)+l);else u=r>0?-a:a,d=Math.max(0,-(r*u+o)),p=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(lc).addScaledVector(Pr,u),p}intersectSphere(e,t){gi.subVectors(e.center,this.origin);const n=gi.dot(this.direction),s=gi.dot(gi)-n*n,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=n-r,c=n+r;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,a,r,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(a=(e.min.y-u.y)*h,r=(e.max.y-u.y)*h):(a=(e.max.y-u.y)*h,r=(e.min.y-u.y)*h),n>r||a>s||((a>n||isNaN(n))&&(n=a),(r<s||isNaN(s))&&(s=r),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,gi)!==null}intersectTriangle(e,t,n,s,a){dc.subVectors(t,e),Lr.subVectors(n,e),hc.crossVectors(dc,Lr);let r=this.direction.dot(hc),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Bi.subVectors(this.origin,e);const c=o*this.direction.dot(Lr.crossVectors(Bi,Lr));if(c<0)return null;const l=o*this.direction.dot(dc.cross(Bi));if(l<0||c+l>r)return null;const h=-o*Bi.dot(hc);return h<0?null:this.at(h/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,n,s,a,r,o,c,l,h,d,u,p,g,v,m){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,r,o,c,l,h,d,u,p,g,v,m)}set(e,t,n,s,a,r,o,c,l,h,d,u,p,g,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=a,f[5]=r,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Js.setFromMatrixColumn(e,0).length(),a=1/Js.setFromMatrixColumn(e,1).length(),r=1/Js.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,a=e.z,r=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const u=r*h,p=r*d,g=o*h,v=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=u-v*l,t[9]=-o*c,t[2]=v-u*l,t[6]=g+p*l,t[10]=r*c}else if(e.order==="YXZ"){const u=c*h,p=c*d,g=l*h,v=l*d;t[0]=u+v*o,t[4]=g*o-p,t[8]=r*l,t[1]=r*d,t[5]=r*h,t[9]=-o,t[2]=p*o-g,t[6]=v+u*o,t[10]=r*c}else if(e.order==="ZXY"){const u=c*h,p=c*d,g=l*h,v=l*d;t[0]=u-v*o,t[4]=-r*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=r*h,t[9]=v-u*o,t[2]=-r*l,t[6]=o,t[10]=r*c}else if(e.order==="ZYX"){const u=r*h,p=r*d,g=o*h,v=o*d;t[0]=c*h,t[4]=g*l-p,t[8]=u*l+v,t[1]=c*d,t[5]=v*l+u,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=r*c}else if(e.order==="YZX"){const u=r*c,p=r*l,g=o*c,v=o*l;t[0]=c*h,t[4]=v-u*d,t[8]=g*d+p,t[1]=d,t[5]=r*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=r*c,p=r*l,g=o*c,v=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+v,t[5]=r*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bm,e,_m)}lookAt(e,t,n){const s=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),$i.crossVectors(n,Sn),$i.lengthSq()===0&&(Math.abs(n.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),$i.crossVectors(n,Sn)),$i.normalize(),Ir.crossVectors(Sn,$i),s[0]=$i.x,s[4]=Ir.x,s[8]=Sn.x,s[1]=$i.y,s[5]=Ir.y,s[9]=Sn.y,s[2]=$i.z,s[6]=Ir.z,s[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,r=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],_=n[3],b=n[7],M=n[11],I=n[15],w=s[0],E=s[4],C=s[8],U=s[12],y=s[1],x=s[5],N=s[9],O=s[13],G=s[2],F=s[6],R=s[10],W=s[14],Y=s[3],ie=s[7],D=s[11],P=s[15];return a[0]=r*w+o*y+c*G+l*Y,a[4]=r*E+o*x+c*F+l*ie,a[8]=r*C+o*N+c*R+l*D,a[12]=r*U+o*O+c*W+l*P,a[1]=h*w+d*y+u*G+p*Y,a[5]=h*E+d*x+u*F+p*ie,a[9]=h*C+d*N+u*R+p*D,a[13]=h*U+d*O+u*W+p*P,a[2]=g*w+v*y+m*G+f*Y,a[6]=g*E+v*x+m*F+f*ie,a[10]=g*C+v*N+m*R+f*D,a[14]=g*U+v*O+m*W+f*P,a[3]=_*w+b*y+M*G+I*Y,a[7]=_*E+b*x+M*F+I*ie,a[11]=_*C+b*N+M*R+I*D,a[15]=_*U+b*O+M*W+I*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],a=e[12],r=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+a*c*d-s*l*d-a*o*u+n*l*u+s*o*p-n*c*p)+v*(+t*c*p-t*l*u+a*r*u-s*r*p+s*l*h-a*c*h)+m*(+t*l*d-t*o*p-a*r*d+n*r*p+a*o*h-n*l*h)+f*(-s*o*h-t*c*d+t*o*u+s*r*d-n*r*u+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],_=d*m*l-v*u*l+v*c*p-o*m*p-d*c*f+o*u*f,b=g*u*l-h*m*l-g*c*p+r*m*p+h*c*f-r*u*f,M=h*v*l-g*d*l+g*o*p-r*v*p-h*o*f+r*d*f,I=g*d*c-h*v*c-g*o*u+r*v*u+h*o*m-r*d*m,w=t*_+n*b+s*M+a*I;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/w;return e[0]=_*E,e[1]=(v*u*a-d*m*a-v*s*p+n*m*p+d*s*f-n*u*f)*E,e[2]=(o*m*a-v*c*a+v*s*l-n*m*l-o*s*f+n*c*f)*E,e[3]=(d*c*a-o*u*a-d*s*l+n*u*l+o*s*p-n*c*p)*E,e[4]=b*E,e[5]=(h*m*a-g*u*a+g*s*p-t*m*p-h*s*f+t*u*f)*E,e[6]=(g*c*a-r*m*a-g*s*l+t*m*l+r*s*f-t*c*f)*E,e[7]=(r*u*a-h*c*a+h*s*l-t*u*l-r*s*p+t*c*p)*E,e[8]=M*E,e[9]=(g*d*a-h*v*a-g*n*p+t*v*p+h*n*f-t*d*f)*E,e[10]=(r*v*a-g*o*a+g*n*l-t*v*l-r*n*f+t*o*f)*E,e[11]=(h*o*a-r*d*a-h*n*l+t*d*l+r*n*p-t*o*p)*E,e[12]=I*E,e[13]=(h*v*s-g*d*s+g*n*u-t*v*u-h*n*m+t*d*m)*E,e[14]=(g*o*s-r*v*s-g*n*c+t*v*c+r*n*m-t*o*m)*E,e[15]=(r*d*s-h*o*s+h*n*c-t*d*c-r*n*u+t*o*u)*E,this}scale(e){const t=this.elements,n=e.x,s=e.y,a=e.z;return t[0]*=n,t[4]*=s,t[8]*=a,t[1]*=n,t[5]*=s,t[9]*=a,t[2]*=n,t[6]*=s,t[10]*=a,t[3]*=n,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),a=1-n,r=e.x,o=e.y,c=e.z,l=a*r,h=a*o;return this.set(l*r+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*r,0,l*c-s*o,h*c+s*r,a*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,a,r){return this.set(1,n,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,a=t._x,r=t._y,o=t._z,c=t._w,l=a+a,h=r+r,d=o+o,u=a*l,p=a*h,g=a*d,v=r*h,m=r*d,f=o*d,_=c*l,b=c*h,M=c*d,I=n.x,w=n.y,E=n.z;return s[0]=(1-(v+f))*I,s[1]=(p+M)*I,s[2]=(g-b)*I,s[3]=0,s[4]=(p-M)*w,s[5]=(1-(u+f))*w,s[6]=(m+_)*w,s[7]=0,s[8]=(g+b)*E,s[9]=(m-_)*E,s[10]=(1-(u+v))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let a=Js.set(s[0],s[1],s[2]).length();const r=Js.set(s[4],s[5],s[6]).length(),o=Js.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Hn.copy(this);const l=1/a,h=1/r,d=1/o;return Hn.elements[0]*=l,Hn.elements[1]*=l,Hn.elements[2]*=l,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=d,Hn.elements[9]*=d,Hn.elements[10]*=d,t.setFromRotationMatrix(Hn),n.x=a,n.y=r,n.z=o,this}makePerspective(e,t,n,s,a,r,o=Mi){const c=this.elements,l=2*a/(t-e),h=2*a/(n-s),d=(t+e)/(t-e),u=(n+s)/(n-s);let p,g;if(o===Mi)p=-(r+a)/(r-a),g=-2*r*a/(r-a);else if(o===Co)p=-r/(r-a),g=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,a,r,o=Mi){const c=this.elements,l=1/(t-e),h=1/(n-s),d=1/(r-a),u=(t+e)*l,p=(n+s)*h;let g,v;if(o===Mi)g=(r+a)*d,v=-2*d;else if(o===Co)g=a*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Js=new L,Hn=new lt,bm=new L(0,0,0),_m=new L(1,1,1),$i=new L,Ir=new L,Sn=new L,Xd=new lt,qd=new Pa;class oi{constructor(e=0,t=0,n=0,s=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-Jt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Jt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qd.setFromEuler(this),this.setFromQuaternion(qd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class Yu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let xm=0;const jd=new L,Zs=new Pa,vi=new lt,Dr=new L,Va=new L,Mm=new L,Sm=new Pa,Yd=new L(1,0,0),Kd=new L(0,1,0),Jd=new L(0,0,1),Zd={type:"added"},wm={type:"removed"},Qs={type:"childadded",child:null},uc={type:"childremoved",child:null};class Tt extends Ra{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=Ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new L,t=new oi,n=new Pa,s=new L(1,1,1);function a(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new lt},normalMatrix:{value:new Ye}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.multiply(Zs),this}rotateOnWorldAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.premultiply(Zs),this}rotateX(e){return this.rotateOnAxis(Yd,e)}rotateY(e){return this.rotateOnAxis(Kd,e)}rotateZ(e){return this.rotateOnAxis(Jd,e)}translateOnAxis(e,t){return jd.copy(e).applyQuaternion(this.quaternion),this.position.add(jd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yd,e)}translateY(e){return this.translateOnAxis(Kd,e)}translateZ(e){return this.translateOnAxis(Jd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Dr.copy(e):Dr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Va.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(Va,Dr,this.up):vi.lookAt(Dr,Va,this.up),this.quaternion.setFromRotationMatrix(vi),s&&(vi.extractRotation(s.matrixWorld),Zs.setFromRotationMatrix(vi),this.quaternion.premultiply(Zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zd),Qs.child=e,this.dispatchEvent(Qs),Qs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wm),uc.child=e,this.dispatchEvent(uc),uc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zd),Qs.child=e,this.dispatchEvent(Qs),Qs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Va,e,Mm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Va,Sm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];a(e.shapes,d)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(a(e.animations,c))}}if(t){const o=r(e.geometries),c=r(e.materials),l=r(e.textures),h=r(e.images),d=r(e.shapes),u=r(e.skeletons),p=r(e.animations),g=r(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function r(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Tt.DEFAULT_UP=new L(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Vn=new L,yi=new L,pc=new L,bi=new L,ea=new L,ta=new L,Qd=new L,fc=new L,mc=new L,gc=new L,vc=new pt,yc=new pt,bc=new pt;class An{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Vn.subVectors(e,t),s.cross(Vn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,n,s,a){Vn.subVectors(s,t),yi.subVectors(n,t),pc.subVectors(e,t);const r=Vn.dot(Vn),o=Vn.dot(yi),c=Vn.dot(pc),l=yi.dot(yi),h=yi.dot(pc),d=r*l-o*o;if(d===0)return a.set(0,0,0),null;const u=1/d,p=(l*c-o*h)*u,g=(r*h-o*c)*u;return a.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(e,t,n,s,a,r,o,c){return this.getBarycoord(e,t,n,s,bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,bi.x),c.addScaledVector(r,bi.y),c.addScaledVector(o,bi.z),c)}static getInterpolatedAttribute(e,t,n,s,a,r){return vc.setScalar(0),yc.setScalar(0),bc.setScalar(0),vc.fromBufferAttribute(e,t),yc.fromBufferAttribute(e,n),bc.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(vc,a.x),r.addScaledVector(yc,a.y),r.addScaledVector(bc,a.z),r}static isFrontFacing(e,t,n,s){return Vn.subVectors(n,t),yi.subVectors(e,t),Vn.cross(yi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),Vn.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return An.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,a){return An.getInterpolation(e,this.a,this.b,this.c,t,n,s,a)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,a=this.c;let r,o;ea.subVectors(s,n),ta.subVectors(a,n),fc.subVectors(e,n);const c=ea.dot(fc),l=ta.dot(fc);if(c<=0&&l<=0)return t.copy(n);mc.subVectors(e,s);const h=ea.dot(mc),d=ta.dot(mc);if(h>=0&&d<=h)return t.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return r=c/(c-h),t.copy(n).addScaledVector(ea,r);gc.subVectors(e,a);const p=ea.dot(gc),g=ta.dot(gc);if(g>=0&&p<=g)return t.copy(a);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(ta,o);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Qd.subVectors(a,s),o=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(Qd,o);const f=1/(m+v+u);return r=v*f,o=u*f,t.copy(n).addScaledVector(ea,r).addScaledVector(ta,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ku={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},kr={h:0,s:0,l:0};function _c(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=dt.workingColorSpace){if(e=om(e,1),t=Jt(t,0,1),n=Jt(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,r=2*n-a;this.r=_c(r,a,e+1/3),this.g=_c(r,a,e),this.b=_c(r,a,e-1/3)}return dt.toWorkingColorSpace(this,s),this}setStyle(e,t=Tn){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tn){const n=Ku[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ma(e.r),this.g=ma(e.g),this.b=ma(e.b),this}copyLinearToSRGB(e){return this.r=sc(e.r),this.g=sc(e.g),this.b=sc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tn){return dt.fromWorkingColorSpace(en.copy(this),e),Math.round(Jt(en.r*255,0,255))*65536+Math.round(Jt(en.g*255,0,255))*256+Math.round(Jt(en.b*255,0,255))}getHexString(e=Tn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(en.copy(this),t);const n=en.r,s=en.g,a=en.b,r=Math.max(n,s,a),o=Math.min(n,s,a);let c,l;const h=(o+r)/2;if(o===r)c=0,l=0;else{const d=r-o;switch(l=h<=.5?d/(r+o):d/(2-r-o),r){case n:c=(s-a)/d+(s<a?6:0);break;case s:c=(a-n)/d+2;break;case a:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(en.copy(this),t),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=Tn){dt.fromWorkingColorSpace(en.copy(this),e);const t=en.r,n=en.g,s=en.b;return e!==Tn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(zi),this.setHSL(zi.h+e,zi.s+t,zi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zi),e.getHSL(kr);const n=nc(zi.h,kr.h,t),s=nc(zi.s,kr.s,t),a=nc(zi.l,kr.l,t);return this.setHSL(n,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*s,this.g=a[1]*t+a[4]*n+a[7]*s,this.b=a[2]*t+a[5]*n+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new Ue;Ue.NAMES=Ku;let Em=0;class ss extends Ra{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=Ji(),this.name="",this.type="Material",this.blending=pa,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xc,this.blendDst=qc,this.blendEquation=ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=ya,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xs,this.stencilZFail=Xs,this.stencilZPass=Xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pa&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xc&&(n.blendSrc=this.blendSrc),this.blendDst!==qc&&(n.blendDst=this.blendDst),this.blendEquation!==ys&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ya&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(a){const r=[];for(const o in a){const c=a[o];delete c.metadata,r.push(c)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(n.textures=a),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let a=0;a!==s;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Lt extends ss{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=Iu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nt=new L,Nr=new Me;class Wt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pl,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Nr.fromBufferAttribute(this,t),Nr.applyMatrix3(e),this.setXY(t,Nr.x,Nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,a){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),a=ut(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pl&&(e.usage=this.usage),e}}class Ju extends Wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zu extends Wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ft extends Wt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Tm=0;const Dn=new lt,xc=new Tt,na=new L,wn=new Us,Wa=new Us,Ht=new L;class Ct extends Ra{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Ji(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xu(e)?Zu:Ju)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ye().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,t,n){return Dn.makeTranslation(e,t,n),this.applyMatrix4(Dn),this}scale(e,t,n){return Dn.makeScale(e,t,n),this.applyMatrix4(Dn),this}lookAt(e){return xc.lookAt(e),xc.updateMatrix(),this.applyMatrix4(xc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(na).negate(),this.translate(na.x,na.y,na.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const a=e[n];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new ft(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Us);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const a=t[n];wn.setFromBufferAttribute(a),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];Wa.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(wn.min,Wa.min),wn.expandByPoint(Ht),Ht.addVectors(wn.max,Wa.max),wn.expandByPoint(Ht)):(wn.expandByPoint(Wa.min),wn.expandByPoint(Wa.max))}wn.getCenter(n);let s=0;for(let a=0,r=e.count;a<r;a++)Ht.fromBufferAttribute(e,a),s=Math.max(s,n.distanceToSquared(Ht));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ht.fromBufferAttribute(o,l),c&&(na.fromBufferAttribute(e,l),Ht.add(na)),s=Math.max(s,n.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wt(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),o=[],c=[];for(let C=0;C<n.count;C++)o[C]=new L,c[C]=new L;const l=new L,h=new L,d=new L,u=new Me,p=new Me,g=new Me,v=new L,m=new L;function f(C,U,y){l.fromBufferAttribute(n,C),h.fromBufferAttribute(n,U),d.fromBufferAttribute(n,y),u.fromBufferAttribute(a,C),p.fromBufferAttribute(a,U),g.fromBufferAttribute(a,y),h.sub(l),d.sub(l),p.sub(u),g.sub(u);const x=1/(p.x*g.y-g.x*p.y);isFinite(x)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(x),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(x),o[C].add(v),o[U].add(v),o[y].add(v),c[C].add(m),c[U].add(m),c[y].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let C=0,U=_.length;C<U;++C){const y=_[C],x=y.start,N=y.count;for(let O=x,G=x+N;O<G;O+=3)f(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const b=new L,M=new L,I=new L,w=new L;function E(C){I.fromBufferAttribute(s,C),w.copy(I);const U=o[C];b.copy(U),b.sub(I.multiplyScalar(I.dot(U))).normalize(),M.crossVectors(w,U);const x=M.dot(c[C])<0?-1:1;r.setXYZW(C,b.x,b.y,b.z,x)}for(let C=0,U=_.length;C<U;++C){const y=_[C],x=y.start,N=y.count;for(let O=x,G=x+N;O<G;O+=3)E(e.getX(O+0)),E(e.getX(O+1)),E(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new L,a=new L,r=new L,o=new L,c=new L,l=new L,h=new L,d=new L;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,v),r.fromBufferAttribute(t,m),h.subVectors(r,a),d.subVectors(s,a),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),h.subVectors(r,a),d.subVectors(s,a),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*h;for(let f=0;f<h;f++)u[g++]=l[p++]}return new Wt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ct,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],p=e(u,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,c=r.length;o<c;o++){const l=r[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const a=e.morphAttributes;for(const l in a){const h=[],d=a[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let l=0,h=r.length;l<h;l++){const d=r[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eh=new lt,hs=new od,Or=new Fs,th=new L,Ur=new L,Fr=new L,Br=new L,Mc=new L,$r=new L,nh=new L,zr=new L;class q extends Tt{constructor(e=new Ct,t=new Lt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,a=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){$r.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const h=o[c],d=a[c];h!==0&&(Mc.fromBufferAttribute(d,e),r?$r.addScaledVector(Mc,h):$r.addScaledVector(Mc.sub(t),h))}t.add($r)}return t}raycast(e,t){const n=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(a),hs.copy(e.ray).recast(e.near),!(Or.containsPoint(hs.origin)===!1&&(hs.intersectSphere(Or,th)===null||hs.origin.distanceToSquared(th)>(e.far-e.near)**2))&&(eh.copy(a).invert(),hs.copy(e.ray).applyMatrix4(eh),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,hs)))}_computeIntersections(e,t,n){let s;const a=this.geometry,r=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,d=a.attributes.normal,u=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=r[m.materialIndex],_=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=_,I=b;M<I;M+=3){const w=o.getX(M),E=o.getX(M+1),C=o.getX(M+2);s=Gr(this,f,e,n,l,h,d,w,E,C),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const _=o.getX(m),b=o.getX(m+1),M=o.getX(m+2);s=Gr(this,r,e,n,l,h,d,_,b,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=r[m.materialIndex],_=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=_,I=b;M<I;M+=3){const w=M,E=M+1,C=M+2;s=Gr(this,f,e,n,l,h,d,w,E,C),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const _=m,b=m+1,M=m+2;s=Gr(this,r,e,n,l,h,d,_,b,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Cm(i,e,t,n,s,a,r,o){let c;if(e.side===sn?c=n.intersectTriangle(r,a,s,!0,o):c=n.intersectTriangle(s,a,r,e.side===ri,o),c===null)return null;zr.copy(o),zr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(zr);return l<t.near||l>t.far?null:{distance:l,point:zr.clone(),object:i}}function Gr(i,e,t,n,s,a,r,o,c,l){i.getVertexPosition(o,Ur),i.getVertexPosition(c,Fr),i.getVertexPosition(l,Br);const h=Cm(i,e,t,n,Ur,Fr,Br,nh);if(h){const d=new L;An.getBarycoord(nh,Ur,Fr,Br,d),s&&(h.uv=An.getInterpolatedAttribute(s,o,c,l,d,new Me)),a&&(h.uv1=An.getInterpolatedAttribute(a,o,c,l,d,new Me)),r&&(h.normal=An.getInterpolatedAttribute(r,o,c,l,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new L,materialIndex:0};An.getNormal(Ur,Fr,Br,u.normal),h.face=u,h.barycoord=d}return h}class Pn extends Ct{constructor(e=1,t=1,n=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const c=[],l=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,r,a,0),g("z","y","x",1,-1,n,t,-e,r,a,1),g("x","z","y",1,1,e,n,t,s,r,2),g("x","z","y",1,-1,e,n,-t,s,r,3),g("x","y","z",1,-1,e,t,n,s,a,4),g("x","y","z",-1,-1,e,t,-n,s,a,5),this.setIndex(c),this.setAttribute("position",new ft(l,3)),this.setAttribute("normal",new ft(h,3)),this.setAttribute("uv",new ft(d,2));function g(v,m,f,_,b,M,I,w,E,C,U){const y=M/E,x=I/C,N=M/2,O=I/2,G=w/2,F=E+1,R=C+1;let W=0,Y=0;const ie=new L;for(let D=0;D<R;D++){const P=D*x-O;for(let te=0;te<F;te++){const ae=te*y-N;ie[v]=ae*_,ie[m]=P*b,ie[f]=G,l.push(ie.x,ie.y,ie.z),ie[v]=0,ie[m]=0,ie[f]=w>0?1:-1,h.push(ie.x,ie.y,ie.z),d.push(te/E),d.push(1-D/C),W+=1}}for(let D=0;D<C;D++)for(let P=0;P<E;P++){const te=u+P+F*D,ae=u+P+F*(D+1),$=u+(P+1)+F*(D+1),Q=u+(P+1)+F*D;c.push(te,ae,Q),c.push(ae,$,Q),Y+=6}o.addGroup(p,Y,U),p+=Y,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Sa(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function un(i){const e={};for(let t=0;t<i.length;t++){const n=Sa(i[t]);for(const s in n)e[s]=n[s]}return e}function Am(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Qu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const Rm={clone:Sa,merge:un};var Pm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class es extends ss{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pm,this.fragmentShader=Lm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Sa(e.uniforms),this.uniformsGroups=Am(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ep extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=Mi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gi=new L,ih=new Me,sh=new Me;class Zt extends ep{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ao*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ao*2*Math.atan(Math.tan(fo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z)}getViewSize(e,t){return this.getViewBounds(e,ih,sh),t.subVectors(sh,ih)}setViewOffset(e,t,n,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;a+=r.offsetX*s/c,t-=r.offsetY*n/l,s*=r.width/c,n*=r.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ia=-90,sa=1;class Im extends Tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Zt(ia,sa,e,t);s.layers=this.layers,this.add(s);const a=new Zt(ia,sa,e,t);a.layers=this.layers,this.add(a);const r=new Zt(ia,sa,e,t);r.layers=this.layers,this.add(r);const o=new Zt(ia,sa,e,t);o.layers=this.layers,this.add(o);const c=new Zt(ia,sa,e,t);c.layers=this.layers,this.add(c);const l=new Zt(ia,sa,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,a,r,o,c]=t;for(const l of t)this.remove(l);if(e===Mi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Co)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,a),e.setRenderTarget(n,1,s),e.render(t,r),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class tp extends an{constructor(e,t,n,s,a,r,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:ba,super(e,t,n,s,a,r,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Dm extends Ts{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new tp(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Wn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pn(5,5,5),a=new es({name:"CubemapFromEquirect",uniforms:Sa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:Yi});a.uniforms.tEquirect.value=t;const r=new q(s,a),o=t.minFilter;return t.minFilter===Ms&&(t.minFilter=Wn),new Im(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,s){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,s);e.setRenderTarget(a)}}const Sc=new L,km=new L,Nm=new Ye;class gs{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Sc.subVectors(n,t).cross(km.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Sc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Nm.getNormalMatrix(e),s=this.coplanarPoint(Sc).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const us=new Fs,Hr=new L;class cd{constructor(e=new gs,t=new gs,n=new gs,s=new gs,a=new gs,r=new gs){this.planes=[e,t,n,s,a,r]}set(e,t,n,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mi){const n=this.planes,s=e.elements,a=s[0],r=s[1],o=s[2],c=s[3],l=s[4],h=s[5],d=s[6],u=s[7],p=s[8],g=s[9],v=s[10],m=s[11],f=s[12],_=s[13],b=s[14],M=s[15];if(n[0].setComponents(c-a,u-l,m-p,M-f).normalize(),n[1].setComponents(c+a,u+l,m+p,M+f).normalize(),n[2].setComponents(c+r,u+h,m+g,M+_).normalize(),n[3].setComponents(c-r,u-h,m-g,M-_).normalize(),n[4].setComponents(c-o,u-d,m-v,M-b).normalize(),t===Mi)n[5].setComponents(c+o,u+d,m+v,M+b).normalize();else if(t===Co)n[5].setComponents(o,d,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),us.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),us.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(us)}intersectsSprite(e){return us.center.set(0,0,0),us.radius=.7071067811865476,us.applyMatrix4(e.matrixWorld),this.intersectsSphere(us)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Hr.x=s.normal.x>0?e.max.x:e.min.x,Hr.y=s.normal.y>0?e.max.y:e.min.y,Hr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Hr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function np(){let i=null,e=!1,t=null,n=null;function s(a,r){t(a,r),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function Om(i){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],v=d[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const v=d[p];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:a,update:r}}class as extends Ct{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,p=[],g=[],v=[],m=[];for(let f=0;f<h;f++){const _=f*u-r;for(let b=0;b<l;b++){const M=b*d-a;g.push(M,-_,0),v.push(0,0,1),m.push(b/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let _=0;_<o;_++){const b=_+l*f,M=_+l*(f+1),I=_+1+l*(f+1),w=_+1+l*f;p.push(b,M,w),p.push(M,I,w)}this.setIndex(p),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(v,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new as(e.width,e.height,e.widthSegments,e.heightSegments)}}var Um=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$m=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Xm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ym=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Km=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,r0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,o0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,c0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,l0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,h0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,p0="gl_FragColor = linearToOutputTexel( gl_FragColor );",f0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,v0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,b0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,x0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,M0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,S0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,w0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,E0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,T0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,C0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,A0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,R0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,P0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,L0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,I0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,D0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,k0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,N0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,O0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,U0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,F0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,B0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,G0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,H0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,V0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,W0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,X0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,q0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,j0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Y0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,K0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,J0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ag=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,og=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ug=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,bg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_g=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Eg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Tg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ag=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ng=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Og=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ug=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Vg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ev=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,av=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ov=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:Um,alphahash_pars_fragment:Fm,alphamap_fragment:Bm,alphamap_pars_fragment:$m,alphatest_fragment:zm,alphatest_pars_fragment:Gm,aomap_fragment:Hm,aomap_pars_fragment:Vm,batching_pars_vertex:Wm,batching_vertex:Xm,begin_vertex:qm,beginnormal_vertex:jm,bsdfs:Ym,iridescence_fragment:Km,bumpmap_pars_fragment:Jm,clipping_planes_fragment:Zm,clipping_planes_pars_fragment:Qm,clipping_planes_pars_vertex:e0,clipping_planes_vertex:t0,color_fragment:n0,color_pars_fragment:i0,color_pars_vertex:s0,color_vertex:a0,common:r0,cube_uv_reflection_fragment:o0,defaultnormal_vertex:c0,displacementmap_pars_vertex:l0,displacementmap_vertex:d0,emissivemap_fragment:h0,emissivemap_pars_fragment:u0,colorspace_fragment:p0,colorspace_pars_fragment:f0,envmap_fragment:m0,envmap_common_pars_fragment:g0,envmap_pars_fragment:v0,envmap_pars_vertex:y0,envmap_physical_pars_fragment:R0,envmap_vertex:b0,fog_vertex:_0,fog_pars_vertex:x0,fog_fragment:M0,fog_pars_fragment:S0,gradientmap_pars_fragment:w0,lightmap_pars_fragment:E0,lights_lambert_fragment:T0,lights_lambert_pars_fragment:C0,lights_pars_begin:A0,lights_toon_fragment:P0,lights_toon_pars_fragment:L0,lights_phong_fragment:I0,lights_phong_pars_fragment:D0,lights_physical_fragment:k0,lights_physical_pars_fragment:N0,lights_fragment_begin:O0,lights_fragment_maps:U0,lights_fragment_end:F0,logdepthbuf_fragment:B0,logdepthbuf_pars_fragment:$0,logdepthbuf_pars_vertex:z0,logdepthbuf_vertex:G0,map_fragment:H0,map_pars_fragment:V0,map_particle_fragment:W0,map_particle_pars_fragment:X0,metalnessmap_fragment:q0,metalnessmap_pars_fragment:j0,morphinstance_vertex:Y0,morphcolor_vertex:K0,morphnormal_vertex:J0,morphtarget_pars_vertex:Z0,morphtarget_vertex:Q0,normal_fragment_begin:eg,normal_fragment_maps:tg,normal_pars_fragment:ng,normal_pars_vertex:ig,normal_vertex:sg,normalmap_pars_fragment:ag,clearcoat_normal_fragment_begin:rg,clearcoat_normal_fragment_maps:og,clearcoat_pars_fragment:cg,iridescence_pars_fragment:lg,opaque_fragment:dg,packing:hg,premultiplied_alpha_fragment:ug,project_vertex:pg,dithering_fragment:fg,dithering_pars_fragment:mg,roughnessmap_fragment:gg,roughnessmap_pars_fragment:vg,shadowmap_pars_fragment:yg,shadowmap_pars_vertex:bg,shadowmap_vertex:_g,shadowmask_pars_fragment:xg,skinbase_vertex:Mg,skinning_pars_vertex:Sg,skinning_vertex:wg,skinnormal_vertex:Eg,specularmap_fragment:Tg,specularmap_pars_fragment:Cg,tonemapping_fragment:Ag,tonemapping_pars_fragment:Rg,transmission_fragment:Pg,transmission_pars_fragment:Lg,uv_pars_fragment:Ig,uv_pars_vertex:Dg,uv_vertex:kg,worldpos_vertex:Ng,background_vert:Og,background_frag:Ug,backgroundCube_vert:Fg,backgroundCube_frag:Bg,cube_vert:$g,cube_frag:zg,depth_vert:Gg,depth_frag:Hg,distanceRGBA_vert:Vg,distanceRGBA_frag:Wg,equirect_vert:Xg,equirect_frag:qg,linedashed_vert:jg,linedashed_frag:Yg,meshbasic_vert:Kg,meshbasic_frag:Jg,meshlambert_vert:Zg,meshlambert_frag:Qg,meshmatcap_vert:ev,meshmatcap_frag:tv,meshnormal_vert:nv,meshnormal_frag:iv,meshphong_vert:sv,meshphong_frag:av,meshphysical_vert:rv,meshphysical_frag:ov,meshtoon_vert:cv,meshtoon_frag:lv,points_vert:dv,points_frag:hv,shadow_vert:uv,shadow_frag:pv,sprite_vert:fv,sprite_frag:mv},ge={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Qn={basic:{uniforms:un([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:un([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ue(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:un([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:un([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:un([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Ue(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:un([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:un([ge.points,ge.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:un([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:un([ge.common,ge.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:un([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:un([ge.sprite,ge.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:un([ge.common,ge.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:un([ge.lights,ge.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Qn.physical={uniforms:un([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Vr={r:0,b:0,g:0},ps=new oi,gv=new lt;function vv(i,e,t,n,s,a,r){const o=new Ue(0);let c=a===!0?0:1,l,h,d=null,u=0,p=null;function g(_){let b=_.isScene===!0?_.background:null;return b&&b.isTexture&&(b=(_.backgroundBlurriness>0?t:e).get(b)),b}function v(_){let b=!1;const M=g(_);M===null?f(o,c):M&&M.isColor&&(f(M,1),b=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,r):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,b){const M=g(b);M&&(M.isCubeTexture||M.mapping===zo)?(h===void 0&&(h=new q(new Pn(1,1,1),new es({name:"BackgroundCubeMaterial",uniforms:Sa(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ps.copy(b.backgroundRotation),ps.x*=-1,ps.y*=-1,ps.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(gv.makeRotationFromEuler(ps)),h.material.toneMapped=dt.getTransfer(M.colorSpace)!==bt,(d!==M||u!==M.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,d=M,u=M.version,p=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new q(new as(2,2),new es({name:"BackgroundMaterial",uniforms:Sa(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=dt.getTransfer(M.colorSpace)!==bt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||u!==M.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=M,u=M.version,p=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function f(_,b){_.getRGB(Vr,Qu(i)),n.buffers.color.setClear(Vr.r,Vr.g,Vr.b,b,r)}return{getClearColor:function(){return o},setClearColor:function(_,b=1){o.set(_),c=b,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,f(o,c)},render:v,addToRenderList:m}}function yv(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let a=s,r=!1;function o(y,x,N,O,G){let F=!1;const R=d(O,N,x);a!==R&&(a=R,l(a.object)),F=p(y,O,N,G),F&&g(y,O,N,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(F||r)&&(r=!1,M(y,x,N,O),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function d(y,x,N){const O=N.wireframe===!0;let G=n[y.id];G===void 0&&(G={},n[y.id]=G);let F=G[x.id];F===void 0&&(F={},G[x.id]=F);let R=F[O];return R===void 0&&(R=u(c()),F[O]=R),R}function u(y){const x=[],N=[],O=[];for(let G=0;G<t;G++)x[G]=0,N[G]=0,O[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:x,enabledAttributes:N,attributeDivisors:O,object:y,attributes:{},index:null}}function p(y,x,N,O){const G=a.attributes,F=x.attributes;let R=0;const W=N.getAttributes();for(const Y in W)if(W[Y].location>=0){const D=G[Y];let P=F[Y];if(P===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(P=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(P=y.instanceColor)),D===void 0||D.attribute!==P||P&&D.data!==P.data)return!0;R++}return a.attributesNum!==R||a.index!==O}function g(y,x,N,O){const G={},F=x.attributes;let R=0;const W=N.getAttributes();for(const Y in W)if(W[Y].location>=0){let D=F[Y];D===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(D=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(D=y.instanceColor));const P={};P.attribute=D,D&&D.data&&(P.data=D.data),G[Y]=P,R++}a.attributes=G,a.attributesNum=R,a.index=O}function v(){const y=a.newAttributes;for(let x=0,N=y.length;x<N;x++)y[x]=0}function m(y){f(y,0)}function f(y,x){const N=a.newAttributes,O=a.enabledAttributes,G=a.attributeDivisors;N[y]=1,O[y]===0&&(i.enableVertexAttribArray(y),O[y]=1),G[y]!==x&&(i.vertexAttribDivisor(y,x),G[y]=x)}function _(){const y=a.newAttributes,x=a.enabledAttributes;for(let N=0,O=x.length;N<O;N++)x[N]!==y[N]&&(i.disableVertexAttribArray(N),x[N]=0)}function b(y,x,N,O,G,F,R){R===!0?i.vertexAttribIPointer(y,x,N,G,F):i.vertexAttribPointer(y,x,N,O,G,F)}function M(y,x,N,O){v();const G=O.attributes,F=N.getAttributes(),R=x.defaultAttributeValues;for(const W in F){const Y=F[W];if(Y.location>=0){let ie=G[W];if(ie===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(ie=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(ie=y.instanceColor)),ie!==void 0){const D=ie.normalized,P=ie.itemSize,te=e.get(ie);if(te===void 0)continue;const ae=te.buffer,$=te.type,Q=te.bytesPerElement,de=$===i.INT||$===i.UNSIGNED_INT||ie.gpuType===Ql;if(ie.isInterleavedBufferAttribute){const me=ie.data,ce=me.stride,fe=ie.offset;if(me.isInstancedInterleavedBuffer){for(let Pe=0;Pe<Y.locationSize;Pe++)f(Y.location+Pe,me.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Pe=0;Pe<Y.locationSize;Pe++)m(Y.location+Pe);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let Pe=0;Pe<Y.locationSize;Pe++)b(Y.location+Pe,P/Y.locationSize,$,D,ce*Q,(fe+P/Y.locationSize*Pe)*Q,de)}else{if(ie.isInstancedBufferAttribute){for(let me=0;me<Y.locationSize;me++)f(Y.location+me,ie.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let me=0;me<Y.locationSize;me++)m(Y.location+me);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let me=0;me<Y.locationSize;me++)b(Y.location+me,P/Y.locationSize,$,D,P*Q,P/Y.locationSize*me*Q,de)}}else if(R!==void 0){const D=R[W];if(D!==void 0)switch(D.length){case 2:i.vertexAttrib2fv(Y.location,D);break;case 3:i.vertexAttrib3fv(Y.location,D);break;case 4:i.vertexAttrib4fv(Y.location,D);break;default:i.vertexAttrib1fv(Y.location,D)}}}}_()}function I(){C();for(const y in n){const x=n[y];for(const N in x){const O=x[N];for(const G in O)h(O[G].object),delete O[G];delete x[N]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const x=n[y.id];for(const N in x){const O=x[N];for(const G in O)h(O[G].object),delete O[G];delete x[N]}delete n[y.id]}function E(y){for(const x in n){const N=n[x];if(N[y.id]===void 0)continue;const O=N[y.id];for(const G in O)h(O[G].object),delete O[G];delete N[y.id]}}function C(){U(),r=!0,a!==s&&(a=s,l(a.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:U,dispose:I,releaseStatesOfGeometry:w,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function bv(i,e,t){let n;function s(l){n=l}function a(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function r(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),t.update(h,n,d))}function o(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];t.update(p,n,1)}function c(l,h,d,u){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)r(l[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];for(let v=0;v<u.length;v++)t.update(g,n,u[v])}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function _v(i,e,t,n){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(E){return!(E!==Xn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const C=E===yr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Ei&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==ii&&!C)}function c(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const E=e.get("EXT_clip_control");E.clipControlEXT(E.LOWER_LEFT_EXT,E.ZERO_TO_ONE_EXT)}const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:_,maxVaryings:b,maxFragmentUniforms:M,vertexTextures:I,maxSamples:w}}function xv(i){const e=this;let t=null,n=0,s=!1,a=!1;const r=new gs,o=new Ye,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||a&&!m)a?h(null):l();else{const _=a?0:n,b=_*4;let M=f.clippingState||null;c.value=M,M=h(g,u,b,p);for(let I=0;I!==b;++I)M[I]=t[I];f.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const f=p+v*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,M=p;b!==v;++b,M+=4)r.copy(d[b]).applyMatrix4(_,o),r.normal.toArray(m,M),m[M+3]=r.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Mv(i){let e=new WeakMap;function t(r,o){return o===tl?r.mapping=ba:o===nl&&(r.mapping=_a),r}function n(r){if(r&&r.isTexture){const o=r.mapping;if(o===tl||o===nl)if(e.has(r)){const c=e.get(r).texture;return t(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new Dm(c.height);return l.fromEquirectangularTexture(i,r),e.set(r,l),r.addEventListener("dispose",s),t(l.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function a(){e=new WeakMap}return{get:n,dispose:a}}class ip extends ep{constructor(e=-1,t=1,n=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=n-e,r=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,r=a+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ua=4,ah=[.125,.215,.35,.446,.526,.582],bs=20,wc=new ip,rh=new Ue;let Ec=null,Tc=0,Cc=0,Ac=!1;const vs=(1+Math.sqrt(5))/2,aa=1/vs,oh=[new L(-vs,aa,0),new L(vs,aa,0),new L(-aa,0,vs),new L(aa,0,vs),new L(0,vs,-aa),new L(0,vs,aa),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class ch{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ec=this._renderer.getRenderTarget(),Tc=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ec,Tc,Cc),this._renderer.xr.enabled=Ac,e.scissorTest=!1,Wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ba||e.mapping===_a?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ec=this._renderer.getRenderTarget(),Tc=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wn,minFilter:Wn,generateMipmaps:!1,type:yr,format:Xn,colorSpace:is,depthBuffer:!1},s=lh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lh(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sv(a)),this._blurMaterial=wv(a,e,t)}return s}_compileMaterial(e){const t=new q(this._lodPlanes[0],e);this._renderer.compile(t,wc)}_sceneToCubeUV(e,t,n,s){const o=new Zt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(rh),h.toneMapping=Ki,h.autoClear=!1;const p=new Lt({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),g=new q(new Pn,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(rh),v=!0);for(let f=0;f<6;f++){const _=f%3;_===0?(o.up.set(0,c[f],0),o.lookAt(l[f],0,0)):_===1?(o.up.set(0,0,c[f]),o.lookAt(0,l[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,l[f]));const b=this._cubeSize;Wr(s,_*b,f>2?b:0,b,b),h.setRenderTarget(s),v&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ba||e.mapping===_a;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dh());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new q(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;Wr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(r,wc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=oh[(s-a-1)%oh.length];this._blur(e,a-1,a,r,o)}t.autoClear=n}_blur(e,t,n,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,s,"latitudinal",a),this._halfBlur(r,e,n,n,s,"longitudinal",a)}_halfBlur(e,t,n,s,a,r,o){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new q(this._lodPlanes[s],l),u=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*bs-1),v=a/g,m=isFinite(a)?1+Math.floor(h*v):bs;m>bs&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bs}`);const f=[];let _=0;for(let E=0;E<bs;++E){const C=E/v,U=Math.exp(-C*C/2);f.push(U),E===0?_+=U:E<m&&(_+=2*U)}for(let E=0;E<f.length;E++)f[E]=f[E]/_;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-n;const M=this._sizeLods[s],I=3*M*(s>b-ua?s-b+ua:0),w=4*(this._cubeSize-M);Wr(t,I,w,3*M,2*M),c.setRenderTarget(t),c.render(d,wc)}}function Sv(i){const e=[],t=[],n=[];let s=i;const a=i-ua+1+ah.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let c=1/o;r>i-ua?c=ah[r-i+ua-1]:r===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,v=3,m=2,f=1,_=new Float32Array(v*g*p),b=new Float32Array(m*g*p),M=new Float32Array(f*g*p);for(let w=0;w<p;w++){const E=w%3*2/3-1,C=w>2?0:-1,U=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];_.set(U,v*g*w),b.set(u,m*g*w);const y=[w,w,w,w,w,w];M.set(y,f*g*w)}const I=new Ct;I.setAttribute("position",new Wt(_,v)),I.setAttribute("uv",new Wt(b,m)),I.setAttribute("faceIndex",new Wt(M,f)),e.push(I),s>ua&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function lh(i,e,t){const n=new Ts(i,e,t);return n.texture.mapping=zo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function wv(i,e,t){const n=new Float32Array(bs),s=new L(0,1,0);return new es({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ld(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function dh(){return new es({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ld(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function hh(){return new es({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ld(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function ld(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ev(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===tl||c===nl,h=c===ba||c===_a;if(l||h){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new ch(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new ch(i)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function a(o){const c=o.target;c.removeEventListener("dispose",a);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function Tv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&mo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Cv(i,e,t,n){const s={},a=new WeakMap;function r(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let m=0,f=v.length;m<f;m++)e.remove(v[m])}u.removeEventListener("dispose",r),delete s[u.id];const p=a.get(u);p&&(e.remove(p),a.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)e.update(u[g],i.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const v=p[g];for(let m=0,f=v.length;m<f;m++)e.update(v[m],i.ARRAY_BUFFER)}}function l(d){const u=[],p=d.index,g=d.attributes.position;let v=0;if(p!==null){const _=p.array;v=p.version;for(let b=0,M=_.length;b<M;b+=3){const I=_[b+0],w=_[b+1],E=_[b+2];u.push(I,w,w,E,E,I)}}else if(g!==void 0){const _=g.array;v=g.version;for(let b=0,M=_.length/3-1;b<M;b+=3){const I=b+0,w=b+1,E=b+2;u.push(I,w,w,E,E,I)}}else return;const m=new(Xu(u)?Zu:Ju)(u,1);m.version=v;const f=a.get(d);f&&e.remove(f),a.set(d,m)}function h(d){const u=a.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return a.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Av(i,e,t){let n;function s(u){n=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function c(u,p){i.drawElements(n,p,a,u*r),t.update(p,n,1)}function l(u,p,g){g!==0&&(i.drawElementsInstanced(n,p,a,u*r,g),t.update(p,n,g))}function h(u,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,a,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function d(u,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)l(u[f]/r,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,a,u,0,v,0,g);let f=0;for(let _=0;_<g;_++)f+=p[_];for(let _=0;_<v.length;_++)t.update(f,n,v[_])}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Rv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,r,o){switch(t.calls++,r){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Pv(i,e,t){const n=new WeakMap,s=new pt;function a(r,o,c){const l=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let y=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var p=y;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let I=o.attributes.position.count*M,w=1;I>e.maxTextureSize&&(w=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const E=new Float32Array(I*w*4*d),C=new ju(E,I,w,d);C.type=ii,C.needsUpdate=!0;const U=M*4;for(let x=0;x<d;x++){const N=f[x],O=_[x],G=b[x],F=I*w*4*x;for(let R=0;R<N.count;R++){const W=R*U;g===!0&&(s.fromBufferAttribute(N,R),E[F+W+0]=s.x,E[F+W+1]=s.y,E[F+W+2]=s.z,E[F+W+3]=0),v===!0&&(s.fromBufferAttribute(O,R),E[F+W+4]=s.x,E[F+W+5]=s.y,E[F+W+6]=s.z,E[F+W+7]=0),m===!0&&(s.fromBufferAttribute(G,R),E[F+W+8]=s.x,E[F+W+9]=s.y,E[F+W+10]=s.z,E[F+W+11]=G.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new Me(I,w)},n.set(o,u),o.addEventListener("dispose",y)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",r.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:a}}function Lv(i,e,t,n){let s=new WeakMap;function a(c){const l=n.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function r(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:a,dispose:r}}class sp extends an{constructor(e,t,n,s,a,r,o,c,l,h=fa){if(h!==fa&&h!==Ma)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===fa&&(n=Es),n===void 0&&h===Ma&&(n=xa),super(null,s,a,r,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:bn,this.minFilter=c!==void 0?c:bn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ap=new an,uh=new sp(1,1),rp=new ju,op=new vm,cp=new tp,ph=[],fh=[],mh=new Float32Array(16),gh=new Float32Array(9),vh=new Float32Array(4);function La(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let a=ph[s];if(a===void 0&&(a=new Float32Array(s),ph[s]=a),e!==0){n.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,i[r].toArray(a,o)}return a}function $t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function zt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ho(i,e){let t=fh[e];t===void 0&&(t=new Int32Array(e),fh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Iv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Dv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2fv(this.addr,e),zt(t,e)}}function kv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if($t(t,e))return;i.uniform3fv(this.addr,e),zt(t,e)}}function Nv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4fv(this.addr,e),zt(t,e)}}function Ov(i,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if($t(t,n))return;vh.set(n),i.uniformMatrix2fv(this.addr,!1,vh),zt(t,n)}}function Uv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if($t(t,n))return;gh.set(n),i.uniformMatrix3fv(this.addr,!1,gh),zt(t,n)}}function Fv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if($t(t,n))return;mh.set(n),i.uniformMatrix4fv(this.addr,!1,mh),zt(t,n)}}function Bv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function $v(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2iv(this.addr,e),zt(t,e)}}function zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;i.uniform3iv(this.addr,e),zt(t,e)}}function Gv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4iv(this.addr,e),zt(t,e)}}function Hv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Vv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2uiv(this.addr,e),zt(t,e)}}function Wv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;i.uniform3uiv(this.addr,e),zt(t,e)}}function Xv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4uiv(this.addr,e),zt(t,e)}}function qv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let a;this.type===i.SAMPLER_2D_SHADOW?(uh.compareFunction=Wu,a=uh):a=ap,t.setTexture2D(e||a,s)}function jv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||op,s)}function Yv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||cp,s)}function Kv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||rp,s)}function Jv(i){switch(i){case 5126:return Iv;case 35664:return Dv;case 35665:return kv;case 35666:return Nv;case 35674:return Ov;case 35675:return Uv;case 35676:return Fv;case 5124:case 35670:return Bv;case 35667:case 35671:return $v;case 35668:case 35672:return zv;case 35669:case 35673:return Gv;case 5125:return Hv;case 36294:return Vv;case 36295:return Wv;case 36296:return Xv;case 35678:case 36198:case 36298:case 36306:case 35682:return qv;case 35679:case 36299:case 36307:return jv;case 35680:case 36300:case 36308:case 36293:return Yv;case 36289:case 36303:case 36311:case 36292:return Kv}}function Zv(i,e){i.uniform1fv(this.addr,e)}function Qv(i,e){const t=La(e,this.size,2);i.uniform2fv(this.addr,t)}function ey(i,e){const t=La(e,this.size,3);i.uniform3fv(this.addr,t)}function ty(i,e){const t=La(e,this.size,4);i.uniform4fv(this.addr,t)}function ny(i,e){const t=La(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function iy(i,e){const t=La(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function sy(i,e){const t=La(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ay(i,e){i.uniform1iv(this.addr,e)}function ry(i,e){i.uniform2iv(this.addr,e)}function oy(i,e){i.uniform3iv(this.addr,e)}function cy(i,e){i.uniform4iv(this.addr,e)}function ly(i,e){i.uniform1uiv(this.addr,e)}function dy(i,e){i.uniform2uiv(this.addr,e)}function hy(i,e){i.uniform3uiv(this.addr,e)}function uy(i,e){i.uniform4uiv(this.addr,e)}function py(i,e,t){const n=this.cache,s=e.length,a=Ho(t,s);$t(n,a)||(i.uniform1iv(this.addr,a),zt(n,a));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||ap,a[r])}function fy(i,e,t){const n=this.cache,s=e.length,a=Ho(t,s);$t(n,a)||(i.uniform1iv(this.addr,a),zt(n,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||op,a[r])}function my(i,e,t){const n=this.cache,s=e.length,a=Ho(t,s);$t(n,a)||(i.uniform1iv(this.addr,a),zt(n,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||cp,a[r])}function gy(i,e,t){const n=this.cache,s=e.length,a=Ho(t,s);$t(n,a)||(i.uniform1iv(this.addr,a),zt(n,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||rp,a[r])}function vy(i){switch(i){case 5126:return Zv;case 35664:return Qv;case 35665:return ey;case 35666:return ty;case 35674:return ny;case 35675:return iy;case 35676:return sy;case 5124:case 35670:return ay;case 35667:case 35671:return ry;case 35668:case 35672:return oy;case 35669:case 35673:return cy;case 5125:return ly;case 36294:return dy;case 36295:return hy;case 36296:return uy;case 35678:case 36198:case 36298:case 36306:case 35682:return py;case 35679:case 36299:case 36307:return fy;case 35680:case 36300:case 36308:case 36293:return my;case 36289:case 36303:case 36311:case 36292:return gy}}class yy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Jv(t.type)}}class by{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vy(t.type)}}class _y{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],n)}}}const Rc=/(\w+)(\])?(\[|\.)?/g;function yh(i,e){i.seq.push(e),i.map[e.id]=e}function xy(i,e,t){const n=i.name,s=n.length;for(Rc.lastIndex=0;;){const a=Rc.exec(n),r=Rc.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&r+2===s){yh(t,l===void 0?new yy(o,i,e):new by(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new _y(o),yh(t,d)),t=d}}}class go{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const a=e.getActiveUniform(t,s),r=e.getUniformLocation(t,a.name);xy(a,r,this)}}setValue(e,t,n,s){const a=this.map[t];a!==void 0&&a.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&n.push(r)}return n}}function bh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const My=37297;let Sy=0;function wy(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;n.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return n.join(`
`)}function Ey(i){const e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(i);let n;switch(e===t?n="":e===To&&t===Eo?n="LinearDisplayP3ToLinearSRGB":e===Eo&&t===To&&(n="LinearSRGBToLinearDisplayP3"),i){case is:case Go:return[n,"LinearTransferOETF"];case Tn:case rd:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function _h(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const r=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+wy(i.getShaderSource(e),r)}else return s}function Ty(i,e){const t=Ey(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Cy(i,e){let t;switch(e){case Vf:t="Linear";break;case Wf:t="Reinhard";break;case Xf:t="Cineon";break;case Du:t="ACESFilmic";break;case jf:t="AgX";break;case Yf:t="Neutral";break;case qf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Xr=new L;function Ay(){dt.getLuminanceCoefficients(Xr);const i=Xr.x.toFixed(4),e=Xr.y.toFixed(4),t=Xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ry(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function Py(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ly(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const a=i.getActiveAttrib(e,s),r=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:i.getAttribLocation(e,r),locationSize:o}}return t}function er(i){return i!==""}function xh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Iy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ll(i){return i.replace(Iy,ky)}const Dy=new Map;function ky(i,e){let t=je[e];if(t===void 0){const n=Dy.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ll(t)}const Ny=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sh(i){return i.replace(Ny,Oy)}function Oy(i,e,t,n){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function wh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Uy(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Pu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Lu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===xi&&(e="SHADOWMAP_TYPE_VSM"),e}function Fy(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ba:case _a:e="ENVMAP_TYPE_CUBE";break;case zo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function By(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case _a:e="ENVMAP_MODE_REFRACTION";break}return e}function $y(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Iu:e="ENVMAP_BLENDING_MULTIPLY";break;case Gf:e="ENVMAP_BLENDING_MIX";break;case Hf:e="ENVMAP_BLENDING_ADD";break}return e}function zy(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Gy(i,e,t,n){const s=i.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const c=Uy(t),l=Fy(t),h=By(t),d=$y(t),u=zy(t),p=Ry(t),g=Py(a),v=s.createProgram();let m,f,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(er).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(er).join(`
`),f.length>0&&(f+=`
`)):(m=[wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),f=[wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ki?"#define TONE_MAPPING":"",t.toneMapping!==Ki?je.tonemapping_pars_fragment:"",t.toneMapping!==Ki?Cy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,Ty("linearToOutputTexel",t.outputColorSpace),Ay(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),r=Ll(r),r=xh(r,t),r=Mh(r,t),o=Ll(o),o=xh(o,t),o=Mh(o,t),r=Sh(r),o=Sh(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===zd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=_+m+r,M=_+f+o,I=bh(s,s.VERTEX_SHADER,b),w=bh(s,s.FRAGMENT_SHADER,M);s.attachShader(v,I),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function E(x){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(v).trim(),O=s.getShaderInfoLog(I).trim(),G=s.getShaderInfoLog(w).trim();let F=!0,R=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(F=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,I,w);else{const W=_h(s,I,"vertex"),Y=_h(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+x.name+`
Material Type: `+x.type+`

Program Info Log: `+N+`
`+W+`
`+Y)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(O===""||G==="")&&(R=!1);R&&(x.diagnostics={runnable:F,programLog:N,vertexShader:{log:O,prefix:m},fragmentShader:{log:G,prefix:f}})}s.deleteShader(I),s.deleteShader(w),C=new go(s,v),U=Ly(s,v)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let U;this.getAttributes=function(){return U===void 0&&E(this),U};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,My)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sy++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=w,this}let Hy=0;class Vy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Wy(e),t.set(e,n)),n}}class Wy{constructor(e){this.id=Hy++,this.code=e,this.usedTimes=0}}function Xy(i,e,t,n,s,a,r){const o=new Yu,c=new Vy,l=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.reverseDepthBuffer,p=s.vertexTextures;let g=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return l.add(y),y===0?"uv":`uv${y}`}function f(y,x,N,O,G){const F=O.fog,R=G.geometry,W=y.isMeshStandardMaterial?O.environment:null,Y=(y.isMeshStandardMaterial?t:e).get(y.envMap||W),ie=Y&&Y.mapping===zo?Y.image.height:null,D=v[y.type];y.precision!==null&&(g=s.getMaxPrecision(y.precision),g!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",g,"instead."));const P=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,te=P!==void 0?P.length:0;let ae=0;R.morphAttributes.position!==void 0&&(ae=1),R.morphAttributes.normal!==void 0&&(ae=2),R.morphAttributes.color!==void 0&&(ae=3);let $,Q,de,me;if(D){const Xt=Qn[D];$=Xt.vertexShader,Q=Xt.fragmentShader}else $=y.vertexShader,Q=y.fragmentShader,c.update(y),de=c.getVertexShaderID(y),me=c.getFragmentShaderID(y);const ce=i.getRenderTarget(),fe=G.isInstancedMesh===!0,Pe=G.isBatchedMesh===!0,ke=!!y.map,Oe=!!y.matcap,k=!!Y,yt=!!y.aoMap,Ge=!!y.lightMap,Xe=!!y.bumpMap,De=!!y.normalMap,ot=!!y.displacementMap,ue=!!y.emissiveMap,A=!!y.metalnessMap,S=!!y.roughnessMap,j=y.anisotropy>0,re=y.clearcoat>0,le=y.dispersion>0,se=y.iridescence>0,Ae=y.sheen>0,ve=y.transmission>0,Se=j&&!!y.anisotropyMap,Qe=re&&!!y.clearcoatMap,he=re&&!!y.clearcoatNormalMap,we=re&&!!y.clearcoatRoughnessMap,$e=se&&!!y.iridescenceMap,ze=se&&!!y.iridescenceThicknessMap,Ee=Ae&&!!y.sheenColorMap,qe=Ae&&!!y.sheenRoughnessMap,He=!!y.specularMap,ht=!!y.specularColorMap,B=!!y.specularIntensityMap,xe=ve&&!!y.transmissionMap,ee=ve&&!!y.thicknessMap,oe=!!y.gradientMap,ye=!!y.alphaMap,_e=y.alphaTest>0,et=!!y.alphaHash,St=!!y.extensions;let At=Ki;y.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(At=i.toneMapping);const it={shaderID:D,shaderType:y.type,shaderName:y.name,vertexShader:$,fragmentShader:Q,defines:y.defines,customVertexShaderID:de,customFragmentShaderID:me,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:g,batching:Pe,batchingColor:Pe&&G._colorsTexture!==null,instancing:fe,instancingColor:fe&&G.instanceColor!==null,instancingMorph:fe&&G.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:is,alphaToCoverage:!!y.alphaToCoverage,map:ke,matcap:Oe,envMap:k,envMapMode:k&&Y.mapping,envMapCubeUVHeight:ie,aoMap:yt,lightMap:Ge,bumpMap:Xe,normalMap:De,displacementMap:p&&ot,emissiveMap:ue,normalMapObjectSpace:De&&y.normalMapType===Qf,normalMapTangentSpace:De&&y.normalMapType===Vu,metalnessMap:A,roughnessMap:S,anisotropy:j,anisotropyMap:Se,clearcoat:re,clearcoatMap:Qe,clearcoatNormalMap:he,clearcoatRoughnessMap:we,dispersion:le,iridescence:se,iridescenceMap:$e,iridescenceThicknessMap:ze,sheen:Ae,sheenColorMap:Ee,sheenRoughnessMap:qe,specularMap:He,specularColorMap:ht,specularIntensityMap:B,transmission:ve,transmissionMap:xe,thicknessMap:ee,gradientMap:oe,opaque:y.transparent===!1&&y.blending===pa&&y.alphaToCoverage===!1,alphaMap:ye,alphaTest:_e,alphaHash:et,combine:y.combine,mapUv:ke&&m(y.map.channel),aoMapUv:yt&&m(y.aoMap.channel),lightMapUv:Ge&&m(y.lightMap.channel),bumpMapUv:Xe&&m(y.bumpMap.channel),normalMapUv:De&&m(y.normalMap.channel),displacementMapUv:ot&&m(y.displacementMap.channel),emissiveMapUv:ue&&m(y.emissiveMap.channel),metalnessMapUv:A&&m(y.metalnessMap.channel),roughnessMapUv:S&&m(y.roughnessMap.channel),anisotropyMapUv:Se&&m(y.anisotropyMap.channel),clearcoatMapUv:Qe&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:he&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:$e&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:qe&&m(y.sheenRoughnessMap.channel),specularMapUv:He&&m(y.specularMap.channel),specularColorMapUv:ht&&m(y.specularColorMap.channel),specularIntensityMapUv:B&&m(y.specularIntensityMap.channel),transmissionMapUv:xe&&m(y.transmissionMap.channel),thicknessMapUv:ee&&m(y.thicknessMap.channel),alphaMapUv:ye&&m(y.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(De||j),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!R.attributes.uv&&(ke||ye),fog:!!F,useFog:y.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:G.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ae,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:At,decodeVideoTexture:ke&&y.map.isVideoTexture===!0&&dt.getTransfer(y.map.colorSpace)===bt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===nn,flipSided:y.side===sn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:St&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(St&&y.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return it.vertexUv1s=l.has(1),it.vertexUv2s=l.has(2),it.vertexUv3s=l.has(3),l.clear(),it}function _(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const N in y.defines)x.push(N),x.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(b(x,y),M(x,y),x.push(i.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function b(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function M(y,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.alphaToCoverage&&o.enable(20),y.push(o.mask)}function I(y){const x=v[y.type];let N;if(x){const O=Qn[x];N=Rm.clone(O.uniforms)}else N=y.uniforms;return N}function w(y,x){let N;for(let O=0,G=h.length;O<G;O++){const F=h[O];if(F.cacheKey===x){N=F,++N.usedTimes;break}}return N===void 0&&(N=new Gy(i,x,y,a),h.push(N)),N}function E(y){if(--y.usedTimes===0){const x=h.indexOf(y);h[x]=h[h.length-1],h.pop(),y.destroy()}}function C(y){c.remove(y)}function U(){c.dispose()}return{getParameters:f,getProgramCacheKey:_,getUniforms:I,acquireProgram:w,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:U}}function qy(){let i=new WeakMap;function e(r){return i.has(r)}function t(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function n(r){i.delete(r)}function s(r,o,c){i.get(r)[o]=c}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:a}}function jy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Eh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Th(){const i=[];let e=0;const t=[],n=[],s=[];function a(){e=0,t.length=0,n.length=0,s.length=0}function r(d,u,p,g,v,m){let f=i[e];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},i[e]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=v,f.group=m),e++,f}function o(d,u,p,g,v,m){const f=r(d,u,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(d,u,p,g,v,m){const f=r(d,u,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(d,u){t.length>1&&t.sort(d||jy),n.length>1&&n.sort(u||Eh),s.length>1&&s.sort(u||Eh)}function h(){for(let d=e,u=i.length;d<u;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:a,push:o,unshift:c,finish:h,sort:l}}function Yy(){let i=new WeakMap;function e(n,s){const a=i.get(n);let r;return a===void 0?(r=new Th,i.set(n,[r])):s>=a.length?(r=new Th,a.push(r)):r=a[s],r}function t(){i=new WeakMap}return{get:e,dispose:t}}function Ky(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ue};break;case"SpotLight":t={position:new L,direction:new L,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Jy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Zy=0;function Qy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function eb(i){const e=new Ky,t=Jy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,a=new lt,r=new lt;function o(l){let h=0,d=0,u=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,_=0,b=0,M=0,I=0,w=0,E=0;l.sort(Qy);for(let U=0,y=l.length;U<y;U++){const x=l[U],N=x.color,O=x.intensity,G=x.distance,F=x.shadow&&x.shadow.map?x.shadow.map.texture:null;if(x.isAmbientLight)h+=N.r*O,d+=N.g*O,u+=N.b*O;else if(x.isLightProbe){for(let R=0;R<9;R++)n.probe[R].addScaledVector(x.sh.coefficients[R],O);E++}else if(x.isDirectionalLight){const R=e.get(x);if(R.color.copy(x.color).multiplyScalar(x.intensity),x.castShadow){const W=x.shadow,Y=t.get(x);Y.shadowIntensity=W.intensity,Y.shadowBias=W.bias,Y.shadowNormalBias=W.normalBias,Y.shadowRadius=W.radius,Y.shadowMapSize=W.mapSize,n.directionalShadow[p]=Y,n.directionalShadowMap[p]=F,n.directionalShadowMatrix[p]=x.shadow.matrix,_++}n.directional[p]=R,p++}else if(x.isSpotLight){const R=e.get(x);R.position.setFromMatrixPosition(x.matrixWorld),R.color.copy(N).multiplyScalar(O),R.distance=G,R.coneCos=Math.cos(x.angle),R.penumbraCos=Math.cos(x.angle*(1-x.penumbra)),R.decay=x.decay,n.spot[v]=R;const W=x.shadow;if(x.map&&(n.spotLightMap[I]=x.map,I++,W.updateMatrices(x),x.castShadow&&w++),n.spotLightMatrix[v]=W.matrix,x.castShadow){const Y=t.get(x);Y.shadowIntensity=W.intensity,Y.shadowBias=W.bias,Y.shadowNormalBias=W.normalBias,Y.shadowRadius=W.radius,Y.shadowMapSize=W.mapSize,n.spotShadow[v]=Y,n.spotShadowMap[v]=F,M++}v++}else if(x.isRectAreaLight){const R=e.get(x);R.color.copy(N).multiplyScalar(O),R.halfWidth.set(x.width*.5,0,0),R.halfHeight.set(0,x.height*.5,0),n.rectArea[m]=R,m++}else if(x.isPointLight){const R=e.get(x);if(R.color.copy(x.color).multiplyScalar(x.intensity),R.distance=x.distance,R.decay=x.decay,x.castShadow){const W=x.shadow,Y=t.get(x);Y.shadowIntensity=W.intensity,Y.shadowBias=W.bias,Y.shadowNormalBias=W.normalBias,Y.shadowRadius=W.radius,Y.shadowMapSize=W.mapSize,Y.shadowCameraNear=W.camera.near,Y.shadowCameraFar=W.camera.far,n.pointShadow[g]=Y,n.pointShadowMap[g]=F,n.pointShadowMatrix[g]=x.shadow.matrix,b++}n.point[g]=R,g++}else if(x.isHemisphereLight){const R=e.get(x);R.skyColor.copy(x.color).multiplyScalar(O),R.groundColor.copy(x.groundColor).multiplyScalar(O),n.hemi[f]=R,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const C=n.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==v||C.rectAreaLength!==m||C.hemiLength!==f||C.numDirectionalShadows!==_||C.numPointShadows!==b||C.numSpotShadows!==M||C.numSpotMaps!==I||C.numLightProbes!==E)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=M+I-w,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=E,C.directionalLength=p,C.pointLength=g,C.spotLength=v,C.rectAreaLength=m,C.hemiLength=f,C.numDirectionalShadows=_,C.numPointShadows=b,C.numSpotShadows=M,C.numSpotMaps=I,C.numLightProbes=E,n.version=Zy++)}function c(l,h){let d=0,u=0,p=0,g=0,v=0;const m=h.matrixWorldInverse;for(let f=0,_=l.length;f<_;f++){const b=l[f];if(b.isDirectionalLight){const M=n.directional[d];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(b.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),r.identity(),a.copy(b.matrixWorld),a.premultiply(m),r.extractRotation(a),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),g++}else if(b.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),u++}else if(b.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function Ch(i){const e=new eb(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function a(h){t.push(h)}function r(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:a,pushShadow:r}}function tb(i){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new Ch(i),e.set(s,[o])):a>=r.length?(o=new Ch(i),r.push(o)):o=r[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class nb extends ss{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ib extends ss{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const sb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ab=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function rb(i,e,t){let n=new cd;const s=new Me,a=new Me,r=new pt,o=new nb({depthPacking:Zf}),c=new ib,l={},h=t.maxTextureSize,d={[ri]:sn,[sn]:ri,[nn]:nn},u=new es({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:sb,fragmentShader:ab}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ct;g.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new q(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pu;let f=this.type;this.render=function(w,E,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const U=i.getRenderTarget(),y=i.getActiveCubeFace(),x=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Yi),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=f!==xi&&this.type===xi,G=f===xi&&this.type!==xi;for(let F=0,R=w.length;F<R;F++){const W=w[F],Y=W.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ie=Y.getFrameExtents();if(s.multiply(ie),a.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/ie.x),s.x=a.x*ie.x,Y.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/ie.y),s.y=a.y*ie.y,Y.mapSize.y=a.y)),Y.map===null||O===!0||G===!0){const P=this.type!==xi?{minFilter:bn,magFilter:bn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Ts(s.x,s.y,P),Y.map.texture.name=W.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const D=Y.getViewportCount();for(let P=0;P<D;P++){const te=Y.getViewport(P);r.set(a.x*te.x,a.y*te.y,a.x*te.z,a.y*te.w),N.viewport(r),Y.updateMatrices(W,P),n=Y.getFrustum(),M(E,C,Y.camera,W,this.type)}Y.isPointLightShadow!==!0&&this.type===xi&&_(Y,C),Y.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(U,y,x)};function _(w,E){const C=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ts(s.x,s.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(E,null,C,u,v,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(E,null,C,p,v,null)}function b(w,E,C,U){let y=null;const x=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(x!==void 0)y=x;else if(y=C.isPointLight===!0?c:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const N=y.uuid,O=E.uuid;let G=l[N];G===void 0&&(G={},l[N]=G);let F=G[O];F===void 0&&(F=y.clone(),G[O]=F,E.addEventListener("dispose",I)),y=F}if(y.visible=E.visible,y.wireframe=E.wireframe,U===xi?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:d[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const N=i.properties.get(y);N.light=C}return y}function M(w,E,C,U,y){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===xi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const O=e.update(w),G=w.material;if(Array.isArray(G)){const F=O.groups;for(let R=0,W=F.length;R<W;R++){const Y=F[R],ie=G[Y.materialIndex];if(ie&&ie.visible){const D=b(w,ie,U,y);w.onBeforeShadow(i,w,E,C,O,D,Y),i.renderBufferDirect(C,null,O,D,w,Y),w.onAfterShadow(i,w,E,C,O,D,Y)}}}else if(G.visible){const F=b(w,G,U,y);w.onBeforeShadow(i,w,E,C,O,F,null),i.renderBufferDirect(C,null,O,F,w,null),w.onAfterShadow(i,w,E,C,O,F,null)}}const N=w.children;for(let O=0,G=N.length;O<G;O++)M(N[O],E,C,U,y)}function I(w){w.target.removeEventListener("dispose",I);for(const C in l){const U=l[C],y=w.target.uuid;y in U&&(U[y].dispose(),delete U[y])}}}const ob={[jc]:Yc,[Kc]:Qc,[Jc]:el,[ya]:Zc,[Yc]:jc,[Qc]:Kc,[el]:Jc,[Zc]:ya};function cb(i){function e(){let B=!1;const xe=new pt;let ee=null;const oe=new pt(0,0,0,0);return{setMask:function(ye){ee!==ye&&!B&&(i.colorMask(ye,ye,ye,ye),ee=ye)},setLocked:function(ye){B=ye},setClear:function(ye,_e,et,St,At){At===!0&&(ye*=St,_e*=St,et*=St),xe.set(ye,_e,et,St),oe.equals(xe)===!1&&(i.clearColor(ye,_e,et,St),oe.copy(xe))},reset:function(){B=!1,ee=null,oe.set(-1,0,0,0)}}}function t(){let B=!1,xe=!1,ee=null,oe=null,ye=null;return{setReversed:function(_e){xe=_e},setTest:function(_e){_e?de(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function(_e){ee!==_e&&!B&&(i.depthMask(_e),ee=_e)},setFunc:function(_e){if(xe&&(_e=ob[_e]),oe!==_e){switch(_e){case jc:i.depthFunc(i.NEVER);break;case Yc:i.depthFunc(i.ALWAYS);break;case Kc:i.depthFunc(i.LESS);break;case ya:i.depthFunc(i.LEQUAL);break;case Jc:i.depthFunc(i.EQUAL);break;case Zc:i.depthFunc(i.GEQUAL);break;case Qc:i.depthFunc(i.GREATER);break;case el:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=_e}},setLocked:function(_e){B=_e},setClear:function(_e){ye!==_e&&(i.clearDepth(_e),ye=_e)},reset:function(){B=!1,ee=null,oe=null,ye=null}}}function n(){let B=!1,xe=null,ee=null,oe=null,ye=null,_e=null,et=null,St=null,At=null;return{setTest:function(it){B||(it?de(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function(it){xe!==it&&!B&&(i.stencilMask(it),xe=it)},setFunc:function(it,Xt,$n){(ee!==it||oe!==Xt||ye!==$n)&&(i.stencilFunc(it,Xt,$n),ee=it,oe=Xt,ye=$n)},setOp:function(it,Xt,$n){(_e!==it||et!==Xt||St!==$n)&&(i.stencilOp(it,Xt,$n),_e=it,et=Xt,St=$n)},setLocked:function(it){B=it},setClear:function(it){At!==it&&(i.clearStencil(it),At=it)},reset:function(){B=!1,xe=null,ee=null,oe=null,ye=null,_e=null,et=null,St=null,At=null}}}const s=new e,a=new t,r=new n,o=new WeakMap,c=new WeakMap;let l={},h={},d=new WeakMap,u=[],p=null,g=!1,v=null,m=null,f=null,_=null,b=null,M=null,I=null,w=new Ue(0,0,0),E=0,C=!1,U=null,y=null,x=null,N=null,O=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,R=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(R=parseFloat(/^WebGL (\d)/.exec(W)[1]),F=R>=1):W.indexOf("OpenGL ES")!==-1&&(R=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),F=R>=2);let Y=null,ie={};const D=i.getParameter(i.SCISSOR_BOX),P=i.getParameter(i.VIEWPORT),te=new pt().fromArray(D),ae=new pt().fromArray(P);function $(B,xe,ee,oe){const ye=new Uint8Array(4),_e=i.createTexture();i.bindTexture(B,_e),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let et=0;et<ee;et++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(xe,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(xe+et,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return _e}const Q={};Q[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),r.setClear(0),de(i.DEPTH_TEST),a.setFunc(ya),Ge(!1),Xe(Od),de(i.CULL_FACE),k(Yi);function de(B){l[B]!==!0&&(i.enable(B),l[B]=!0)}function me(B){l[B]!==!1&&(i.disable(B),l[B]=!1)}function ce(B,xe){return h[B]!==xe?(i.bindFramebuffer(B,xe),h[B]=xe,B===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=xe),B===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=xe),!0):!1}function fe(B,xe){let ee=u,oe=!1;if(B){ee=d.get(xe),ee===void 0&&(ee=[],d.set(xe,ee));const ye=B.textures;if(ee.length!==ye.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let _e=0,et=ye.length;_e<et;_e++)ee[_e]=i.COLOR_ATTACHMENT0+_e;ee.length=ye.length,oe=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,oe=!0);oe&&i.drawBuffers(ee)}function Pe(B){return p!==B?(i.useProgram(B),p=B,!0):!1}const ke={[ys]:i.FUNC_ADD,[Ef]:i.FUNC_SUBTRACT,[Tf]:i.FUNC_REVERSE_SUBTRACT};ke[Cf]=i.MIN,ke[Af]=i.MAX;const Oe={[Rf]:i.ZERO,[Pf]:i.ONE,[Lf]:i.SRC_COLOR,[Xc]:i.SRC_ALPHA,[Uf]:i.SRC_ALPHA_SATURATE,[Nf]:i.DST_COLOR,[Df]:i.DST_ALPHA,[If]:i.ONE_MINUS_SRC_COLOR,[qc]:i.ONE_MINUS_SRC_ALPHA,[Of]:i.ONE_MINUS_DST_COLOR,[kf]:i.ONE_MINUS_DST_ALPHA,[Ff]:i.CONSTANT_COLOR,[Bf]:i.ONE_MINUS_CONSTANT_COLOR,[$f]:i.CONSTANT_ALPHA,[zf]:i.ONE_MINUS_CONSTANT_ALPHA};function k(B,xe,ee,oe,ye,_e,et,St,At,it){if(B===Yi){g===!0&&(me(i.BLEND),g=!1);return}if(g===!1&&(de(i.BLEND),g=!0),B!==wf){if(B!==v||it!==C){if((m!==ys||b!==ys)&&(i.blendEquation(i.FUNC_ADD),m=ys,b=ys),it)switch(B){case pa:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yn:i.blendFunc(i.ONE,i.ONE);break;case Ud:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fd:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case pa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yn:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ud:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fd:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}f=null,_=null,M=null,I=null,w.set(0,0,0),E=0,v=B,C=it}return}ye=ye||xe,_e=_e||ee,et=et||oe,(xe!==m||ye!==b)&&(i.blendEquationSeparate(ke[xe],ke[ye]),m=xe,b=ye),(ee!==f||oe!==_||_e!==M||et!==I)&&(i.blendFuncSeparate(Oe[ee],Oe[oe],Oe[_e],Oe[et]),f=ee,_=oe,M=_e,I=et),(St.equals(w)===!1||At!==E)&&(i.blendColor(St.r,St.g,St.b,At),w.copy(St),E=At),v=B,C=!1}function yt(B,xe){B.side===nn?me(i.CULL_FACE):de(i.CULL_FACE);let ee=B.side===sn;xe&&(ee=!ee),Ge(ee),B.blending===pa&&B.transparent===!1?k(Yi):k(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),s.setMask(B.colorWrite);const oe=B.stencilWrite;r.setTest(oe),oe&&(r.setMask(B.stencilWriteMask),r.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),r.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),ot(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?de(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(B){U!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),U=B)}function Xe(B){B!==Mf?(de(i.CULL_FACE),B!==y&&(B===Od?i.cullFace(i.BACK):B===Sf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),y=B}function De(B){B!==x&&(F&&i.lineWidth(B),x=B)}function ot(B,xe,ee){B?(de(i.POLYGON_OFFSET_FILL),(N!==xe||O!==ee)&&(i.polygonOffset(xe,ee),N=xe,O=ee)):me(i.POLYGON_OFFSET_FILL)}function ue(B){B?de(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function A(B){B===void 0&&(B=i.TEXTURE0+G-1),Y!==B&&(i.activeTexture(B),Y=B)}function S(B,xe,ee){ee===void 0&&(Y===null?ee=i.TEXTURE0+G-1:ee=Y);let oe=ie[ee];oe===void 0&&(oe={type:void 0,texture:void 0},ie[ee]=oe),(oe.type!==B||oe.texture!==xe)&&(Y!==ee&&(i.activeTexture(ee),Y=ee),i.bindTexture(B,xe||Q[B]),oe.type=B,oe.texture=xe)}function j(){const B=ie[Y];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function re(){try{i.compressedTexImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function le(){try{i.compressedTexImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function se(){try{i.texSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ae(){try{i.texSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ve(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Se(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Qe(){try{i.texStorage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function he(){try{i.texStorage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function we(){try{i.texImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function $e(){try{i.texImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ze(B){te.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),te.copy(B))}function Ee(B){ae.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),ae.copy(B))}function qe(B,xe){let ee=c.get(xe);ee===void 0&&(ee=new WeakMap,c.set(xe,ee));let oe=ee.get(B);oe===void 0&&(oe=i.getUniformBlockIndex(xe,B.name),ee.set(B,oe))}function He(B,xe){const oe=c.get(xe).get(B);o.get(xe)!==oe&&(i.uniformBlockBinding(xe,oe,B.__bindingPointIndex),o.set(xe,oe))}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},Y=null,ie={},h={},d=new WeakMap,u=[],p=null,g=!1,v=null,m=null,f=null,_=null,b=null,M=null,I=null,w=new Ue(0,0,0),E=0,C=!1,U=null,y=null,x=null,N=null,O=null,te.set(0,0,i.canvas.width,i.canvas.height),ae.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),r.reset()}return{buffers:{color:s,depth:a,stencil:r},enable:de,disable:me,bindFramebuffer:ce,drawBuffers:fe,useProgram:Pe,setBlending:k,setMaterial:yt,setFlipSided:Ge,setCullFace:Xe,setLineWidth:De,setPolygonOffset:ot,setScissorTest:ue,activeTexture:A,bindTexture:S,unbindTexture:j,compressedTexImage2D:re,compressedTexImage3D:le,texImage2D:we,texImage3D:$e,updateUBOMapping:qe,uniformBlockBinding:He,texStorage2D:Qe,texStorage3D:he,texSubImage2D:se,texSubImage3D:Ae,compressedTexSubImage2D:ve,compressedTexSubImage3D:Se,scissor:ze,viewport:Ee,reset:ht}}function Ah(i,e,t,n){const s=lb(n);switch(t){case Fu:return i*e;case $u:return i*e;case zu:return i*e*2;case nd:return i*e/s.components*s.byteLength;case id:return i*e/s.components*s.byteLength;case Gu:return i*e*2/s.components*s.byteLength;case sd:return i*e*2/s.components*s.byteLength;case Bu:return i*e*3/s.components*s.byteLength;case Xn:return i*e*4/s.components*s.byteLength;case ad:return i*e*4/s.components*s.byteLength;case co:case lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ho:case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case al:case ol:return Math.max(i,16)*Math.max(e,8)/4;case sl:case rl:return Math.max(i,8)*Math.max(e,8)/2;case cl:case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ul:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case pl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ml:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case gl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case vl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case yl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case bl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case po:case El:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Hu:case Cl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Al:case Rl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lb(i){switch(i){case Ei:case Nu:return{byteLength:1,components:1};case ur:case Ou:case yr:return{byteLength:2,components:1};case ed:case td:return{byteLength:2,components:4};case Es:case Ql:case ii:return{byteLength:4,components:1};case Uu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function db(i,e,t,n,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Me,h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return p?new OffscreenCanvas(A,S):Ro("canvas")}function v(A,S,j){let re=1;const le=ue(A);if((le.width>j||le.height>j)&&(re=j/Math.max(le.width,le.height)),re<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const se=Math.floor(re*le.width),Ae=Math.floor(re*le.height);d===void 0&&(d=g(se,Ae));const ve=S?g(se,Ae):d;return ve.width=se,ve.height=Ae,ve.getContext("2d").drawImage(A,0,0,se,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+se+"x"+Ae+")."),ve}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),A;return A}function m(A){return A.generateMipmaps&&A.minFilter!==bn&&A.minFilter!==Wn}function f(A){i.generateMipmap(A)}function _(A,S,j,re,le=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let se=S;if(S===i.RED&&(j===i.FLOAT&&(se=i.R32F),j===i.HALF_FLOAT&&(se=i.R16F),j===i.UNSIGNED_BYTE&&(se=i.R8)),S===i.RED_INTEGER&&(j===i.UNSIGNED_BYTE&&(se=i.R8UI),j===i.UNSIGNED_SHORT&&(se=i.R16UI),j===i.UNSIGNED_INT&&(se=i.R32UI),j===i.BYTE&&(se=i.R8I),j===i.SHORT&&(se=i.R16I),j===i.INT&&(se=i.R32I)),S===i.RG&&(j===i.FLOAT&&(se=i.RG32F),j===i.HALF_FLOAT&&(se=i.RG16F),j===i.UNSIGNED_BYTE&&(se=i.RG8)),S===i.RG_INTEGER&&(j===i.UNSIGNED_BYTE&&(se=i.RG8UI),j===i.UNSIGNED_SHORT&&(se=i.RG16UI),j===i.UNSIGNED_INT&&(se=i.RG32UI),j===i.BYTE&&(se=i.RG8I),j===i.SHORT&&(se=i.RG16I),j===i.INT&&(se=i.RG32I)),S===i.RGB_INTEGER&&(j===i.UNSIGNED_BYTE&&(se=i.RGB8UI),j===i.UNSIGNED_SHORT&&(se=i.RGB16UI),j===i.UNSIGNED_INT&&(se=i.RGB32UI),j===i.BYTE&&(se=i.RGB8I),j===i.SHORT&&(se=i.RGB16I),j===i.INT&&(se=i.RGB32I)),S===i.RGBA_INTEGER&&(j===i.UNSIGNED_BYTE&&(se=i.RGBA8UI),j===i.UNSIGNED_SHORT&&(se=i.RGBA16UI),j===i.UNSIGNED_INT&&(se=i.RGBA32UI),j===i.BYTE&&(se=i.RGBA8I),j===i.SHORT&&(se=i.RGBA16I),j===i.INT&&(se=i.RGBA32I)),S===i.RGB&&j===i.UNSIGNED_INT_5_9_9_9_REV&&(se=i.RGB9_E5),S===i.RGBA){const Ae=le?wo:dt.getTransfer(re);j===i.FLOAT&&(se=i.RGBA32F),j===i.HALF_FLOAT&&(se=i.RGBA16F),j===i.UNSIGNED_BYTE&&(se=Ae===bt?i.SRGB8_ALPHA8:i.RGBA8),j===i.UNSIGNED_SHORT_4_4_4_4&&(se=i.RGBA4),j===i.UNSIGNED_SHORT_5_5_5_1&&(se=i.RGB5_A1)}return(se===i.R16F||se===i.R32F||se===i.RG16F||se===i.RG32F||se===i.RGBA16F||se===i.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function b(A,S){let j;return A?S===null||S===Es||S===xa?j=i.DEPTH24_STENCIL8:S===ii?j=i.DEPTH32F_STENCIL8:S===ur&&(j=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Es||S===xa?j=i.DEPTH_COMPONENT24:S===ii?j=i.DEPTH_COMPONENT32F:S===ur&&(j=i.DEPTH_COMPONENT16),j}function M(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==bn&&A.minFilter!==Wn?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function I(A){const S=A.target;S.removeEventListener("dispose",I),E(S),S.isVideoTexture&&h.delete(S)}function w(A){const S=A.target;S.removeEventListener("dispose",w),U(S)}function E(A){const S=n.get(A);if(S.__webglInit===void 0)return;const j=A.source,re=u.get(j);if(re){const le=re[S.__cacheKey];le.usedTimes--,le.usedTimes===0&&C(A),Object.keys(re).length===0&&u.delete(j)}n.remove(A)}function C(A){const S=n.get(A);i.deleteTexture(S.__webglTexture);const j=A.source,re=u.get(j);delete re[S.__cacheKey],r.memory.textures--}function U(A){const S=n.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(S.__webglFramebuffer[re]))for(let le=0;le<S.__webglFramebuffer[re].length;le++)i.deleteFramebuffer(S.__webglFramebuffer[re][le]);else i.deleteFramebuffer(S.__webglFramebuffer[re]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[re])}else{if(Array.isArray(S.__webglFramebuffer))for(let re=0;re<S.__webglFramebuffer.length;re++)i.deleteFramebuffer(S.__webglFramebuffer[re]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let re=0;re<S.__webglColorRenderbuffer.length;re++)S.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[re]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const j=A.textures;for(let re=0,le=j.length;re<le;re++){const se=n.get(j[re]);se.__webglTexture&&(i.deleteTexture(se.__webglTexture),r.memory.textures--),n.remove(j[re])}n.remove(A)}let y=0;function x(){y=0}function N(){const A=y;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),y+=1,A}function O(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function G(A,S){const j=n.get(A);if(A.isVideoTexture&&De(A),A.isRenderTargetTexture===!1&&A.version>0&&j.__version!==A.version){const re=A.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(j,A,S);return}}t.bindTexture(i.TEXTURE_2D,j.__webglTexture,i.TEXTURE0+S)}function F(A,S){const j=n.get(A);if(A.version>0&&j.__version!==A.version){ae(j,A,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,j.__webglTexture,i.TEXTURE0+S)}function R(A,S){const j=n.get(A);if(A.version>0&&j.__version!==A.version){ae(j,A,S);return}t.bindTexture(i.TEXTURE_3D,j.__webglTexture,i.TEXTURE0+S)}function W(A,S){const j=n.get(A);if(A.version>0&&j.__version!==A.version){$(j,A,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture,i.TEXTURE0+S)}const Y={[So]:i.REPEAT,[xs]:i.CLAMP_TO_EDGE,[il]:i.MIRRORED_REPEAT},ie={[bn]:i.NEAREST,[Kf]:i.NEAREST_MIPMAP_NEAREST,[Tr]:i.NEAREST_MIPMAP_LINEAR,[Wn]:i.LINEAR,[tc]:i.LINEAR_MIPMAP_NEAREST,[Ms]:i.LINEAR_MIPMAP_LINEAR},D={[em]:i.NEVER,[rm]:i.ALWAYS,[tm]:i.LESS,[Wu]:i.LEQUAL,[nm]:i.EQUAL,[am]:i.GEQUAL,[im]:i.GREATER,[sm]:i.NOTEQUAL};function P(A,S){if(S.type===ii&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Wn||S.magFilter===tc||S.magFilter===Tr||S.magFilter===Ms||S.minFilter===Wn||S.minFilter===tc||S.minFilter===Tr||S.minFilter===Ms)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Y[S.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Y[S.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Y[S.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ie[S.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ie[S.minFilter]),S.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,D[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===bn||S.minFilter!==Tr&&S.minFilter!==Ms||S.type===ii&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const j=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function te(A,S){let j=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",I));const re=S.source;let le=u.get(re);le===void 0&&(le={},u.set(re,le));const se=O(S);if(se!==A.__cacheKey){le[se]===void 0&&(le[se]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,j=!0),le[se].usedTimes++;const Ae=le[A.__cacheKey];Ae!==void 0&&(le[A.__cacheKey].usedTimes--,Ae.usedTimes===0&&C(S)),A.__cacheKey=se,A.__webglTexture=le[se].texture}return j}function ae(A,S,j){let re=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(re=i.TEXTURE_3D);const le=te(A,S),se=S.source;t.bindTexture(re,A.__webglTexture,i.TEXTURE0+j);const Ae=n.get(se);if(se.version!==Ae.__version||le===!0){t.activeTexture(i.TEXTURE0+j);const ve=dt.getPrimaries(dt.workingColorSpace),Se=S.colorSpace===Xi?null:dt.getPrimaries(S.colorSpace),Qe=S.colorSpace===Xi||ve===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let he=v(S.image,!1,s.maxTextureSize);he=ot(S,he);const we=a.convert(S.format,S.colorSpace),$e=a.convert(S.type);let ze=_(S.internalFormat,we,$e,S.colorSpace,S.isVideoTexture);P(re,S);let Ee;const qe=S.mipmaps,He=S.isVideoTexture!==!0,ht=Ae.__version===void 0||le===!0,B=se.dataReady,xe=M(S,he);if(S.isDepthTexture)ze=b(S.format===Ma,S.type),ht&&(He?t.texStorage2D(i.TEXTURE_2D,1,ze,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,ze,he.width,he.height,0,we,$e,null));else if(S.isDataTexture)if(qe.length>0){He&&ht&&t.texStorage2D(i.TEXTURE_2D,xe,ze,qe[0].width,qe[0].height);for(let ee=0,oe=qe.length;ee<oe;ee++)Ee=qe[ee],He?B&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Ee.width,Ee.height,we,$e,Ee.data):t.texImage2D(i.TEXTURE_2D,ee,ze,Ee.width,Ee.height,0,we,$e,Ee.data);S.generateMipmaps=!1}else He?(ht&&t.texStorage2D(i.TEXTURE_2D,xe,ze,he.width,he.height),B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he.width,he.height,we,$e,he.data)):t.texImage2D(i.TEXTURE_2D,0,ze,he.width,he.height,0,we,$e,he.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){He&&ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,ze,qe[0].width,qe[0].height,he.depth);for(let ee=0,oe=qe.length;ee<oe;ee++)if(Ee=qe[ee],S.format!==Xn)if(we!==null)if(He){if(B)if(S.layerUpdates.size>0){const ye=Ah(Ee.width,Ee.height,S.format,S.type);for(const _e of S.layerUpdates){const et=Ee.data.subarray(_e*ye/Ee.data.BYTES_PER_ELEMENT,(_e+1)*ye/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,_e,Ee.width,Ee.height,1,we,et,0,0)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Ee.width,Ee.height,he.depth,we,Ee.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,ze,Ee.width,Ee.height,he.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?B&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Ee.width,Ee.height,he.depth,we,$e,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,ze,Ee.width,Ee.height,he.depth,0,we,$e,Ee.data)}else{He&&ht&&t.texStorage2D(i.TEXTURE_2D,xe,ze,qe[0].width,qe[0].height);for(let ee=0,oe=qe.length;ee<oe;ee++)Ee=qe[ee],S.format!==Xn?we!==null?He?B&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,Ee.width,Ee.height,we,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,ze,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?B&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Ee.width,Ee.height,we,$e,Ee.data):t.texImage2D(i.TEXTURE_2D,ee,ze,Ee.width,Ee.height,0,we,$e,Ee.data)}else if(S.isDataArrayTexture)if(He){if(ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,ze,he.width,he.height,he.depth),B)if(S.layerUpdates.size>0){const ee=Ah(he.width,he.height,S.format,S.type);for(const oe of S.layerUpdates){const ye=he.data.subarray(oe*ee/he.data.BYTES_PER_ELEMENT,(oe+1)*ee/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,he.width,he.height,1,we,$e,ye)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,we,$e,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ze,he.width,he.height,he.depth,0,we,$e,he.data);else if(S.isData3DTexture)He?(ht&&t.texStorage3D(i.TEXTURE_3D,xe,ze,he.width,he.height,he.depth),B&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,we,$e,he.data)):t.texImage3D(i.TEXTURE_3D,0,ze,he.width,he.height,he.depth,0,we,$e,he.data);else if(S.isFramebufferTexture){if(ht)if(He)t.texStorage2D(i.TEXTURE_2D,xe,ze,he.width,he.height);else{let ee=he.width,oe=he.height;for(let ye=0;ye<xe;ye++)t.texImage2D(i.TEXTURE_2D,ye,ze,ee,oe,0,we,$e,null),ee>>=1,oe>>=1}}else if(qe.length>0){if(He&&ht){const ee=ue(qe[0]);t.texStorage2D(i.TEXTURE_2D,xe,ze,ee.width,ee.height)}for(let ee=0,oe=qe.length;ee<oe;ee++)Ee=qe[ee],He?B&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,we,$e,Ee):t.texImage2D(i.TEXTURE_2D,ee,ze,we,$e,Ee);S.generateMipmaps=!1}else if(He){if(ht){const ee=ue(he);t.texStorage2D(i.TEXTURE_2D,xe,ze,ee.width,ee.height)}B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,$e,he)}else t.texImage2D(i.TEXTURE_2D,0,ze,we,$e,he);m(S)&&f(re),Ae.__version=se.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function $(A,S,j){if(S.image.length!==6)return;const re=te(A,S),le=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+j);const se=n.get(le);if(le.version!==se.__version||re===!0){t.activeTexture(i.TEXTURE0+j);const Ae=dt.getPrimaries(dt.workingColorSpace),ve=S.colorSpace===Xi?null:dt.getPrimaries(S.colorSpace),Se=S.colorSpace===Xi||Ae===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Qe=S.isCompressedTexture||S.image[0].isCompressedTexture,he=S.image[0]&&S.image[0].isDataTexture,we=[];for(let oe=0;oe<6;oe++)!Qe&&!he?we[oe]=v(S.image[oe],!0,s.maxCubemapSize):we[oe]=he?S.image[oe].image:S.image[oe],we[oe]=ot(S,we[oe]);const $e=we[0],ze=a.convert(S.format,S.colorSpace),Ee=a.convert(S.type),qe=_(S.internalFormat,ze,Ee,S.colorSpace),He=S.isVideoTexture!==!0,ht=se.__version===void 0||re===!0,B=le.dataReady;let xe=M(S,$e);P(i.TEXTURE_CUBE_MAP,S);let ee;if(Qe){He&&ht&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,qe,$e.width,$e.height);for(let oe=0;oe<6;oe++){ee=we[oe].mipmaps;for(let ye=0;ye<ee.length;ye++){const _e=ee[ye];S.format!==Xn?ze!==null?He?B&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye,0,0,_e.width,_e.height,ze,_e.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye,qe,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye,0,0,_e.width,_e.height,ze,Ee,_e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye,qe,_e.width,_e.height,0,ze,Ee,_e.data)}}}else{if(ee=S.mipmaps,He&&ht){ee.length>0&&xe++;const oe=ue(we[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,qe,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(he){He?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,we[oe].width,we[oe].height,ze,Ee,we[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,qe,we[oe].width,we[oe].height,0,ze,Ee,we[oe].data);for(let ye=0;ye<ee.length;ye++){const et=ee[ye].image[oe].image;He?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye+1,0,0,et.width,et.height,ze,Ee,et.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye+1,qe,et.width,et.height,0,ze,Ee,et.data)}}else{He?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ze,Ee,we[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,qe,ze,Ee,we[oe]);for(let ye=0;ye<ee.length;ye++){const _e=ee[ye];He?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye+1,0,0,ze,Ee,_e.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye+1,qe,ze,Ee,_e.image[oe])}}}m(S)&&f(i.TEXTURE_CUBE_MAP),se.__version=le.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Q(A,S,j,re,le,se){const Ae=a.convert(j.format,j.colorSpace),ve=a.convert(j.type),Se=_(j.internalFormat,Ae,ve,j.colorSpace);if(!n.get(S).__hasExternalTextures){const he=Math.max(1,S.width>>se),we=Math.max(1,S.height>>se);le===i.TEXTURE_3D||le===i.TEXTURE_2D_ARRAY?t.texImage3D(le,se,Se,he,we,S.depth,0,Ae,ve,null):t.texImage2D(le,se,Se,he,we,0,Ae,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),Xe(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,le,n.get(j).__webglTexture,0,Ge(S)):(le===i.TEXTURE_2D||le>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,le,n.get(j).__webglTexture,se),t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(A,S,j){if(i.bindRenderbuffer(i.RENDERBUFFER,A),S.depthBuffer){const re=S.depthTexture,le=re&&re.isDepthTexture?re.type:null,se=b(S.stencilBuffer,le),Ae=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=Ge(S);Xe(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,se,S.width,S.height):j?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,se,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,se,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,A)}else{const re=S.textures;for(let le=0;le<re.length;le++){const se=re[le],Ae=a.convert(se.format,se.colorSpace),ve=a.convert(se.type),Se=_(se.internalFormat,Ae,ve,se.colorSpace),Qe=Ge(S);j&&Xe(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Qe,Se,S.width,S.height):Xe(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Qe,Se,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Se,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function me(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),G(S.depthTexture,0);const re=n.get(S.depthTexture).__webglTexture,le=Ge(S);if(S.depthTexture.format===fa)Xe(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0);else if(S.depthTexture.format===Ma)Xe(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function ce(A){const S=n.get(A),j=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const re=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),re){const le=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,re.removeEventListener("dispose",le)};re.addEventListener("dispose",le),S.__depthDisposeCallback=le}S.__boundDepthTexture=re}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");me(S.__webglFramebuffer,A)}else if(j){S.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[re]),S.__webglDepthbuffer[re]===void 0)S.__webglDepthbuffer[re]=i.createRenderbuffer(),de(S.__webglDepthbuffer[re],A,!1);else{const le=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=S.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,se)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),de(S.__webglDepthbuffer,A,!1);else{const re=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,le)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function fe(A,S,j){const re=n.get(A);S!==void 0&&Q(re.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),j!==void 0&&ce(A)}function Pe(A){const S=A.texture,j=n.get(A),re=n.get(S);A.addEventListener("dispose",w);const le=A.textures,se=A.isWebGLCubeRenderTarget===!0,Ae=le.length>1;if(Ae||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=S.version,r.memory.textures++),se){j.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(S.mipmaps&&S.mipmaps.length>0){j.__webglFramebuffer[ve]=[];for(let Se=0;Se<S.mipmaps.length;Se++)j.__webglFramebuffer[ve][Se]=i.createFramebuffer()}else j.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){j.__webglFramebuffer=[];for(let ve=0;ve<S.mipmaps.length;ve++)j.__webglFramebuffer[ve]=i.createFramebuffer()}else j.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let ve=0,Se=le.length;ve<Se;ve++){const Qe=n.get(le[ve]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=i.createTexture(),r.memory.textures++)}if(A.samples>0&&Xe(A)===!1){j.__webglMultisampledFramebuffer=i.createFramebuffer(),j.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let ve=0;ve<le.length;ve++){const Se=le[ve];j.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,j.__webglColorRenderbuffer[ve]);const Qe=a.convert(Se.format,Se.colorSpace),he=a.convert(Se.type),we=_(Se.internalFormat,Qe,he,Se.colorSpace,A.isXRRenderTarget===!0),$e=Ge(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,$e,we,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,j.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(j.__webglDepthRenderbuffer=i.createRenderbuffer(),de(j.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),P(i.TEXTURE_CUBE_MAP,S);for(let ve=0;ve<6;ve++)if(S.mipmaps&&S.mipmaps.length>0)for(let Se=0;Se<S.mipmaps.length;Se++)Q(j.__webglFramebuffer[ve][Se],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Se);else Q(j.__webglFramebuffer[ve],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(S)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let ve=0,Se=le.length;ve<Se;ve++){const Qe=le[ve],he=n.get(Qe);t.bindTexture(i.TEXTURE_2D,he.__webglTexture),P(i.TEXTURE_2D,Qe),Q(j.__webglFramebuffer,A,Qe,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,0),m(Qe)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ve=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,re.__webglTexture),P(ve,S),S.mipmaps&&S.mipmaps.length>0)for(let Se=0;Se<S.mipmaps.length;Se++)Q(j.__webglFramebuffer[Se],A,S,i.COLOR_ATTACHMENT0,ve,Se);else Q(j.__webglFramebuffer,A,S,i.COLOR_ATTACHMENT0,ve,0);m(S)&&f(ve),t.unbindTexture()}A.depthBuffer&&ce(A)}function ke(A){const S=A.textures;for(let j=0,re=S.length;j<re;j++){const le=S[j];if(m(le)){const se=A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Ae=n.get(le).__webglTexture;t.bindTexture(se,Ae),f(se),t.unbindTexture()}}}const Oe=[],k=[];function yt(A){if(A.samples>0){if(Xe(A)===!1){const S=A.textures,j=A.width,re=A.height;let le=i.COLOR_BUFFER_BIT;const se=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(A),ve=S.length>1;if(ve)for(let Se=0;Se<S.length;Se++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Se=0;Se<S.length;Se++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(le|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(le|=i.STENCIL_BUFFER_BIT)),ve){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Se]);const Qe=n.get(S[Se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Qe,0)}i.blitFramebuffer(0,0,j,re,0,0,j,re,le,i.NEAREST),c===!0&&(Oe.length=0,k.length=0,Oe.push(i.COLOR_ATTACHMENT0+Se),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Oe.push(se),k.push(se),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,k)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Oe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let Se=0;Se<S.length;Se++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Se]);const Qe=n.get(S[Se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,Qe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const S=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Ge(A){return Math.min(s.maxSamples,A.samples)}function Xe(A){const S=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function De(A){const S=r.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function ot(A,S){const j=A.colorSpace,re=A.format,le=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||j!==is&&j!==Xi&&(dt.getTransfer(j)===bt?(re!==Xn||le!==Ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),S}function ue(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=x,this.setTexture2D=G,this.setTexture2DArray=F,this.setTexture3D=R,this.setTextureCube=W,this.rebindTextures=fe,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=Xe}function hb(i,e){function t(n,s=Xi){let a;const r=dt.getTransfer(s);if(n===Ei)return i.UNSIGNED_BYTE;if(n===ed)return i.UNSIGNED_SHORT_4_4_4_4;if(n===td)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Nu)return i.BYTE;if(n===Ou)return i.SHORT;if(n===ur)return i.UNSIGNED_SHORT;if(n===Ql)return i.INT;if(n===Es)return i.UNSIGNED_INT;if(n===ii)return i.FLOAT;if(n===yr)return i.HALF_FLOAT;if(n===Fu)return i.ALPHA;if(n===Bu)return i.RGB;if(n===Xn)return i.RGBA;if(n===$u)return i.LUMINANCE;if(n===zu)return i.LUMINANCE_ALPHA;if(n===fa)return i.DEPTH_COMPONENT;if(n===Ma)return i.DEPTH_STENCIL;if(n===nd)return i.RED;if(n===id)return i.RED_INTEGER;if(n===Gu)return i.RG;if(n===sd)return i.RG_INTEGER;if(n===ad)return i.RGBA_INTEGER;if(n===co||n===lo||n===ho||n===uo)if(r===bt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===co)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ho)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===uo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===co)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ho)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===uo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sl||n===al||n===rl||n===ol)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===sl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===al)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rl)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ol)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===cl||n===ll||n===dl)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===cl||n===ll)return r===bt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===dl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===hl||n===ul||n===pl||n===fl||n===ml||n===gl||n===vl||n===yl||n===bl||n===_l||n===xl||n===Ml||n===Sl||n===wl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===hl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ul)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ml)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_l)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ml)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wl)return r===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===po||n===El||n===Tl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===po)return r===bt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===El)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hu||n===Cl||n===Al||n===Rl)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===po)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Cl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Al)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xa?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class ub extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class vt extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pb={type:"move"};class Pc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,a=null,r=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pb)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new vt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const fb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class gb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new an,a=e.properties.get(s);a.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new es({vertexShader:fb,fragmentShader:mb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new q(new as(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vb extends Ra{constructor(e,t){super();const n=this;let s=null,a=1,r=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,g=null;const v=new gb,m=t.getContextAttributes();let f=null,_=null;const b=[],M=[],I=new Me;let w=null;const E=new Zt;E.layers.enable(1),E.viewport=new pt;const C=new Zt;C.layers.enable(2),C.viewport=new pt;const U=[E,C],y=new ub;y.layers.enable(1),y.layers.enable(2);let x=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=b[$];return Q===void 0&&(Q=new Pc,b[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=b[$];return Q===void 0&&(Q=new Pc,b[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=b[$];return Q===void 0&&(Q=new Pc,b[$]=Q),Q.getHandSpace()};function O($){const Q=M.indexOf($.inputSource);if(Q===-1)return;const de=b[Q];de!==void 0&&(de.update($.inputSource,$.frame,l||r),de.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",F);for(let $=0;$<b.length;$++){const Q=M[$];Q!==null&&(M[$]=null,b[$].disconnect(Q))}x=null,N=null,v.reset(),e.setRenderTarget(f),p=null,u=null,d=null,s=null,_=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",G),s.addEventListener("inputsourceschange",F),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(I),s.renderState.layers===void 0){const Q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,t,Q),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Ts(p.framebufferWidth,p.framebufferHeight,{format:Xn,type:Ei,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Q=null,de=null,me=null;m.depth&&(me=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=m.stencil?Ma:fa,de=m.stencil?xa:Es);const ce={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:a};d=new XRWebGLBinding(s,t),u=d.createProjectionLayer(ce),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new Ts(u.textureWidth,u.textureHeight,{format:Xn,type:Ei,depthTexture:new sp(u.textureWidth,u.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await s.requestReferenceSpace(o),ae.setContext(s),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function F($){for(let Q=0;Q<$.removed.length;Q++){const de=$.removed[Q],me=M.indexOf(de);me>=0&&(M[me]=null,b[me].disconnect(de))}for(let Q=0;Q<$.added.length;Q++){const de=$.added[Q];let me=M.indexOf(de);if(me===-1){for(let fe=0;fe<b.length;fe++)if(fe>=M.length){M.push(de),me=fe;break}else if(M[fe]===null){M[fe]=de,me=fe;break}if(me===-1)break}const ce=b[me];ce&&ce.connect(de)}}const R=new L,W=new L;function Y($,Q,de){R.setFromMatrixPosition(Q.matrixWorld),W.setFromMatrixPosition(de.matrixWorld);const me=R.distanceTo(W),ce=Q.projectionMatrix.elements,fe=de.projectionMatrix.elements,Pe=ce[14]/(ce[10]-1),ke=ce[14]/(ce[10]+1),Oe=(ce[9]+1)/ce[5],k=(ce[9]-1)/ce[5],yt=(ce[8]-1)/ce[0],Ge=(fe[8]+1)/fe[0],Xe=Pe*yt,De=Pe*Ge,ot=me/(-yt+Ge),ue=ot*-yt;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ue),$.translateZ(ot),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),ce[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const A=Pe+ot,S=ke+ot,j=Xe-ue,re=De+(me-ue),le=Oe*ke/S*A,se=k*ke/S*A;$.projectionMatrix.makePerspective(j,re,le,se,A,S),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ie($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let Q=$.near,de=$.far;v.texture!==null&&(v.depthNear>0&&(Q=v.depthNear),v.depthFar>0&&(de=v.depthFar)),y.near=C.near=E.near=Q,y.far=C.far=E.far=de,(x!==y.near||N!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),x=y.near,N=y.far);const me=$.parent,ce=y.cameras;ie(y,me);for(let fe=0;fe<ce.length;fe++)ie(ce[fe],me);ce.length===2?Y(y,E,C):y.projectionMatrix.copy(E.projectionMatrix),D($,y,me)};function D($,Q,de){de===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(de.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ao*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let P=null;function te($,Q){if(h=Q.getViewerPose(l||r),g=Q,h!==null){const de=h.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let me=!1;de.length!==y.cameras.length&&(y.cameras.length=0,me=!0);for(let fe=0;fe<de.length;fe++){const Pe=de[fe];let ke=null;if(p!==null)ke=p.getViewport(Pe);else{const k=d.getViewSubImage(u,Pe);ke=k.viewport,fe===0&&(e.setRenderTargetTextures(_,k.colorTexture,u.ignoreDepthValues?void 0:k.depthStencilTexture),e.setRenderTarget(_))}let Oe=U[fe];Oe===void 0&&(Oe=new Zt,Oe.layers.enable(fe),Oe.viewport=new pt,U[fe]=Oe),Oe.matrix.fromArray(Pe.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(Pe.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(ke.x,ke.y,ke.width,ke.height),fe===0&&(y.matrix.copy(Oe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),me===!0&&y.cameras.push(Oe)}const ce=s.enabledFeatures;if(ce&&ce.includes("depth-sensing")){const fe=d.getDepthInformation(de[0]);fe&&fe.isValid&&fe.texture&&v.init(e,fe,s.renderState)}}for(let de=0;de<b.length;de++){const me=M[de],ce=b[de];me!==null&&ce!==void 0&&ce.update(me,Q,l||r)}P&&P($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const ae=new np;ae.setAnimationLoop(te),this.setAnimationLoop=function($){P=$},this.dispose=function(){}}}const fs=new oi,yb=new lt;function bb(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Qu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,_,b,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(m,f):f.isMeshToonMaterial?(a(m,f),d(m,f)):f.isMeshPhongMaterial?(a(m,f),h(m,f)):f.isMeshStandardMaterial?(a(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(a(m,f),g(m,f)):f.isMeshDepthMaterial?a(m,f):f.isMeshDistanceMaterial?(a(m,f),v(m,f)):f.isMeshNormalMaterial?a(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,_,b):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===sn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===sn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const _=e.get(f),b=_.envMap,M=_.envMapRotation;b&&(m.envMap.value=b,fs.copy(M),fs.x*=-1,fs.y*=-1,fs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),m.envMapRotation.value.setFromMatrix4(yb.makeRotationFromEuler(fs)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,_,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*_,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,_){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===sn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const _=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function _b(i,e,t,n){let s={},a={},r=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,b){const M=b.program;n.uniformBlockBinding(_,M)}function l(_,b){let M=s[_.id];M===void 0&&(g(_),M=h(_),s[_.id]=M,_.addEventListener("dispose",m));const I=b.program;n.updateUBOMapping(_,I);const w=e.render.frame;a[_.id]!==w&&(u(_),a[_.id]=w)}function h(_){const b=d();_.__bindingPointIndex=b;const M=i.createBuffer(),I=_.__size,w=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,I,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function d(){for(let _=0;_<o;_++)if(r.indexOf(_)===-1)return r.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const b=s[_.id],M=_.uniforms,I=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let w=0,E=M.length;w<E;w++){const C=Array.isArray(M[w])?M[w]:[M[w]];for(let U=0,y=C.length;U<y;U++){const x=C[U];if(p(x,w,U,I)===!0){const N=x.__offset,O=Array.isArray(x.value)?x.value:[x.value];let G=0;for(let F=0;F<O.length;F++){const R=O[F],W=v(R);typeof R=="number"||typeof R=="boolean"?(x.__data[0]=R,i.bufferSubData(i.UNIFORM_BUFFER,N+G,x.__data)):R.isMatrix3?(x.__data[0]=R.elements[0],x.__data[1]=R.elements[1],x.__data[2]=R.elements[2],x.__data[3]=0,x.__data[4]=R.elements[3],x.__data[5]=R.elements[4],x.__data[6]=R.elements[5],x.__data[7]=0,x.__data[8]=R.elements[6],x.__data[9]=R.elements[7],x.__data[10]=R.elements[8],x.__data[11]=0):(R.toArray(x.__data,G),G+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,x.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(_,b,M,I){const w=_.value,E=b+"_"+M;if(I[E]===void 0)return typeof w=="number"||typeof w=="boolean"?I[E]=w:I[E]=w.clone(),!0;{const C=I[E];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return I[E]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function g(_){const b=_.uniforms;let M=0;const I=16;for(let E=0,C=b.length;E<C;E++){const U=Array.isArray(b[E])?b[E]:[b[E]];for(let y=0,x=U.length;y<x;y++){const N=U[y],O=Array.isArray(N.value)?N.value:[N.value];for(let G=0,F=O.length;G<F;G++){const R=O[G],W=v(R),Y=M%I,ie=Y%W.boundary,D=Y+ie;M+=ie,D!==0&&I-D<W.storage&&(M+=I-D),N.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=M,M+=W.storage}}}const w=M%I;return w>0&&(M+=I-w),_.__size=M,_.__cache={},this}function v(_){const b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=48,b.storage=48):_.isMatrix4?(b.boundary=64,b.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),b}function m(_){const b=_.target;b.removeEventListener("dispose",m);const M=r.indexOf(b.__bindingPointIndex);r.splice(M,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete a[b.id]}function f(){for(const _ in s)i.deleteBuffer(s[_]);r=[],s={},a={}}return{bind:c,update:l,dispose:f}}class xb{constructor(e={}){const{canvas:t=cm(),context:n=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=r;const p=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const f=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Tn,this.toneMapping=Ki,this.toneMappingExposure=1;const b=this;let M=!1,I=0,w=0,E=null,C=-1,U=null;const y=new pt,x=new pt;let N=null;const O=new Ue(0);let G=0,F=t.width,R=t.height,W=1,Y=null,ie=null;const D=new pt(0,0,F,R),P=new pt(0,0,F,R);let te=!1;const ae=new cd;let $=!1,Q=!1;const de=new lt,me=new lt,ce=new L,fe=new pt,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ke=!1;function Oe(){return E===null?W:1}let k=n;function yt(T,z){return t.getContext(T,z)}try{const T={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zl}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",_e,!1),k===null){const z="webgl2";if(k=yt(z,T),k===null)throw yt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ge,Xe,De,ot,ue,A,S,j,re,le,se,Ae,ve,Se,Qe,he,we,$e,ze,Ee,qe,He,ht,B;function xe(){Ge=new Tv(k),Ge.init(),He=new hb(k,Ge),Xe=new _v(k,Ge,e,He),De=new cb(k),Xe.reverseDepthBuffer&&De.buffers.depth.setReversed(!0),ot=new Rv(k),ue=new qy,A=new db(k,Ge,De,ue,Xe,He,ot),S=new Mv(b),j=new Ev(b),re=new Om(k),ht=new yv(k,re),le=new Cv(k,re,ot,ht),se=new Lv(k,le,re,ot),ze=new Pv(k,Xe,A),he=new xv(ue),Ae=new Xy(b,S,j,Ge,Xe,ht,he),ve=new bb(b,ue),Se=new Yy,Qe=new tb(Ge),$e=new vv(b,S,j,De,se,u,c),we=new rb(b,se,Xe),B=new _b(k,ot,Xe,De),Ee=new bv(k,Ge,ot),qe=new Av(k,Ge,ot),ot.programs=Ae.programs,b.capabilities=Xe,b.extensions=Ge,b.properties=ue,b.renderLists=Se,b.shadowMap=we,b.state=De,b.info=ot}xe();const ee=new vb(b,k);this.xr=ee,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const T=Ge.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ge.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(T){T!==void 0&&(W=T,this.setSize(F,R,!1))},this.getSize=function(T){return T.set(F,R)},this.setSize=function(T,z,K=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=T,R=z,t.width=Math.floor(T*W),t.height=Math.floor(z*W),K===!0&&(t.style.width=T+"px",t.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(F*W,R*W).floor()},this.setDrawingBufferSize=function(T,z,K){F=T,R=z,W=K,t.width=Math.floor(T*K),t.height=Math.floor(z*K),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(y)},this.getViewport=function(T){return T.copy(D)},this.setViewport=function(T,z,K,Z){T.isVector4?D.set(T.x,T.y,T.z,T.w):D.set(T,z,K,Z),De.viewport(y.copy(D).multiplyScalar(W).round())},this.getScissor=function(T){return T.copy(P)},this.setScissor=function(T,z,K,Z){T.isVector4?P.set(T.x,T.y,T.z,T.w):P.set(T,z,K,Z),De.scissor(x.copy(P).multiplyScalar(W).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(T){De.setScissorTest(te=T)},this.setOpaqueSort=function(T){Y=T},this.setTransparentSort=function(T){ie=T},this.getClearColor=function(T){return T.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor.apply($e,arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha.apply($e,arguments)},this.clear=function(T=!0,z=!0,K=!0){let Z=0;if(T){let H=!1;if(E!==null){const pe=E.texture.format;H=pe===ad||pe===sd||pe===id}if(H){const pe=E.texture.type,be=pe===Ei||pe===Es||pe===ur||pe===xa||pe===ed||pe===td,Te=$e.getClearColor(),Re=$e.getClearAlpha(),Fe=Te.r,Be=Te.g,Le=Te.b;be?(p[0]=Fe,p[1]=Be,p[2]=Le,p[3]=Re,k.clearBufferuiv(k.COLOR,0,p)):(g[0]=Fe,g[1]=Be,g[2]=Le,g[3]=Re,k.clearBufferiv(k.COLOR,0,g))}else Z|=k.COLOR_BUFFER_BIT}z&&(Z|=k.DEPTH_BUFFER_BIT,k.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),K&&(Z|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),Se.dispose(),Qe.dispose(),ue.dispose(),S.dispose(),j.dispose(),se.dispose(),ht.dispose(),B.dispose(),Ae.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",rs),ee.removeEventListener("sessionend",Mr),ui.stop()};function oe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const T=ot.autoReset,z=we.enabled,K=we.autoUpdate,Z=we.needsUpdate,H=we.type;xe(),ot.autoReset=T,we.enabled=z,we.autoUpdate=K,we.needsUpdate=Z,we.type=H}function _e(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function et(T){const z=T.target;z.removeEventListener("dispose",et),St(z)}function St(T){At(T),ue.remove(T)}function At(T){const z=ue.get(T).programs;z!==void 0&&(z.forEach(function(K){Ae.releaseProgram(K)}),T.isShaderMaterial&&Ae.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,K,Z,H,pe){z===null&&(z=Pe);const be=H.isMesh&&H.matrixWorld.determinant()<0,Te=Qo(T,z,K,Z,H);De.setMaterial(Z,be);let Re=K.index,Fe=1;if(Z.wireframe===!0){if(Re=le.getWireframeAttribute(K),Re===void 0)return;Fe=2}const Be=K.drawRange,Le=K.attributes.position;let rt=Be.start*Fe,mt=(Be.start+Be.count)*Fe;pe!==null&&(rt=Math.max(rt,pe.start*Fe),mt=Math.min(mt,(pe.start+pe.count)*Fe)),Re!==null?(rt=Math.max(rt,0),mt=Math.min(mt,Re.count)):Le!=null&&(rt=Math.max(rt,0),mt=Math.min(mt,Le.count));const gt=mt-rt;if(gt<0||gt===1/0)return;ht.setup(H,Z,Te,K,Re);let cn,st=Ee;if(Re!==null&&(cn=re.get(Re),st=qe,st.setIndex(cn)),H.isMesh)Z.wireframe===!0?(De.setLineWidth(Z.wireframeLinewidth*Oe()),st.setMode(k.LINES)):st.setMode(k.TRIANGLES);else if(H.isLine){let Ie=Z.linewidth;Ie===void 0&&(Ie=1),De.setLineWidth(Ie*Oe()),H.isLineSegments?st.setMode(k.LINES):H.isLineLoop?st.setMode(k.LINE_LOOP):st.setMode(k.LINE_STRIP)}else H.isPoints?st.setMode(k.POINTS):H.isSprite&&st.setMode(k.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)st.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))st.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ie=H._multiDrawStarts,Ut=H._multiDrawCounts,tt=H._multiDrawCount,qt=Re?re.get(Re).bytesPerElement:1,ki=ue.get(Z).currentProgram.getUniforms();for(let ln=0;ln<tt;ln++)ki.setValue(k,"_gl_DrawID",ln),st.render(Ie[ln]/qt,Ut[ln])}else if(H.isInstancedMesh)st.renderInstances(rt,gt,H.count);else if(K.isInstancedBufferGeometry){const Ie=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ut=Math.min(K.instanceCount,Ie);st.renderInstances(rt,gt,Ut)}else st.render(rt,gt)};function it(T,z,K){T.transparent===!0&&T.side===nn&&T.forceSinglePass===!1?(T.side=sn,T.needsUpdate=!0,Di(T,z,K),T.side=ri,T.needsUpdate=!0,Di(T,z,K),T.side=nn):Di(T,z,K)}this.compile=function(T,z,K=null){K===null&&(K=T),m=Qe.get(K),m.init(z),_.push(m),K.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),T!==K&&T.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),m.setupLights();const Z=new Set;return T.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const pe=H.material;if(pe)if(Array.isArray(pe))for(let be=0;be<pe.length;be++){const Te=pe[be];it(Te,K,H),Z.add(Te)}else it(pe,K,H),Z.add(pe)}),_.pop(),m=null,Z},this.compileAsync=function(T,z,K=null){const Z=this.compile(T,z,K);return new Promise(H=>{function pe(){if(Z.forEach(function(be){ue.get(be).currentProgram.isReady()&&Z.delete(be)}),Z.size===0){H(T);return}setTimeout(pe,10)}Ge.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Xt=null;function $n(T){Xt&&Xt(T)}function rs(){ui.stop()}function Mr(){ui.start()}const ui=new np;ui.setAnimationLoop($n),typeof self<"u"&&ui.setContext(self),this.setAnimationLoop=function(T){Xt=T,ee.setAnimationLoop(T),T===null?ui.stop():ui.start()},ee.addEventListener("sessionstart",rs),ee.addEventListener("sessionend",Mr),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(z),z=ee.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,z,E),m=Qe.get(T,_.length),m.init(z),_.push(m),me.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ae.setFromProjectionMatrix(me),Q=this.localClippingEnabled,$=he.init(this.clippingPlanes,Q),v=Se.get(T,f.length),v.init(),f.push(v),ee.enabled===!0&&ee.isPresenting===!0){const pe=b.xr.getDepthSensingMesh();pe!==null&&ka(pe,z,-1/0,b.sortObjects)}ka(T,z,0,b.sortObjects),v.finish(),b.sortObjects===!0&&v.sort(Y,ie),ke=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,ke&&$e.addToRenderList(v,T),this.info.render.frame++,$===!0&&he.beginShadows();const K=m.state.shadowsArray;we.render(K,T,z),$===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=v.opaque,H=v.transmissive;if(m.setupLights(),z.isArrayCamera){const pe=z.cameras;if(H.length>0)for(let be=0,Te=pe.length;be<Te;be++){const Re=pe[be];os(Z,H,T,Re)}ke&&$e.render(T);for(let be=0,Te=pe.length;be<Te;be++){const Re=pe[be];Sr(v,T,Re,Re.viewport)}}else H.length>0&&os(Z,H,T,z),ke&&$e.render(T),Sr(v,T,z);E!==null&&(A.updateMultisampleRenderTarget(E),A.updateRenderTargetMipmap(E)),T.isScene===!0&&T.onAfterRender(b,T,z),ht.resetDefaultState(),C=-1,U=null,_.pop(),_.length>0?(m=_[_.length-1],$===!0&&he.setGlobalState(b.clippingPlanes,m.state.camera)):m=null,f.pop(),f.length>0?v=f[f.length-1]:v=null};function ka(T,z,K,Z){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ae.intersectsSprite(T)){Z&&fe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(me);const be=se.update(T),Te=T.material;Te.visible&&v.push(T,be,Te,K,fe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ae.intersectsObject(T))){const be=se.update(T),Te=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),fe.copy(T.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),fe.copy(be.boundingSphere.center)),fe.applyMatrix4(T.matrixWorld).applyMatrix4(me)),Array.isArray(Te)){const Re=be.groups;for(let Fe=0,Be=Re.length;Fe<Be;Fe++){const Le=Re[Fe],rt=Te[Le.materialIndex];rt&&rt.visible&&v.push(T,be,rt,K,fe.z,Le)}}else Te.visible&&v.push(T,be,Te,K,fe.z,null)}}const pe=T.children;for(let be=0,Te=pe.length;be<Te;be++)ka(pe[be],z,K,Z)}function Sr(T,z,K,Z){const H=T.opaque,pe=T.transmissive,be=T.transparent;m.setupLightsView(K),$===!0&&he.setGlobalState(b.clippingPlanes,K),Z&&De.viewport(y.copy(Z)),H.length>0&&Ii(H,z,K),pe.length>0&&Ii(pe,z,K),be.length>0&&Ii(be,z,K),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function os(T,z,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Z.id]===void 0&&(m.state.transmissionRenderTarget[Z.id]=new Ts(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?yr:Ei,minFilter:Ms,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));const pe=m.state.transmissionRenderTarget[Z.id],be=Z.viewport||y;pe.setSize(be.z,be.w);const Te=b.getRenderTarget();b.setRenderTarget(pe),b.getClearColor(O),G=b.getClearAlpha(),G<1&&b.setClearColor(16777215,.5),b.clear(),ke&&$e.render(K);const Re=b.toneMapping;b.toneMapping=Ki;const Fe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),m.setupLightsView(Z),$===!0&&he.setGlobalState(b.clippingPlanes,Z),Ii(T,K,Z),A.updateMultisampleRenderTarget(pe),A.updateRenderTargetMipmap(pe),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let Le=0,rt=z.length;Le<rt;Le++){const mt=z[Le],gt=mt.object,cn=mt.geometry,st=mt.material,Ie=mt.group;if(st.side===nn&&gt.layers.test(Z.layers)){const Ut=st.side;st.side=sn,st.needsUpdate=!0,Na(gt,K,Z,cn,st,Ie),st.side=Ut,st.needsUpdate=!0,Be=!0}}Be===!0&&(A.updateMultisampleRenderTarget(pe),A.updateRenderTargetMipmap(pe))}b.setRenderTarget(Te),b.setClearColor(O,G),Fe!==void 0&&(Z.viewport=Fe),b.toneMapping=Re}function Ii(T,z,K){const Z=z.isScene===!0?z.overrideMaterial:null;for(let H=0,pe=T.length;H<pe;H++){const be=T[H],Te=be.object,Re=be.geometry,Fe=Z===null?be.material:Z,Be=be.group;Te.layers.test(K.layers)&&Na(Te,z,K,Re,Fe,Be)}}function Na(T,z,K,Z,H,pe){T.onBeforeRender(b,z,K,Z,H,pe),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),H.onBeforeRender(b,z,K,Z,T,pe),H.transparent===!0&&H.side===nn&&H.forceSinglePass===!1?(H.side=sn,H.needsUpdate=!0,b.renderBufferDirect(K,z,Z,H,T,pe),H.side=ri,H.needsUpdate=!0,b.renderBufferDirect(K,z,Z,H,T,pe),H.side=nn):b.renderBufferDirect(K,z,Z,H,T,pe),T.onAfterRender(b,z,K,Z,H,pe)}function Di(T,z,K){z.isScene!==!0&&(z=Pe);const Z=ue.get(T),H=m.state.lights,pe=m.state.shadowsArray,be=H.state.version,Te=Ae.getParameters(T,H.state,pe,z,K),Re=Ae.getProgramCacheKey(Te);let Fe=Z.programs;Z.environment=T.isMeshStandardMaterial?z.environment:null,Z.fog=z.fog,Z.envMap=(T.isMeshStandardMaterial?j:S).get(T.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,Fe===void 0&&(T.addEventListener("dispose",et),Fe=new Map,Z.programs=Fe);let Be=Fe.get(Re);if(Be!==void 0){if(Z.currentProgram===Be&&Z.lightsStateVersion===be)return Gs(T,Te),Be}else Te.uniforms=Ae.getUniforms(T),T.onBeforeCompile(Te,b),Be=Ae.acquireProgram(Te,Re),Fe.set(Re,Be),Z.uniforms=Te.uniforms;const Le=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Le.clippingPlanes=he.uniform),Gs(T,Te),Z.needsLights=Ua(T),Z.lightsStateVersion=be,Z.needsLights&&(Le.ambientLightColor.value=H.state.ambient,Le.lightProbe.value=H.state.probe,Le.directionalLights.value=H.state.directional,Le.directionalLightShadows.value=H.state.directionalShadow,Le.spotLights.value=H.state.spot,Le.spotLightShadows.value=H.state.spotShadow,Le.rectAreaLights.value=H.state.rectArea,Le.ltc_1.value=H.state.rectAreaLTC1,Le.ltc_2.value=H.state.rectAreaLTC2,Le.pointLights.value=H.state.point,Le.pointLightShadows.value=H.state.pointShadow,Le.hemisphereLights.value=H.state.hemi,Le.directionalShadowMap.value=H.state.directionalShadowMap,Le.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Le.spotShadowMap.value=H.state.spotShadowMap,Le.spotLightMatrix.value=H.state.spotLightMatrix,Le.spotLightMap.value=H.state.spotLightMap,Le.pointShadowMap.value=H.state.pointShadowMap,Le.pointShadowMatrix.value=H.state.pointShadowMatrix),Z.currentProgram=Be,Z.uniformsList=null,Be}function Oa(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=go.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function Gs(T,z){const K=ue.get(T);K.outputColorSpace=z.outputColorSpace,K.batching=z.batching,K.batchingColor=z.batchingColor,K.instancing=z.instancing,K.instancingColor=z.instancingColor,K.instancingMorph=z.instancingMorph,K.skinning=z.skinning,K.morphTargets=z.morphTargets,K.morphNormals=z.morphNormals,K.morphColors=z.morphColors,K.morphTargetsCount=z.morphTargetsCount,K.numClippingPlanes=z.numClippingPlanes,K.numIntersection=z.numClipIntersection,K.vertexAlphas=z.vertexAlphas,K.vertexTangents=z.vertexTangents,K.toneMapping=z.toneMapping}function Qo(T,z,K,Z,H){z.isScene!==!0&&(z=Pe),A.resetTextureUnits();const pe=z.fog,be=Z.isMeshStandardMaterial?z.environment:null,Te=E===null?b.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:is,Re=(Z.isMeshStandardMaterial?j:S).get(Z.envMap||be),Fe=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Be=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Le=!!K.morphAttributes.position,rt=!!K.morphAttributes.normal,mt=!!K.morphAttributes.color;let gt=Ki;Z.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(gt=b.toneMapping);const cn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,st=cn!==void 0?cn.length:0,Ie=ue.get(Z),Ut=m.state.lights;if($===!0&&(Q===!0||T!==U)){const dn=T===U&&Z.id===C;he.setState(Z,T,dn)}let tt=!1;Z.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==Ut.state.version||Ie.outputColorSpace!==Te||H.isBatchedMesh&&Ie.batching===!1||!H.isBatchedMesh&&Ie.batching===!0||H.isBatchedMesh&&Ie.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ie.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ie.instancing===!1||!H.isInstancedMesh&&Ie.instancing===!0||H.isSkinnedMesh&&Ie.skinning===!1||!H.isSkinnedMesh&&Ie.skinning===!0||H.isInstancedMesh&&Ie.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ie.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ie.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ie.instancingMorph===!1&&H.morphTexture!==null||Ie.envMap!==Re||Z.fog===!0&&Ie.fog!==pe||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==he.numPlanes||Ie.numIntersection!==he.numIntersection)||Ie.vertexAlphas!==Fe||Ie.vertexTangents!==Be||Ie.morphTargets!==Le||Ie.morphNormals!==rt||Ie.morphColors!==mt||Ie.toneMapping!==gt||Ie.morphTargetsCount!==st)&&(tt=!0):(tt=!0,Ie.__version=Z.version);let qt=Ie.currentProgram;tt===!0&&(qt=Di(Z,z,H));let ki=!1,ln=!1,Fa=!1;const _t=qt.getUniforms(),zn=Ie.uniforms;if(De.useProgram(qt.program)&&(ki=!0,ln=!0,Fa=!0),Z.id!==C&&(C=Z.id,ln=!0),ki||U!==T){Xe.reverseDepthBuffer?(de.copy(T.projectionMatrix),dm(de),hm(de),_t.setValue(k,"projectionMatrix",de)):_t.setValue(k,"projectionMatrix",T.projectionMatrix),_t.setValue(k,"viewMatrix",T.matrixWorldInverse);const dn=_t.map.cameraPosition;dn!==void 0&&dn.setValue(k,ce.setFromMatrixPosition(T.matrixWorld)),Xe.logarithmicDepthBuffer&&_t.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&_t.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),U!==T&&(U=T,ln=!0,Fa=!0)}if(H.isSkinnedMesh){_t.setOptional(k,H,"bindMatrix"),_t.setOptional(k,H,"bindMatrixInverse");const dn=H.skeleton;dn&&(dn.boneTexture===null&&dn.computeBoneTexture(),_t.setValue(k,"boneTexture",dn.boneTexture,A))}H.isBatchedMesh&&(_t.setOptional(k,H,"batchingTexture"),_t.setValue(k,"batchingTexture",H._matricesTexture,A),_t.setOptional(k,H,"batchingIdTexture"),_t.setValue(k,"batchingIdTexture",H._indirectTexture,A),_t.setOptional(k,H,"batchingColorTexture"),H._colorsTexture!==null&&_t.setValue(k,"batchingColorTexture",H._colorsTexture,A));const Hs=K.morphAttributes;if((Hs.position!==void 0||Hs.normal!==void 0||Hs.color!==void 0)&&ze.update(H,K,qt),(ln||Ie.receiveShadow!==H.receiveShadow)&&(Ie.receiveShadow=H.receiveShadow,_t.setValue(k,"receiveShadow",H.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(zn.envMap.value=Re,zn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&z.environment!==null&&(zn.envMapIntensity.value=z.environmentIntensity),ln&&(_t.setValue(k,"toneMappingExposure",b.toneMappingExposure),Ie.needsLights&&wr(zn,Fa),pe&&Z.fog===!0&&ve.refreshFogUniforms(zn,pe),ve.refreshMaterialUniforms(zn,Z,W,R,m.state.transmissionRenderTarget[T.id]),go.upload(k,Oa(Ie),zn,A)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(go.upload(k,Oa(Ie),zn,A),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&_t.setValue(k,"center",H.center),_t.setValue(k,"modelViewMatrix",H.modelViewMatrix),_t.setValue(k,"normalMatrix",H.normalMatrix),_t.setValue(k,"modelMatrix",H.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const dn=Z.uniformsGroups;for(let Vs=0,Er=dn.length;Vs<Er;Vs++){const Ba=dn[Vs];B.update(Ba,qt),B.bind(Ba,qt)}}return qt}function wr(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function Ua(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(T,z,K){ue.get(T.texture).__webglTexture=z,ue.get(T.depthTexture).__webglTexture=K;const Z=ue.get(T);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=K===void 0,Z.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,z){const K=ue.get(T);K.__webglFramebuffer=z,K.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,K=0){E=T,I=z,w=K;let Z=!0,H=null,pe=!1,be=!1;if(T){const Re=ue.get(T);if(Re.__useDefaultFramebuffer!==void 0)De.bindFramebuffer(k.FRAMEBUFFER,null),Z=!1;else if(Re.__webglFramebuffer===void 0)A.setupRenderTarget(T);else if(Re.__hasExternalTextures)A.rebindTextures(T,ue.get(T.texture).__webglTexture,ue.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Le=T.depthTexture;if(Re.__boundDepthTexture!==Le){if(Le!==null&&ue.has(Le)&&(T.width!==Le.image.width||T.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(T)}}const Fe=T.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(be=!0);const Be=ue.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Be[z])?H=Be[z][K]:H=Be[z],pe=!0):T.samples>0&&A.useMultisampledRTT(T)===!1?H=ue.get(T).__webglMultisampledFramebuffer:Array.isArray(Be)?H=Be[K]:H=Be,y.copy(T.viewport),x.copy(T.scissor),N=T.scissorTest}else y.copy(D).multiplyScalar(W).floor(),x.copy(P).multiplyScalar(W).floor(),N=te;if(De.bindFramebuffer(k.FRAMEBUFFER,H)&&Z&&De.drawBuffers(T,H),De.viewport(y),De.scissor(x),De.setScissorTest(N),pe){const Re=ue.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+z,Re.__webglTexture,K)}else if(be){const Re=ue.get(T.texture),Fe=z||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Re.__webglTexture,K||0,Fe)}C=-1},this.readRenderTargetPixels=function(T,z,K,Z,H,pe,be){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=ue.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te){De.bindFramebuffer(k.FRAMEBUFFER,Te);try{const Re=T.texture,Fe=Re.format,Be=Re.type;if(!Xe.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-Z&&K>=0&&K<=T.height-H&&k.readPixels(z,K,Z,H,He.convert(Fe),He.convert(Be),pe)}finally{const Re=E!==null?ue.get(E).__webglFramebuffer:null;De.bindFramebuffer(k.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(T,z,K,Z,H,pe,be){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=ue.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te){const Re=T.texture,Fe=Re.format,Be=Re.type;if(!Xe.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=T.width-Z&&K>=0&&K<=T.height-H){De.bindFramebuffer(k.FRAMEBUFFER,Te);const Le=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Le),k.bufferData(k.PIXEL_PACK_BUFFER,pe.byteLength,k.STREAM_READ),k.readPixels(z,K,Z,H,He.convert(Fe),He.convert(Be),0);const rt=E!==null?ue.get(E).__webglFramebuffer:null;De.bindFramebuffer(k.FRAMEBUFFER,rt);const mt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await lm(k,mt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Le),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,pe),k.deleteBuffer(Le),k.deleteSync(mt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,z=null,K=0){T.isTexture!==!0&&(mo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,T=arguments[1]);const Z=Math.pow(2,-K),H=Math.floor(T.image.width*Z),pe=Math.floor(T.image.height*Z),be=z!==null?z.x:0,Te=z!==null?z.y:0;A.setTexture2D(T,0),k.copyTexSubImage2D(k.TEXTURE_2D,K,0,0,be,Te,H,pe),De.unbindTexture()},this.copyTextureToTexture=function(T,z,K=null,Z=null,H=0){T.isTexture!==!0&&(mo("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,T=arguments[1],z=arguments[2],H=arguments[3]||0,K=null);let pe,be,Te,Re,Fe,Be;K!==null?(pe=K.max.x-K.min.x,be=K.max.y-K.min.y,Te=K.min.x,Re=K.min.y):(pe=T.image.width,be=T.image.height,Te=0,Re=0),Z!==null?(Fe=Z.x,Be=Z.y):(Fe=0,Be=0);const Le=He.convert(z.format),rt=He.convert(z.type);A.setTexture2D(z,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,z.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,z.unpackAlignment);const mt=k.getParameter(k.UNPACK_ROW_LENGTH),gt=k.getParameter(k.UNPACK_IMAGE_HEIGHT),cn=k.getParameter(k.UNPACK_SKIP_PIXELS),st=k.getParameter(k.UNPACK_SKIP_ROWS),Ie=k.getParameter(k.UNPACK_SKIP_IMAGES),Ut=T.isCompressedTexture?T.mipmaps[H]:T.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,Ut.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ut.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Te),k.pixelStorei(k.UNPACK_SKIP_ROWS,Re),T.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,H,Fe,Be,pe,be,Le,rt,Ut.data):T.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,H,Fe,Be,Ut.width,Ut.height,Le,Ut.data):k.texSubImage2D(k.TEXTURE_2D,H,Fe,Be,pe,be,Le,rt,Ut),k.pixelStorei(k.UNPACK_ROW_LENGTH,mt),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,gt),k.pixelStorei(k.UNPACK_SKIP_PIXELS,cn),k.pixelStorei(k.UNPACK_SKIP_ROWS,st),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Ie),H===0&&z.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),De.unbindTexture()},this.copyTextureToTexture3D=function(T,z,K=null,Z=null,H=0){T.isTexture!==!0&&(mo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,Z=arguments[1]||null,T=arguments[2],z=arguments[3],H=arguments[4]||0);let pe,be,Te,Re,Fe,Be,Le,rt,mt;const gt=T.isCompressedTexture?T.mipmaps[H]:T.image;K!==null?(pe=K.max.x-K.min.x,be=K.max.y-K.min.y,Te=K.max.z-K.min.z,Re=K.min.x,Fe=K.min.y,Be=K.min.z):(pe=gt.width,be=gt.height,Te=gt.depth,Re=0,Fe=0,Be=0),Z!==null?(Le=Z.x,rt=Z.y,mt=Z.z):(Le=0,rt=0,mt=0);const cn=He.convert(z.format),st=He.convert(z.type);let Ie;if(z.isData3DTexture)A.setTexture3D(z,0),Ie=k.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)A.setTexture2DArray(z,0),Ie=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,z.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,z.unpackAlignment);const Ut=k.getParameter(k.UNPACK_ROW_LENGTH),tt=k.getParameter(k.UNPACK_IMAGE_HEIGHT),qt=k.getParameter(k.UNPACK_SKIP_PIXELS),ki=k.getParameter(k.UNPACK_SKIP_ROWS),ln=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,gt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,gt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Re),k.pixelStorei(k.UNPACK_SKIP_ROWS,Fe),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Be),T.isDataTexture||T.isData3DTexture?k.texSubImage3D(Ie,H,Le,rt,mt,pe,be,Te,cn,st,gt.data):z.isCompressedArrayTexture?k.compressedTexSubImage3D(Ie,H,Le,rt,mt,pe,be,Te,cn,gt.data):k.texSubImage3D(Ie,H,Le,rt,mt,pe,be,Te,cn,st,gt),k.pixelStorei(k.UNPACK_ROW_LENGTH,Ut),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,tt),k.pixelStorei(k.UNPACK_SKIP_PIXELS,qt),k.pixelStorei(k.UNPACK_SKIP_ROWS,ki),k.pixelStorei(k.UNPACK_SKIP_IMAGES,ln),H===0&&z.generateMipmaps&&k.generateMipmap(Ie),De.unbindTexture()},this.initRenderTarget=function(T){ue.get(T).__webglFramebuffer===void 0&&A.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?A.setTextureCube(T,0):T.isData3DTexture?A.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?A.setTexture2DArray(T,0):A.setTexture2D(T,0),De.unbindTexture()},this.resetState=function(){I=0,w=0,E=null,De.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===rd?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===Go?"display-p3":"srgb"}}class Ia{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ue(e),this.density=t}clone(){return new Ia(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Vo extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Mb{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pl,this.updateRanges=[],this.version=0,this.uuid=Ji()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,a=this.stride;s<a;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ji()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ji()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const hn=new L;class Po{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ti(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),a=ut(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return new Wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Po(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class wa extends ss{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ra;const Xa=new L,oa=new L,ca=new L,la=new Me,qa=new Me,lp=new lt,qr=new L,ja=new L,jr=new L,Rh=new Me,Lc=new Me,Ph=new Me;class pr extends Tt{constructor(e=new wa){if(super(),this.isSprite=!0,this.type="Sprite",ra===void 0){ra=new Ct;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Mb(t,5);ra.setIndex([0,1,2,0,2,3]),ra.setAttribute("position",new Po(n,3,0,!1)),ra.setAttribute("uv",new Po(n,2,3,!1))}this.geometry=ra,this.material=e,this.center=new Me(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),oa.setFromMatrixScale(this.matrixWorld),lp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ca.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&oa.multiplyScalar(-ca.z);const n=this.material.rotation;let s,a;n!==0&&(a=Math.cos(n),s=Math.sin(n));const r=this.center;Yr(qr.set(-.5,-.5,0),ca,r,oa,s,a),Yr(ja.set(.5,-.5,0),ca,r,oa,s,a),Yr(jr.set(.5,.5,0),ca,r,oa,s,a),Rh.set(0,0),Lc.set(1,0),Ph.set(1,1);let o=e.ray.intersectTriangle(qr,ja,jr,!1,Xa);if(o===null&&(Yr(ja.set(-.5,.5,0),ca,r,oa,s,a),Lc.set(0,1),o=e.ray.intersectTriangle(qr,jr,ja,!1,Xa),o===null))return;const c=e.ray.origin.distanceTo(Xa);c<e.near||c>e.far||t.push({distance:c,point:Xa.clone(),uv:An.getInterpolation(Xa,qr,ja,jr,Rh,Lc,Ph,new Me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Yr(i,e,t,n,s,a){la.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(qa.x=a*la.x-s*la.y,qa.y=s*la.x+a*la.y):qa.copy(la),i.copy(e),i.x+=qa.x,i.y+=qa.y,i.applyMatrix4(lp)}class Sb extends an{constructor(e=null,t=1,n=1,s,a,r,o,c,l=bn,h=bn,d,u){super(null,r,o,c,l,h,s,a,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lh extends Wt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const da=new lt,Ih=new lt,Kr=[],Dh=new Us,wb=new lt,Ya=new q,Ka=new Fs;class kh extends q{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Lh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,wb)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Us),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,da),Dh.copy(e.boundingBox).applyMatrix4(da),this.boundingBox.union(Dh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,da),Ka.copy(e.boundingSphere).applyMatrix4(da),this.boundingSphere.union(Ka)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,a=n.length+1,r=e*a+1;for(let o=0;o<n.length;o++)n[o]=s[r+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Ya.geometry=this.geometry,Ya.material=this.material,Ya.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ka.copy(this.boundingSphere),Ka.applyMatrix4(n),e.ray.intersectsSphere(Ka)!==!1))for(let a=0;a<s;a++){this.getMatrixAt(a,da),Ih.multiplyMatrices(n,da),Ya.matrixWorld=Ih,Ya.raycast(e,Kr);for(let r=0,o=Kr.length;r<o;r++){const c=Kr[r];c.instanceId=a,c.object=this,t.push(c)}Kr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Lh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Sb(new Float32Array(s*this.count),s,this.count,nd,ii));const a=this.morphTexture.source.data.data;let r=0;for(let l=0;l<n.length;l++)r+=n[l];const o=this.geometry.morphTargetsRelative?1:1-r,c=s*e;a[c]=o,a.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class dp extends ss{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Lo=new L,Io=new L,Nh=new lt,Ja=new od,Jr=new Fs,Ic=new L,Oh=new L;class Eb extends Tt{constructor(e=new Ct,t=new dp){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,a=t.count;s<a;s++)Lo.fromBufferAttribute(t,s-1),Io.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Lo.distanceTo(Io);e.setAttribute("lineDistance",new ft(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(s),Jr.radius+=a,e.ray.intersectsSphere(Jr)===!1)return;Nh.copy(s).invert(),Ja.copy(e.ray).applyMatrix4(Nh);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=l){const f=h.getX(v),_=h.getX(v+1),b=Zr(this,e,Ja,c,f,_);b&&t.push(b)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(p),f=Zr(this,e,Ja,c,v,m);f&&t.push(f)}}else{const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=l){const f=Zr(this,e,Ja,c,v,v+1);f&&t.push(f)}if(this.isLineLoop){const v=Zr(this,e,Ja,c,g-1,p);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Zr(i,e,t,n,s,a){const r=i.geometry.attributes.position;if(Lo.fromBufferAttribute(r,s),Io.fromBufferAttribute(r,a),t.distanceSqToSegment(Lo,Io,Ic,Oh)>n)return;Ic.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ic);if(!(c<e.near||c>e.far))return{distance:c,point:Oh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Uh=new L,Fh=new L;class Tb extends Eb{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,a=t.count;s<a;s+=2)Uh.fromBufferAttribute(t,s),Fh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Uh.distanceTo(Fh);e.setAttribute("lineDistance",new ft(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ea extends ss{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bh=new lt,Il=new od,Qr=new Fs,eo=new L;class fr extends Tt{constructor(e=new Ct,t=new Ea){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,a=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(s),Qr.radius+=a,e.ray.intersectsSphere(Qr)===!1)return;Bh.copy(s).invert(),Il.copy(e.ray).applyMatrix4(Bh);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,r.start),p=Math.min(l.count,r.start+r.count);for(let g=u,v=p;g<v;g++){const m=l.getX(g);eo.fromBufferAttribute(d,m),$h(eo,m,c,s,e,t,this)}}else{const u=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let g=u,v=p;g<v;g++)eo.fromBufferAttribute(d,g),$h(eo,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function $h(i,e,t,n,s,a,r){const o=Il.distanceSqToPoint(i);if(o<t){const c=new L;Il.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;a.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class hp extends an{constructor(e,t,n,s,a,r,o,c,l){super(e,t,n,s,a,r,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class li{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),a=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),a+=n.distanceTo(s),t.push(a),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const a=n.length;let r;t?r=t:r=e*n[a-1];let o=0,c=a-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-r,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===r)return s/(a-1);const h=n[s],u=n[s+1]-h,p=(r-h)/u;return(s+p)/(a-1)}getTangent(e,t){let s=e-1e-4,a=e+1e-4;s<0&&(s=0),a>1&&(a=1);const r=this.getPoint(s),o=this.getPoint(a),c=t||(r.isVector2?new Me:new L);return c.copy(o).sub(r).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new L,s=[],a=[],r=[],o=new L,c=new lt;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new L)}a[0]=new L,r[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),a[0].crossVectors(s[0],o),r[0].crossVectors(s[0],a[0]);for(let p=1;p<=e;p++){if(a[p]=a[p-1].clone(),r[p]=r[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Jt(s[p-1].dot(s[p]),-1,1));a[p].applyMatrix4(c.makeRotationAxis(o,g))}r[p].crossVectors(s[p],a[p])}if(t===!0){let p=Math.acos(Jt(a[0].dot(a[e]),-1,1));p/=e,s[0].dot(o.crossVectors(a[0],a[e]))>0&&(p=-p);for(let g=1;g<=e;g++)a[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),r[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class dd extends li{constructor(e=0,t=0,n=1,s=1,a=0,r=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new Me){const n=t,s=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(r?a=0:a=s),this.aClockwise===!0&&!r&&(a===s?a=-s:a=a-s);const o=this.aStartAngle+e*a;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,p=l-this.aY;c=u*h-p*d+this.aX,l=u*d+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Cb extends dd{constructor(e,t,n,s,a,r){super(e,t,n,n,s,a,r),this.isArcCurve=!0,this.type="ArcCurve"}}function hd(){let i=0,e=0,t=0,n=0;function s(a,r,o,c){i=a,e=o,t=-3*a+3*r-2*o-c,n=2*a-2*r+o+c}return{initCatmullRom:function(a,r,o,c,l){s(r,o,l*(o-a),l*(c-r))},initNonuniformCatmullRom:function(a,r,o,c,l,h,d){let u=(r-a)/l-(o-a)/(l+h)+(o-r)/h,p=(o-r)/h-(c-r)/(h+d)+(c-o)/d;u*=h,p*=h,s(r,o,u,p)},calc:function(a){const r=a*a,o=r*a;return i+e*a+t*r+n*o}}}const to=new L,Dc=new hd,kc=new hd,Nc=new hd;class Ab extends li{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){const n=t,s=this.points,a=s.length,r=(a-(this.closed?0:1))*e;let o=Math.floor(r),c=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:c===0&&o===a-1&&(o=a-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%a]:(to.subVectors(s[0],s[1]).add(s[0]),l=to);const d=s[o%a],u=s[(o+1)%a];if(this.closed||o+2<a?h=s[(o+2)%a]:(to.subVectors(s[a-1],s[a-2]).add(s[a-1]),h=to),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Dc.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,g,v,m),kc.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,g,v,m),Nc.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Dc.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),kc.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Nc.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Dc.calc(c),kc.calc(c),Nc.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function zh(i,e,t,n,s){const a=(n-e)*.5,r=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+a+r)*c+(-3*t+3*n-2*a-r)*o+a*i+t}function Rb(i,e){const t=1-i;return t*t*e}function Pb(i,e){return 2*(1-i)*i*e}function Lb(i,e){return i*i*e}function ir(i,e,t,n){return Rb(i,e)+Pb(i,t)+Lb(i,n)}function Ib(i,e){const t=1-i;return t*t*t*e}function Db(i,e){const t=1-i;return 3*t*t*i*e}function kb(i,e){return 3*(1-i)*i*i*e}function Nb(i,e){return i*i*i*e}function sr(i,e,t,n,s){return Ib(i,e)+Db(i,t)+kb(i,n)+Nb(i,s)}class up extends li{constructor(e=new Me,t=new Me,n=new Me,s=new Me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Me){const n=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return n.set(sr(e,s.x,a.x,r.x,o.x),sr(e,s.y,a.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ob extends li{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){const n=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return n.set(sr(e,s.x,a.x,r.x,o.x),sr(e,s.y,a.y,r.y,o.y),sr(e,s.z,a.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class pp extends li{constructor(e=new Me,t=new Me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Me){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ub extends li{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fp extends li{constructor(e=new Me,t=new Me,n=new Me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Me){const n=t,s=this.v0,a=this.v1,r=this.v2;return n.set(ir(e,s.x,a.x,r.x),ir(e,s.y,a.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fb extends li{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,s=this.v0,a=this.v1,r=this.v2;return n.set(ir(e,s.x,a.x,r.x),ir(e,s.y,a.y,r.y),ir(e,s.z,a.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mp extends li{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Me){const n=t,s=this.points,a=(s.length-1)*e,r=Math.floor(a),o=a-r,c=s[r===0?r:r-1],l=s[r],h=s[r>s.length-2?s.length-1:r+1],d=s[r>s.length-3?s.length-1:r+2];return n.set(zh(o,c.x,l.x,h.x,d.x),zh(o,c.y,l.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new Me().fromArray(s))}return this}}var Gh=Object.freeze({__proto__:null,ArcCurve:Cb,CatmullRomCurve3:Ab,CubicBezierCurve:up,CubicBezierCurve3:Ob,EllipseCurve:dd,LineCurve:pp,LineCurve3:Ub,QuadraticBezierCurve:fp,QuadraticBezierCurve3:Fb,SplineCurve:mp});class Bb extends li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Gh[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let a=0;for(;a<s.length;){if(s[a]>=n){const r=s[a]-n,o=this.curves[a],c=o.getLength(),l=c===0?0:1-r/c;return o.getPointAt(l,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,a=this.curves;s<a.length;s++){const r=a[s],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,c=r.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Gh[s.type]().fromJSON(s))}return this}}class $b extends Bb{constructor(e){super(),this.type="Path",this.currentPoint=new Me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new pp(this.currentPoint.clone(),new Me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const a=new fp(this.currentPoint.clone(),new Me(e,t),new Me(n,s));return this.curves.push(a),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,a,r){const o=new up(this.currentPoint.clone(),new Me(e,t),new Me(n,s),new Me(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new mp(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,a,r){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,a,r),this}absarc(e,t,n,s,a,r){return this.absellipse(e,t,n,n,s,a,r),this}ellipse(e,t,n,s,a,r,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,a,r,o,c),this}absellipse(e,t,n,s,a,r,o,c){const l=new dd(e,t,n,s,a,r,o,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ud extends Ct{constructor(e=[new Me(0,-.5),new Me(.5,0),new Me(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Jt(s,0,Math.PI*2);const a=[],r=[],o=[],c=[],l=[],h=1/t,d=new L,u=new Me,p=new L,g=new L,v=new L;let m=0,f=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,f=e[_+1].y-e[_].y,p.x=f*1,p.y=-m,p.z=f*0,v.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:m=e[_+1].x-e[_].x,f=e[_+1].y-e[_].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),c.push(p.x,p.y,p.z),v.copy(g)}for(let _=0;_<=t;_++){const b=n+_*h*s,M=Math.sin(b),I=Math.cos(b);for(let w=0;w<=e.length-1;w++){d.x=e[w].x*M,d.y=e[w].y,d.z=e[w].x*I,r.push(d.x,d.y,d.z),u.x=_/t,u.y=w/(e.length-1),o.push(u.x,u.y);const E=c[3*w+0]*M,C=c[3*w+1],U=c[3*w+0]*I;l.push(E,C,U)}}for(let _=0;_<t;_++)for(let b=0;b<e.length-1;b++){const M=b+_*e.length,I=M,w=M+e.length,E=M+e.length+1,C=M+1;a.push(I,w,C),a.push(E,C,w)}this.setIndex(a),this.setAttribute("position",new ft(r,3)),this.setAttribute("uv",new ft(o,2)),this.setAttribute("normal",new ft(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ud(e.points,e.segments,e.phiStart,e.phiLength)}}class Wo extends ud{constructor(e=1,t=1,n=4,s=8){const a=new $b;a.absarc(0,-t/2,e,Math.PI*1.5,0),a.absarc(0,t/2,e,0,Math.PI*.5),super(a.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new Wo(e.radius,e.length,e.capSegments,e.radialSegments)}}class ts extends Ct{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const a=[],r=[],o=[],c=[],l=new L,h=new Me;r.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const p=n+d/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),r.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(r[u]/e+1)/2,h.y=(r[u+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new ft(r,3)),this.setAttribute("normal",new ft(o,3)),this.setAttribute("uv",new ft(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ts(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ln extends Ct{constructor(e=1,t=1,n=1,s=32,a=1,r=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),a=Math.floor(a);const h=[],d=[],u=[],p=[];let g=0;const v=[],m=n/2;let f=0;_(),r===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ft(d,3)),this.setAttribute("normal",new ft(u,3)),this.setAttribute("uv",new ft(p,2));function _(){const M=new L,I=new L;let w=0;const E=(t-e)/n;for(let C=0;C<=a;C++){const U=[],y=C/a,x=y*(t-e)+e;for(let N=0;N<=s;N++){const O=N/s,G=O*c+o,F=Math.sin(G),R=Math.cos(G);I.x=x*F,I.y=-y*n+m,I.z=x*R,d.push(I.x,I.y,I.z),M.set(F,E,R).normalize(),u.push(M.x,M.y,M.z),p.push(O,1-y),U.push(g++)}v.push(U)}for(let C=0;C<s;C++)for(let U=0;U<a;U++){const y=v[U][C],x=v[U+1][C],N=v[U+1][C+1],O=v[U][C+1];e>0&&(h.push(y,x,O),w+=3),t>0&&(h.push(x,N,O),w+=3)}l.addGroup(f,w,0),f+=w}function b(M){const I=g,w=new Me,E=new L;let C=0;const U=M===!0?e:t,y=M===!0?1:-1;for(let N=1;N<=s;N++)d.push(0,m*y,0),u.push(0,y,0),p.push(.5,.5),g++;const x=g;for(let N=0;N<=s;N++){const G=N/s*c+o,F=Math.cos(G),R=Math.sin(G);E.x=U*R,E.y=m*y,E.z=U*F,d.push(E.x,E.y,E.z),u.push(0,y,0),w.x=F*.5+.5,w.y=R*.5*y+.5,p.push(w.x,w.y),g++}for(let N=0;N<s;N++){const O=I+N,G=x+N;M===!0?h.push(G,G+1,O):h.push(G+1,G,O),C+=3}l.addGroup(f,C,M===!0?1:2),f+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cs extends Ln{constructor(e=1,t=1,n=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,e,t,n,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Cs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const no=new L,io=new L,Oc=new L,so=new An;class zb extends Ct{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),a=Math.cos(fo*t),r=e.getIndex(),o=e.getAttribute("position"),c=r?r.count:o.count,l=[0,0,0],h=["a","b","c"],d=new Array(3),u={},p=[];for(let g=0;g<c;g+=3){r?(l[0]=r.getX(g),l[1]=r.getX(g+1),l[2]=r.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:v,b:m,c:f}=so;if(v.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),f.fromBufferAttribute(o,l[2]),so.getNormal(Oc),d[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let _=0;_<3;_++){const b=(_+1)%3,M=d[_],I=d[b],w=so[h[_]],E=so[h[b]],C=`${M}_${I}`,U=`${I}_${M}`;U in u&&u[U]?(Oc.dot(u[U].normal)<=a&&(p.push(w.x,w.y,w.z),p.push(E.x,E.y,E.z)),u[U]=null):C in u||(u[C]={index0:l[_],index1:l[b],normal:Oc.clone()})}}for(const g in u)if(u[g]){const{index0:v,index1:m}=u[g];no.fromBufferAttribute(o,v),io.fromBufferAttribute(o,m),p.push(no.x,no.y,no.z),p.push(io.x,io.y,io.z)}this.setAttribute("position",new ft(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Xo extends Ct{constructor(e=.5,t=1,n=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:a,thetaLength:r},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let d=e;const u=(t-e)/s,p=new L,g=new Me;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const f=a+m/n*r;p.x=d*Math.cos(f),p.y=d*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}d+=u}for(let v=0;v<s;v++){const m=v*(n+1);for(let f=0;f<n;f++){const _=f+m,b=_,M=_+n+1,I=_+n+2,w=_+1;o.push(b,M,w),o.push(M,I,w)}}this.setIndex(o),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(l,3)),this.setAttribute("uv",new ft(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ti extends Ct{constructor(e=1,t=32,n=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(r+o,Math.PI);let l=0;const h=[],d=new L,u=new L,p=[],g=[],v=[],m=[];for(let f=0;f<=n;f++){const _=[],b=f/n;let M=0;f===0&&r===0?M=.5/t:f===n&&c===Math.PI&&(M=-.5/t);for(let I=0;I<=t;I++){const w=I/t;d.x=-e*Math.cos(s+w*a)*Math.sin(r+b*o),d.y=e*Math.cos(r+b*o),d.z=e*Math.sin(s+w*a)*Math.sin(r+b*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(w+M,1-b),_.push(l++)}h.push(_)}for(let f=0;f<n;f++)for(let _=0;_<t;_++){const b=h[f][_+1],M=h[f][_],I=h[f+1][_],w=h[f+1][_+1];(f!==0||r>0)&&p.push(b,M,w),(f!==n-1||c<Math.PI)&&p.push(M,I,w)}this.setIndex(p),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(v,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Rn extends Ct{constructor(e=1,t=.4,n=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:a},n=Math.floor(n),s=Math.floor(s);const r=[],o=[],c=[],l=[],h=new L,d=new L,u=new L;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const v=g/s*a,m=p/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(v),d.y=(e+t*Math.cos(m))*Math.sin(v),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const v=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,_=(s+1)*p+g;r.push(v,m,_),r.push(m,f,_)}this.setIndex(r),this.setAttribute("position",new ft(o,3)),this.setAttribute("normal",new ft(c,3)),this.setAttribute("uv",new ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Dt extends ss{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vu,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qo extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class jo extends qo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Uc=new lt,Hh=new L,Vh=new L;class pd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cd,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Hh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hh),Vh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vh),t.updateMatrixWorld(),Uc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Uc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Gb extends pd{constructor(){super(new Zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ao*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,a=e.distance||t.far;(n!==t.fov||s!==t.aspect||a!==t.far)&&(t.fov=n,t.aspect=s,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Yo extends qo{constructor(e,t,n=0,s=Math.PI/3,a=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.distance=n,this.angle=s,this.penumbra=a,this.decay=r,this.map=null,this.shadow=new Gb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Wh=new lt,Za=new L,Fc=new L;class Hb extends pd{constructor(){super(new Zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Me(4,2),this._viewportCount=6,this._viewports=[new pt(2,1,1,1),new pt(0,1,1,1),new pt(3,1,1,1),new pt(1,1,1,1),new pt(3,0,1,1),new pt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,a=e.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),Za.setFromMatrixPosition(e.matrixWorld),n.position.copy(Za),Fc.copy(n.position),Fc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Fc),n.updateMatrixWorld(),s.makeTranslation(-Za.x,-Za.y,-Za.z),Wh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wh)}}class si extends qo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Hb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Vb extends pd{constructor(){super(new ip(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wb extends qo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new Vb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Xb{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Xh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Xh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Xh(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zl);class qb{constructor(){this.ctx=null,this.ready=!1,this.settings={sfx:.85,music:.4,crowd:.75},this.musicNodes=null,this.crowdGain=null,this.heat=.2,this.scene="menu"}init(){if(this.ready)return;const e=window.AudioContext||window.webkitAudioContext;if(e)try{this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=.9,this.master.connect(this.ctx.destination),this.sfx=this.ctx.createGain(),this.sfx.gain.value=this.settings.sfx,this.sfx.connect(this.master),this.music=this.ctx.createGain(),this.music.gain.value=this.settings.music*.5,this.music.connect(this.master),this.crowd=this.ctx.createGain(),this.crowd.gain.value=0,this.crowd.connect(this.master),this.ready=!0,this.buildCrowd(),this.buildMusic()}catch(t){console.warn("Audio init failed",t)}}unlock(){var e;this.init(),((e=this.ctx)==null?void 0:e.state)==="suspended"&&this.ctx.resume(),this.setScene(this.scene)}setSettings(e){this.settings={...this.settings,...e},this.ready&&(this.sfx.gain.value=this.settings.sfx,this.music.gain.value=this.settings.music*.5,this.crowdGain&&(this.crowdGain.gain.value=this.settings.crowd))}setScene(e){if(this.scene=e,!this.ready)return;const t=this.ctx.currentTime,n=e==="menu"||e==="gym"||e==="editor";this.music.gain.cancelScheduledValues(t),this.music.gain.linearRampToValueAtTime(this.settings.music*(n?.42:.28),t+.8),!n&&this.crowdGain?(this.crowdGain.gain.cancelScheduledValues(t),this.crowdGain.gain.linearRampToValueAtTime(this.settings.crowd*.7,t+1.5)):this.crowdGain&&(this.crowdGain.gain.cancelScheduledValues(t),this.crowdGain.gain.linearRampToValueAtTime(0,t+1))}buildCrowd(){const e=this.ctx,t=e.sampleRate*4,n=e.createBuffer(2,t,e.sampleRate);for(let r=0;r<2;r++){const o=n.getChannelData(r);let c=0;for(let l=0;l<t;l++){const h=Math.random()*2-1;c=c*.96+h*.04,o[l]=c*3.2}}const s=e.createBufferSource();s.buffer=n,s.loop=!0;const a=e.createBiquadFilter();a.type="bandpass",a.frequency.value=700,a.Q.value=.55,this.crowdGain=e.createGain(),this.crowdGain.gain.value=0,s.connect(a).connect(this.crowdGain).connect(this.crowd),s.start(),this.crowdSource=s,this.crowdFilter=a}buildMusic(){const e=this.ctx,n=60/92,s=8,a=n*4*s,r=e.sampleRate,o=e.createBuffer(2,Math.floor(a*r),r),c=o.getChannelData(0),l=o.getChannelData(1),h=f=>{const _=Math.floor(f*r);for(let b=0;b<r*.35;b++){const M=b/r,I=Math.exp(-M*18),w=42+90*Math.exp(-M*30),E=Math.sin(2*Math.PI*w*M)*I*.55;_+b<c.length&&(c[_+b]+=E,l[_+b]+=E)}},d=f=>{const _=Math.floor(f*r);for(let b=0;b<r*.18;b++){const M=b/r,I=Math.exp(-M*28),w=(Math.random()*2-1)*I*.22;_+b<c.length&&(c[_+b]+=w*.9,l[_+b]+=w*.7)}},u=f=>{const _=Math.floor(f*r);for(let b=0;b<r*.06;b++){const M=b/r,I=Math.exp(-M*90),w=(Math.random()*2-1)*I*.06;_+b<c.length&&(c[_+b]+=w,l[_+b]+=w*.6)}},p=[36.7,36.7,43.65,36.7,32.7,32.7,36.7,29.1];for(let f=0;f<s;f++){const _=f*n*4;for(let w=0;w<4;w++)h(_+w*n),(w===1||w===3)&&d(_+w*n),u(_+w*n+n/2),u(_+w*n+n*.75);const b=p[f%p.length],M=Math.floor(_*r),I=n*4;for(let w=0;w<I*r;w++){const E=w/r;if(M+w>=c.length)break;const C=Math.min(1,E*8)*Math.exp(-E*.9),U=(Math.sin(2*Math.PI*b*E)+Math.sin(2*Math.PI*b*2*E)*.2)*.07*C;c[M+w]+=U,l[M+w]+=U}}const g=e.createBufferSource();g.buffer=o,g.loop=!0;const v=e.createBiquadFilter();v.type="lowpass",v.frequency.value=1700;const m=e.createGain();m.gain.value=.9,g.connect(v).connect(m).connect(this.music),g.start(),this.musicSource=g}update(e){if(!this.ready||!this.crowdGain)return;const t=Number.isFinite(e)?Math.max(0,e):0,n=Number.isFinite(this.heat)?this.heat:0,s=this.scene==="fight"?(.25+n*.75)*this.settings.crowd*.8:0;this.crowdGain.gain.value+=(s-this.crowdGain.gain.value)*Math.min(1,t*.5),this.crowdFilter&&(this.crowdFilter.frequency.value=600+n*900)}setHeat(e){this.heat=e}noiseBurst({duration:e=.12,freq:t=1200,gain:n=.4,type:s="lowpass",sweep:a=0}={}){if(!this.ready||this.ctx.state!=="running")return;const r=this.ctx,o=Math.floor(r.sampleRate*e),c=r.createBuffer(1,o,r.sampleRate),l=c.getChannelData(0);for(let p=0;p<o;p++)l[p]=(Math.random()*2-1)*(1-p/o);const h=r.createBufferSource();h.buffer=c;const d=r.createBiquadFilter();d.type=s,d.frequency.value=t,a&&d.frequency.linearRampToValueAtTime(t+a,r.currentTime+e);const u=r.createGain();u.gain.value=n,u.gain.exponentialRampToValueAtTime(.001,r.currentTime+e),h.connect(d).connect(u).connect(this.sfx),h.start()}tone({freq:e=220,duration:t=.2,gain:n=.2,type:s="sine",slide:a=0}={}){if(!this.ready||this.ctx.state!=="running")return;const r=this.ctx,o=r.createOscillator();o.type=s,o.frequency.value=e,a&&o.frequency.linearRampToValueAtTime(e+a,r.currentTime+t);const c=r.createGain();c.gain.value=n,c.gain.exponentialRampToValueAtTime(.001,r.currentTime+t),o.connect(c).connect(this.sfx),o.start(),o.stop(r.currentTime+t+.02)}punch(e=1){this.noiseBurst({duration:.09,freq:800,gain:.28*e,sweep:-400}),this.tone({freq:90,duration:.12,gain:.16*e,slide:-40})}block(){this.noiseBurst({duration:.06,freq:2500,gain:.12,type:"highpass"}),this.tone({freq:420,duration:.08,gain:.06,type:"square"})}whoosh(){this.noiseBurst({duration:.18,freq:400,gain:.1,type:"bandpass",sweep:600})}bell(e=3){if(!(!this.ready||this.ctx.state!=="running"))for(let t=0;t<e;t++)setTimeout(()=>{this.tone({freq:880,duration:1.1,gain:.22,type:"sine",slide:0}),this.tone({freq:1320,duration:.9,gain:.1,type:"sine"}),this.tone({freq:440,duration:1.3,gain:.12,type:"triangle"})},t*240)}count(e){this.tone({freq:520,duration:.12,gain:.12,type:"square"})}ko(){this.tone({freq:70,duration:1.8,gain:.4,type:"sine",slide:-30}),this.noiseBurst({duration:.7,freq:300,gain:.3,sweep:-200}),this.crowdGain&&(this.crowdGain.gain.value+=.2)}cheer(){this.ready&&this.noiseBurst({duration:1.2,freq:900,gain:.14,type:"bandpass",sweep:400})}ui(){this.tone({freq:620,duration:.055,gain:.045,type:"triangle",slide:120})}coin(){this.tone({freq:880,duration:.12,gain:.08,type:"triangle"}),setTimeout(()=>this.tone({freq:1320,duration:.22,gain:.07,type:"triangle"}),70)}achievement(){[523,659,784,1046].forEach((e,t)=>setTimeout(()=>this.tone({freq:e,duration:.4,gain:.09,type:"triangle"}),t*110))}handleEvents(e){for(const t of e)switch(t.type){case"punch":this.whoosh();break;case"hit":this.punch(1+(t.damage||0)/18);break;case"critical":this.punch(1.6),this.cheer();break;case"block":this.block();break;case"whiff":this.whoosh();break;case"dodgeSuccess":this.whoosh();break;case"knockdown":this.punch(2),this.ko();break;case"ko":this.ko(),this.bell(1);break;case"bell":this.bell(3);break;case"count":this.count(t.count);break;case"guardBreak":this.tone({freq:140,duration:.3,gain:.2,type:"sawtooth",slide:-60});break;case"roundStart":this.bell(2);break;case"roundEnd":this.bell(3);break;case"result":this.cheer();break}}}const kt=new Map;function di(i=512,e=512){const t=document.createElement("canvas");return t.width=i,t.height=e,t}function hi(i,e,{repeat:t=null,srgb:n=!0}={}){const s=new hp(i);return n&&(s.colorSpace=Tn),s.anisotropy=4,t&&(s.wrapS=s.wrapT=So,s.repeat.set(t[0],t[1])),s.needsUpdate=!0,e&&kt.set(e,s),s}function Bc(i,e="solid",t=null){const n=t||`pat-${i.join("")}-${e}`;if(kt.has(n))return kt.get(n);const s=di(512,512),a=s.getContext("2d"),[r,o,c]=i;a.fillStyle=r,a.fillRect(0,0,512,512);const l=a.createLinearGradient(0,0,512,512);switch(l.addColorStop(0,"rgba(255,255,255,.16)"),l.addColorStop(.45,"rgba(255,255,255,0)"),l.addColorStop(1,"rgba(0,0,0,.32)"),a.fillStyle=l,a.fillRect(0,0,512,512),a.fillStyle=o,e){case"stripe":a.fillStyle=o,a.fillRect(40,0,44,512),a.fillRect(428,0,44,512),a.fillStyle=c,a.fillRect(94,0,12,512),a.fillRect(406,0,12,512);break;case"dual":a.fillStyle=o,a.fillRect(0,210,512,92),a.fillStyle=c,a.fillRect(0,226,512,10);break;case"gradient":{const d=a.createLinearGradient(0,0,0,512);d.addColorStop(0,r),d.addColorStop(1,o),a.fillStyle=d,a.fillRect(0,0,512,512),a.fillStyle=c,a.fillRect(0,470,512,16);break}case"checker":{a.fillStyle=o;for(let d=0;d<512;d+=64)for(let u=0;u<512;u+=64)(u/64+d/64)%2===0&&a.fillRect(u,d,64,64);break}case"stars":{a.fillStyle=c;for(let d=0;d<26;d++){const u=d*137%512,p=d*79%512,g=4+d%4*2;a.beginPath();for(let v=0;v<10;v++){const m=Math.PI/5*v-Math.PI/2,f=v%2===0?g*2.2:g;a.lineTo(u+Math.cos(m)*f,p+Math.sin(m)*f)}a.closePath(),a.fill()}a.fillStyle=o,a.fillRect(0,470,512,30);break}case"diagonal":{a.fillStyle=o;for(let d=-512;d<1024;d+=128)a.beginPath(),a.moveTo(d,0),a.lineTo(d+52,0),a.lineTo(d+564,512),a.lineTo(d+512,512),a.closePath(),a.fill();break}case"vsplit":{a.fillStyle=o,a.beginPath(),a.moveTo(0,0),a.lineTo(256,0),a.lineTo(256,512),a.lineTo(0,512),a.closePath(),a.fill(),a.fillStyle=c,a.fillRect(250,0,12,512);break}case"rings":{a.strokeStyle=o,a.lineWidth=26;for(let d=50;d<440;d+=80)a.beginPath(),a.arc(256,256,d,0,Math.PI*2),a.stroke();break}case"flame":{a.fillStyle=o;for(let d=0;d<9;d++){const u=d*60-20;a.beginPath(),a.moveTo(u,512),a.quadraticCurveTo(u+20,380,u+42,320),a.quadraticCurveTo(u+60,400,u+80,512),a.closePath(),a.fill()}a.fillStyle=c;for(let d=0;d<9;d++){const u=d*60+2;a.beginPath(),a.moveTo(u,512),a.quadraticCurveTo(u+12,430,u+32,400),a.quadraticCurveTo(u+40,450,u+50,512),a.closePath(),a.fill()}break}case"geo":{a.fillStyle=o;for(let d=0;d<7;d++)a.save(),a.translate(d%3*180+60,Math.floor(d/3)*180+80),a.rotate(d*.5),a.fillRect(-55,-55,110,110),a.restore();break}case"wave":{a.strokeStyle=o,a.lineWidth=34;for(let d=-40;d<560;d+=90){a.beginPath();for(let u=0;u<=512;u+=8)a.lineTo(u,d+Math.sin(u/55+d)*22);a.stroke()}break}case"solid":default:a.fillStyle=o,a.fillRect(0,460,512,22),a.fillStyle=c,a.fillRect(0,482,512,8)}const h=a.getImageData(0,0,512,512);for(let d=0;d<h.data.length;d+=4){const u=(Math.random()-.5)*14;h.data[d]=Math.max(0,Math.min(255,h.data[d]+u)),h.data[d+1]=Math.max(0,Math.min(255,h.data[d+1]+u)),h.data[d+2]=Math.max(0,Math.min(255,h.data[d+2]+u))}return a.putImageData(h,0,0),hi(s,n)}function jb(i={}){const e=`ring-${i.id||"default"}-${i.mat||""}`;if(kt.has(e))return kt.get(e);const t=di(1024,1024),n=t.getContext("2d"),s=i.mat||"#1a1a20";n.fillStyle=s,n.fillRect(0,0,1024,1024);const a=n.createRadialGradient(512,512,80,512,512,720);a.addColorStop(0,"rgba(255,255,255,.12)"),a.addColorStop(1,"rgba(0,0,0,.45)"),n.fillStyle=a,n.fillRect(0,0,1024,1024),n.save(),n.translate(512,512),n.globalAlpha=.32;const r=i.accent||"#f2c14e";n.strokeStyle=r,n.lineWidth=12,n.beginPath(),n.arc(0,0,250,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(0,0,205,0,Math.PI*2),n.stroke(),n.fillStyle=r,n.font="bold 120px Bebas Neue, Impact, sans-serif",n.textAlign="center",n.fillText("TG",0,15),n.font="bold 34px Barlow Condensed, sans-serif",n.fillText("BOXING",0,70),n.font="600 20px Barlow Condensed, sans-serif",n.fillText("THE GLORY OF CHAMPIONS",0,118),n.restore(),n.globalAlpha=.25,n.fillStyle="#f5f5f4",n.font="700 30px Barlow Condensed, sans-serif",n.textAlign="center",n.fillText("TG COIN  •  CHAMPIONS SERIES  •  TG BOXING NEWS",512,950),n.globalAlpha=.12;for(let o=0;o<80;o++)n.fillStyle=o%2?"#000":"#fff",n.fillRect(Math.random()*1024,Math.random()*1024,Math.random()*14+2,1.5);return n.globalAlpha=1,hi(t,e)}function Yb(i={}){const e=`apron-${i.id||"default"}`;if(kt.has(e))return kt.get(e);const t=di(1024,256),n=t.getContext("2d");n.fillStyle=i.accent2||"#111827",n.fillRect(0,0,1024,256);const s=n.createLinearGradient(0,0,0,256);return s.addColorStop(0,"rgba(255,255,255,.16)"),s.addColorStop(1,"rgba(0,0,0,.5)"),n.fillStyle=s,n.fillRect(0,0,1024,256),n.strokeStyle=i.accent||"#f2c14e",n.lineWidth=6,n.strokeRect(14,14,996,228),n.fillStyle="#f5f5f4",n.textAlign="center",n.font="bold 82px Bebas Neue, Impact, sans-serif",n.fillText("TG BOXING",512,132),n.font="600 28px Barlow Condensed, sans-serif",n.fillStyle=i.accent||"#f2c14e",n.fillText("THE GLORY OF CHAMPIONS",512,178),hi(t,e)}function gp(i,e="TG BOXING"){const t=`banner-${i.id}-${e}`;if(kt.has(t))return kt.get(t);const n=di(512,1024),s=n.getContext("2d"),a=s.createLinearGradient(0,0,0,1024);return a.addColorStop(0,i.accent2||"#111827"),a.addColorStop(1,"#07070a"),s.fillStyle=a,s.fillRect(0,0,512,1024),s.strokeStyle=i.accent,s.lineWidth=10,s.strokeRect(24,24,464,976),s.fillStyle=i.accent,s.font="bold 150px Bebas Neue, Impact, sans-serif",s.textAlign="center",s.save(),s.translate(256,400),s.rotate(-Math.PI/2),s.fillText(e,0,0),s.restore(),s.font="bold 52px Barlow Condensed, sans-serif",s.fillStyle="#f5f5f4",s.save(),s.translate(256,512),s.rotate(-Math.PI/2),s.fillText("FIGHT NIGHT",200,-18),s.restore(),hi(n,t)}function Kb(i="TG BOXING",e="THE GLORY OF CHAMPIONS",t="#f2c14e"){const n=`screen-${i}-${e}-${t}`;if(kt.has(n))return kt.get(n);const s=di(1024,576),a=s.getContext("2d"),r=a.createLinearGradient(0,0,1024,576);return r.addColorStop(0,"#09090d"),r.addColorStop(.5,"#15101a"),r.addColorStop(1,"#050507"),a.fillStyle=r,a.fillRect(0,0,1024,576),a.strokeStyle=t,a.lineWidth=6,a.strokeRect(20,20,984,536),a.textAlign="center",a.fillStyle="#f5f5f4",a.font="bold 126px Bebas Neue, Impact, sans-serif",a.fillText(i,512,260),a.fillStyle=t,a.font="600 34px Barlow Condensed, sans-serif",a.fillText(e,512,320),a.fillStyle="rgba(245,245,244,.55)",a.font="500 24px Barlow Condensed, sans-serif",a.fillText("T G   B O X I N G   •   L I V E",512,450),hi(s,n)}function Dl(i="#ffffff",e=128){const t=`glow-${i}-${e}`;if(kt.has(t))return kt.get(t);const n=di(e,e),s=n.getContext("2d"),a=s.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);return a.addColorStop(0,i),a.addColorStop(.25,i),a.addColorStop(.6,"rgba(255,255,255,.18)"),a.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=a,s.fillRect(0,0,e,e),hi(n,t)}function qh(){if(kt.has("spark"))return kt.get("spark");const i=di(256,256),e=i.getContext("2d");e.translate(128,128);const t=e.createRadialGradient(0,0,0,0,0,120);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.16,"rgba(255,241,190,.95)"),t.addColorStop(.45,"rgba(255,140,60,.35)"),t.addColorStop(1,"rgba(255,100,40,0)"),e.fillStyle=t,e.beginPath(),e.arc(0,0,120,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(255,255,255,.9)",e.lineWidth=3;for(let n=0;n<12;n++){const s=Math.PI*2*n/12;e.beginPath(),e.moveTo(Math.cos(s)*20,Math.sin(s)*20),e.lineTo(Math.cos(s)*(60+Math.random()*55),Math.sin(s)*(60+Math.random()*55)),e.stroke()}return hi(i,"spark")}function Jb(){if(kt.has("logo"))return kt.get("logo");const i=di(1024,512),e=i.getContext("2d");return e.clearRect(0,0,1024,512),e.textAlign="center",e.fillStyle="#f2c14e",e.font="bold 220px Bebas Neue, Impact, sans-serif",e.fillText("TG BOXING",512,280),e.fillStyle="#f5f5f4",e.font="600 52px Barlow Condensed, sans-serif",e.fillText("THE GLORY OF CHAMPIONS",512,360),hi(i,"logo")}function Zb(i={}){const e=`belt-${i.org||"tgb"}-${i.tier||"world"}-${i.name||""}-${i.holder||""}`;if(kt.has(e))return kt.get(e);const n={tgb:"#f2c14e",gbu:"#93c5fd",wca:"#6ee7b7"}[i.org]||"#f2c14e",s=di(512,512),a=s.getContext("2d"),r=a.createRadialGradient(256,256,20,256,256,250);return r.addColorStop(0,"#fff7cf"),r.addColorStop(.4,n),r.addColorStop(1,"#5b3a08"),a.fillStyle=r,a.beginPath(),a.arc(256,256,240,0,Math.PI*2),a.fill(),a.strokeStyle="#3a2405",a.lineWidth=14,a.beginPath(),a.arc(256,256,228,0,Math.PI*2),a.stroke(),a.fillStyle="#1b1307",a.textAlign="center",a.font="bold 100px Bebas Neue, Impact, sans-serif",a.fillText((i.org||"TGB").toUpperCase(),256,250),a.font="600 36px Barlow Condensed, sans-serif",a.fillText((i.tier||"WORLD").toUpperCase(),256,310),a.font="500 24px Barlow Condensed, sans-serif",a.fillText("CHAMPION",256,350),hi(s,e)}function Qb(){if(kt.has("crowd-billboard"))return kt.get("crowd-billboard");const i=di(1024,256),e=i.getContext("2d");return e.fillStyle="#09090d",e.fillRect(0,0,1024,256),e.fillStyle="#f2c14e",e.fillRect(0,0,1024,8),e.fillRect(0,248,1024,8),e.textAlign="center",e.fillStyle="#f5f5f4",e.font="bold 96px Bebas Neue, Impact, sans-serif",e.fillText("TG BOXING  •  CHAMPIONS SERIES",512,150),e.fillStyle="#c1121f",e.font="600 32px Barlow Condensed, sans-serif",e.fillText("THE GLORY OF CHAMPIONS",512,200),hi(i,"crowd-billboard")}function e_(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function t_(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function fd(i){const e=t_(typeof i=="string"?e_(i):i);return{next:e,range:(n,s)=>n+e()*(s-n),int:(n,s)=>Math.floor(n+e()*(s-n+1)),pick:n=>n[Math.floor(e()*n.length)],chance:n=>e()<n,shuffle:n=>{const s=n.slice();for(let a=s.length-1;a>0;a--){const r=Math.floor(e()*(a+1));[s[a],s[r]]=[s[r],s[a]]}return s},gauss:(n=0,s=1)=>{const a=Math.max(1e-9,e()),r=e();return n+Math.sqrt(-2*Math.log(a))*Math.cos(2*Math.PI*r)*s}}}const Ve=(i,e,t)=>Math.max(e,Math.min(t,i)),Je=(i,e,t)=>i+(e-i)*t,En=(i,e,t,n)=>Je(i,e,1-Math.exp(-t*n)),ar=i=>{const e=Ve(i,0,1);return e*e*(3-2*e)},md="tgboxing.save.v1",vp=1,pn=[{id:"fly",name:"Peso-Mosca",en:"Flyweight",min:48,max:51,color:"#38bdf8"},{id:"bantam",name:"Peso-Galo",en:"Bantamweight",min:51,max:54,color:"#22d3ee"},{id:"feather",name:"Peso-Pena",en:"Featherweight",min:54,max:57,color:"#34d399"},{id:"light",name:"Peso-Leve",en:"Lightweight",min:57,max:61,color:"#a3e635"},{id:"jwelter",name:"Peso-Superleve",en:"Junior Welterweight",min:61,max:64,color:"#facc15"},{id:"welter",name:"Peso-Meio-Médio",en:"Welterweight",min:64,max:67,color:"#fb923c"},{id:"middle",name:"Peso-Médio",en:"Middleweight",min:67,max:73,color:"#f97316"},{id:"smedian",name:"Peso-Supermédio",en:"Super Middleweight",min:73,max:76,color:"#ef4444"},{id:"lheavy",name:"Peso-Meio-Pesado",en:"Light Heavyweight",min:76,max:79,color:"#dc2626"},{id:"cruiser",name:"Peso-Cruzador",en:"Cruiserweight",min:79,max:91,color:"#e11d48"},{id:"heavy",name:"Peso-Pesado",en:"Heavyweight",min:91,max:130,color:"#f43f5e"}],xn=Object.fromEntries(pn.map(i=>[i.id,i])),Ft=[{id:"tgb",name:"TG Boxing Board",short:"TGB",color:"#f2c14e",color2:"#8a5a12",motto:"O conselho supremo do ringue."},{id:"gbu",name:"Global Boxing Union",short:"GBU",color:"#60a5fa",color2:"#1d4ed8",motto:"Um cinturão. Um mundo."},{id:"wca",name:"World Champions Alliance",short:"WCA",color:"#34d399",color2:"#047857",motto:"Onde lendas são forjadas."}],Da=[{id:"national",name:"Cinturão Nacional",short:"NACIONAL",prestige:1,minRank:12},{id:"continental",name:"Cinturão Continental",short:"CONTINENTAL",prestige:2,minRank:8},{id:"international",name:"Cinturão Internacional",short:"INTERNACIONAL",prestige:3,minRank:5},{id:"interim",name:"Cinturão Interino",short:"INTERINO",prestige:4,minRank:2},{id:"world",name:"Cinturão Mundial",short:"MUNDIAL",prestige:5,minRank:1},{id:"undisputed",name:"Cinturão Absoluto",short:"ABSOLUTO",prestige:6,minRank:1},{id:"supreme",name:"Campeão dos Campeões",short:"SUPREMO",prestige:7,minRank:1}],Si=[{id:"aggressive",name:"Agressivo",desc:"Pressão constante, combinações curtas e muita trocação.",color:"#ef4444",modifiers:{power:1.08,speed:.96,defense:.94,stamina:.97,accuracy:1}},{id:"defensive",name:"Defensivo",desc:"Guarda fechada, leitura do adversário e contra-ataques.",color:"#38bdf8",modifiers:{power:.96,speed:.98,defense:1.12,stamina:1.03,accuracy:1.04}},{id:"technical",name:"Técnico",desc:"Precisão cirúrgica, distância perfeita e jab de mestre.",color:"#f2c14e",modifiers:{power:1,speed:1.02,defense:1.05,stamina:1,accuracy:1.1}},{id:"counter",name:"Contra-Atacante",desc:"Esquiva e castiga o erro. Timing é tudo.",color:"#a78bfa",modifiers:{power:1.06,speed:1,defense:1.08,stamina:1,accuracy:1.02}},{id:"speed",name:"Velocista",desc:"Mãos rápidas, pés mais rápidos ainda. Acerta e sai.",color:"#22d3ee",modifiers:{power:.92,speed:1.16,defense:1,stamina:1.04,accuracy:1.02}},{id:"pressure",name:"Pressão",desc:"Avança sem parar e sufoca o oponente nas cordas.",color:"#fb923c",modifiers:{power:1.05,speed:1,defense:.98,stamina:1.1,accuracy:.97}}],Bn=Object.fromEntries(Si.map(i=>[i.id,i])),n_=[{id:"strength",name:"Força",short:"FOR",icon:"fist"},{id:"speed",name:"Velocidade",short:"VEL",icon:"bolt"},{id:"stamina",name:"Resistência",short:"RES",icon:"lungs"},{id:"precision",name:"Precisão",short:"PRE",icon:"target"},{id:"defense",name:"Defesa",short:"DEF",icon:"shield"},{id:"reflexes",name:"Reflexos",short:"REF",icon:"eye"},{id:"mobility",name:"Mobilidade",short:"MOB",icon:"feet"},{id:"recovery",name:"Recuperação",short:"REC",icon:"heart"},{id:"conditioning",name:"Condicionamento",short:"CND",icon:"flame"}];Object.fromEntries(n_.map(i=>[i.id,i]));const Zi=[{code:"BRA",name:"Brasil"},{code:"USA",name:"Estados Unidos"},{code:"JPN",name:"Japão"},{code:"MEX",name:"México"},{code:"PHI",name:"Filipinas"},{code:"GBR",name:"Reino Unido"},{code:"ARG",name:"Argentina"},{code:"RUS",name:"Rússia"},{code:"NGA",name:"Nigéria"},{code:"ZAF",name:"África do Sul"},{code:"AUS",name:"Austrália"},{code:"FRA",name:"França"},{code:"ITA",name:"Itália"},{code:"ESP",name:"Espanha"},{code:"TUR",name:"Turquia"},{code:"KOR",name:"Coreia do Sul"},{code:"THA",name:"Tailândia"},{code:"CAN",name:"Canadá"},{code:"CUB",name:"Cuba"},{code:"UKR",name:"Ucrânia"},{code:"POL",name:"Polônia"},{code:"IRL",name:"Irlanda"},{code:"GHA",name:"Gana"},{code:"IDN",name:"Indonésia"},{code:"COL",name:"Colômbia"},{code:"PRI",name:"Porto Rico"},{code:"KAZ",name:"Cazaquistão"},{code:"MAR",name:"Marrocos"},{code:"SWE",name:"Suécia"},{code:"GER",name:"Alemanha"}],i_=Object.fromEntries(Zi.map(i=>[i.code,i])),jh=["Diego","Marcus","Kenji","Rafael","Victor","Andre","Lucas","Mateus","Gabriel","Thiago","Bruno","Caio","Eduardo","Felipe","Gustavo","Henrique","Igor","João","Kauã","Leandro","Murilo","Nicolas","Otávio","Paulo","Renan","Samuel","Tales","Vinicius","Wesley","Yuri","Tyson","Malik","Darius","Jamal","Xavier","Isaiah","Ezekiel","Amari","Kofi","Kwame","Hiroshi","Takumi","Ryo","Sota","Haruto","Kaito","Daiki","Yuto","Sora","Ren","Miguel","Alejandro","Javier","Carlos","Luis","Emilio","Santiago","Matias","Joaquin","Ramon","Dmitri","Sergei","Ivan","Nikolai","Oleksandr","Viktor","Pavel","Andrei","Mikhail","Bogdan","Liam","Conor","Declan","Sean","Owen","Callum","Rhys","Aiden","Kieran","Finn","Omar","Karim","Yusuf","Tariq","Amir","Rashid","Idris","Hamza","Zane","Malachai","Jin","Minho","Taeyang","Sunwoo","Jihoon","Arjun","Rohan","Vikram","Aditya","Rahul","Kwesi","Chidi","Tunde","Kelechi","Mosi","Thabo","Sipho","Jomo","Kito","Ayo"],Yh=["Moreira","Carter","Takahashi","Santos","Williams","Silva","Costa","Almeida","Ferreira","Pereira","Oliveira","Rocha","Ribeiro","Martins","Barbosa","Carvalho","Gomes","Araújo","Lima","Melo","Thompson","Jackson","Harris","Robinson","Walker","Young","King","Wright","Banks","Foster","Nakamura","Watanabe","Yamamoto","Kobayashi","Sato","Ito","Tanaka","Mori","Fujita","Ogawa","Garcia","Lopez","Martinez","Rodriguez","Hernandez","Gonzalez","Vargas","Cruz","Ramirez","Flores","Volkov","Petrov","Sokolov","Ivanov","Kovalenko","Bondarenko","Shevchenko","Morozov","Kuznetsov","Lebedev","O'Brien","MacGregor","Byrne","Doyle","Murphy","Gallagher","Nolan","Fitzgerald","Kelly","Brennan","Hassan","Rahman","Khalid","Farouk","Nasser","Haddad","Saleh","Zahir","Rashid","Aziz","Kim","Park","Lee","Choi","Jung","Kang","Shin","Yoon","Baek","Hwang","Okafor","Mensah","Adeyemi","Ndlovu","Mbatha","Dlamini","Osei","Achebe","Diallo","Kamara"],ao=["The Beast","Iron Fist","The Storm","El Toro","Nightmare","A Fera","Mão de Pedra","O Furacão","The Hammer","O Fantasma","The Cobra","Trovão","Blackout","O Predador","The Surgeon","Lâmina","The Tank","O Muro","Lightning","Relâmpago","The Reaper","O Ceifador","Golden Boy","Menino de Ouro","The Professor","O Professor","The Ghost","O Ciclone","Sandman","O Rei","The Butcher","O Carrasco","El Diablo","The Rocket","Foguete","Iron Jaw","Mandíbula de Aço","The Viper","A Víbora","The Titan","O Titã","Sugar","Açúcar","The Machine","A Máquina","Dynamite","Dinamite","The Wolf","O Lobo","The Prince","O Príncipe","King","O Monarca","The Assassin","O Assassino","The Blade","A Navalha","The Bull","O Touro","The Eagle","A Águia","The Shark","O Tubarão","The Phoenix","A Fênix","The Samurai","O Samurai","The Dragon","O Dragão","The Panther","A Pantera","The Giant","O Gigante","The Executioner","O Executor","The Silent","O Silencioso","The Showman","O Showman","The Wall","A Muralha","The Kid","O Garoto","The Veteran","O Veterano","The Professor","The Saint","O Santo","The Outlaw","O Fora da Lei","The Emperor","O Imperador","The Hurricane","The Tsunami","O Tsunami","The Volcano","O Vulcão","The Diamond","O Diamante","The Sniper","O Sniper","The Monster","O Monstro","The Legend","A Lenda","El Rayo","El Matador","El Cóndor","The Tiger","O Tigre","The Raging Bull","The Iceman","O Homem de Gelo"],yp=["Nenhuma","Medalha de Ouro","Medalha de Prata","Medalha de Bronze","Troféu Mini","Corrente de Campeão"],Kh=[["#c1121f","#f2c14e","#f6f1e7"],["#0f172a","#f2c14e","#e5e7eb"],["#1d4ed8","#e2e8f0","#c1121f"],["#047857","#f2c14e","#ecfdf5"],["#7c3aed","#f0abfc","#111827"],["#ea580c","#111827","#fef3c7"],["#be123c","#111827","#fda4af"],["#0e7490","#f8fafc","#22d3ee"],["#f5f5f4","#111827","#dc2626"],["#111827","#dc2626","#f5f5f4"],["#b91c1c","#fbbf24","#450a0a"],["#1e3a8a","#facc15","#f8fafc"],["#312e81","#a5b4fc","#e0e7ff"],["#166534","#86efac","#052e16"],["#78350f","#fcd34d","#fffbeb"],["#9d174d","#f9a8d4","#fff1f2"],["#334155","#94a3b8","#f1f5f9"],["#7f1d1d","#fca5a5","#1c1917"],["#164e63","#67e8f9","#ecfeff"],["#4c1d95","#c4b5fd","#f5f3ff"]],s_=["Sangue & Ouro","Meia-Noite","Azul Aço","Esmeralda","Neblina","Cobre","Rubi","Oceano","Marfim","Sombra","Fúria","Azul Real","Índigo","Mata","Âmbar","Rosa Choque","Grafite","Vinho","Gelo","Violeta"],Jh=["Vermelho","Azul","Verde","Roxo","Laranja","Rosa","Ciano","Preto","Branco","Dourado","Prata","Bronze","Grafite","Marinho","Vinho","Turquesa","Limão","Coral","Lavanda","Areia"];function a_(){const i=[];for(let e=0;e<100;e++){const t=Kh[e%Kh.length],n=Math.floor(e/20),s=n%3,a=[t[s],t[(s+1)%3],t[(s+2)%3]];i.push({id:`cw${e}`,name:`${s_[e%20]} ${["I","II","III","IV","V"][n]}`,colors:a,primary:a[0],secondary:a[1],accent:a[2]})}return i}const qn=a_();Object.fromEntries(qn.map(i=>[i.id,i]));const r_=[{name:"Buzz",shape:"buzz"},{name:"Fade",shape:"fade"},{name:"Afro",shape:"afro"},{name:"Cachos",shape:"curls"},{name:"Longo",shape:"long"},{name:"Moicano",shape:"mohawk"},{name:"Ponytail",shape:"ponytail"},{name:"Tranças",shape:"braids"},{name:"Slick Back",shape:"slick"},{name:"Espetado",shape:"spiky"},{name:"Coque",shape:"topknot"},{name:"Undercut",shape:"undercut"},{name:"Flat Top",shape:"flat"},{name:"Dreads",shape:"dreads"},{name:"Ondulado",shape:"wavy"},{name:"Raspado",shape:"bald"},{name:"Lateral Longo",shape:"sidepart"},{name:"Nuvem",shape:"cloud"},{name:"Samurai",shape:"samurai"},{name:"Boxer Clássico",shape:"classic"}],Zh=["#141014","#2b1a12","#4a2c1c","#704a2e","#a9713f","#d8a86a","#e8d3a8","#b8b8b8","#e8e8e8","#8b1e1e","#d4af37","#4b2e83","#1f6f5c","#244a7a","#b35c1e","#7a2740","#5c6b73","#e6b7c8","#2f4858","#c9a0dc"],o_=["Clássico","Volume Máximo","Texturizado","Risco Lateral","Lâminas"];function c_(){const i=[];for(let e=0;e<100;e++){const t=r_[e%20],n=Math.floor(e/20),s=Zh[(e*7+n)%Zh.length];i.push({id:`hair${e}`,name:`${t.name} ${o_[n]}`,short:t.name,shape:t.shape,color:s,variant:n,volume:.85+n*.14,shine:n===4})}return i}const Ci=c_();Object.fromEntries(Ci.map(i=>[i.id,i]));const As=[{id:"none",name:"Nenhuma",shape:"none"},{id:"stubble",name:"Barba por Fazer",shape:"stubble"},{id:"goatee",name:"Cavanhaque",shape:"goatee"},{id:"mustache",name:"Bigode",shape:"mustache"},{id:"full",name:"Barba Cheia",shape:"full"},{id:"chinstrap",name:"Chinstrap",shape:"chinstrap"},{id:"chin",name:"Barba de Queixo",shape:"chin"},{id:"horseshoe",name:"Ferradura",shape:"horseshoe"},{id:"walrus",name:"Morsa",shape:"walrus"},{id:"vandyke",name:"Van Dyke",shape:"vandyke"},{id:"long",name:"Barba Longa",shape:"long"},{id:"mutton",name:"Costeletas",shape:"mutton"},{id:"anchor",name:"Âncora",shape:"anchor"},{id:"bandholz",name:"Bandholz",shape:"bandholz"},{id:"soul",name:"Soul Patch",shape:"soul"},{id:"circle",name:"Barba Círculo",shape:"circle"},{id:"ducktail",name:"Ducktail",shape:"ducktail"},{id:"extended",name:"Bigode Longo",shape:"extended"},{id:"balbo",name:"Balbo",shape:"balbo"},{id:"garibaldi",name:"Garibaldi",shape:"garibaldi"},{id:"wizard",name:"Mago",shape:"wizard"},{id:"shortbox",name:"Boxer Curta",shape:"shortbox"},{id:"imperial",name:"Imperial",shape:"imperial"},{id:"english",name:"Inglês",shape:"english"},{id:"friendly",name:"Friendly Mutton",shape:"friendly"},{id:"hollywood",name:"Hollywood",shape:"hollywood"}],Rs=[{id:"b0",name:"Natural"},{id:"b1",name:"Grosso"},{id:"b2",name:"Arqueado"},{id:"b3",name:"Agressivo"},{id:"b4",name:"Fino"},{id:"b5",name:"Cicatriz"},{id:"b6",name:"Reto"},{id:"b7",name:"Curto"},{id:"b8",name:"Falhado"},{id:"b9",name:"Expressivo"},{id:"b10",name:"Marcante"},{id:"b11",name:"Suave"},{id:"b12",name:"Lâmina"},{id:"b13",name:"Largo"},{id:"b14",name:"Elevado"},{id:"b15",name:"Caído"},{id:"b16",name:"Duplo"},{id:"b17",name:"Desenhado"},{id:"b18",name:"Selvagem"},{id:"b19",name:"Campeão"}],Ps=[{id:"oval",name:"Oval"},{id:"square",name:"Quadrado"},{id:"round",name:"Redondo"},{id:"long",name:"Longo"},{id:"diamond",name:"Diamante"},{id:"angular",name:"Angular"},{id:"heart",name:"Coração"},{id:"wide",name:"Largo"},{id:"narrow",name:"Estreito"},{id:"sculpted",name:"Esculpido"}],Ls=[{id:"e0",name:"Castanhos"},{id:"e1",name:"Pretos"},{id:"e2",name:"Azuis"},{id:"e3",name:"Verdes"},{id:"e4",name:"Mel"},{id:"e5",name:"Cinza"},{id:"e6",name:"Âmbar"},{id:"e7",name:"Avelã"},{id:"e8",name:"Gelo"},{id:"e9",name:"Fogo"},{id:"e10",name:"Escuros"},{id:"e11",name:"Cristal"},{id:"e12",name:"Felino"},{id:"e13",name:"Focados"}],Is=[{id:"n0",name:"Clássico"},{id:"n1",name:"Largo"},{id:"n2",name:"Fino"},{id:"n3",name:"Adunco"},{id:"n4",name:"Quebrado"},{id:"n5",name:"Curto"},{id:"n6",name:"Longo"},{id:"n7",name:"Achatado"},{id:"n8",name:"Grego"},{id:"n9",name:"Romano"},{id:"n10",name:"Lutador"},{id:"n11",name:"Suave"}],Ds=[{id:"m0",name:"Neutra"},{id:"m1",name:"Séria"},{id:"m2",name:"Sorridente"},{id:"m3",name:"Firme"},{id:"m4",name:"Agressiva"},{id:"m5",name:"Larga"},{id:"m6",name:"Fina"},{id:"m7",name:"Confiante"},{id:"m8",name:"Cansada"},{id:"m9",name:"Determinada"},{id:"m10",name:"Provocadora"},{id:"m11",name:"Calma"},{id:"m12",name:"Grito"},{id:"m13",name:"Sutil"}],ks=[{id:"s0",name:"Nenhuma"},{id:"s1",name:"Sobrancelha"},{id:"s2",name:"Bochecha"},{id:"s3",name:"Queixo"},{id:"s4",name:"Testa"},{id:"s5",name:"Nariz"},{id:"s6",name:"Guerreiro"},{id:"s7",name:"Dupla"},{id:"s8",name:"Lábio"},{id:"s9",name:"Têmpora"},{id:"s10",name:"Olho"},{id:"s11",name:"Veterano"}],ns=[{id:"sk0",name:"Marfim",color:"#f5d6c2"},{id:"sk1",name:"Porcelana",color:"#f1c9b0"},{id:"sk2",name:"Areia",color:"#e8bb98"},{id:"sk3",name:"Mel",color:"#d99f72"},{id:"sk4",name:"Âmbar",color:"#c28558"},{id:"sk5",name:"Bronze",color:"#a96b41"},{id:"sk6",name:"Cobre",color:"#92542f"},{id:"sk7",name:"Castanha",color:"#7a4226"},{id:"sk8",name:"Mogno",color:"#62341e"},{id:"sk9",name:"Ébano",color:"#4a2617"},{id:"sk10",name:"Noite",color:"#3a1d12"},{id:"sk11",name:"Obsidiana",color:"#2b1510"},{id:"sk12",name:"Oliva",color:"#d6b27e"},{id:"sk13",name:"Canela",color:"#b07a4d"},{id:"sk14",name:"Cacau",color:"#6c3d26"},{id:"sk15",name:"Terracota",color:"#b96846"},{id:"sk16",name:"Dourado",color:"#c99a5f"},{id:"sk17",name:"Gelo",color:"#f7e3d4"},{id:"sk18",name:"Rubro",color:"#8e4a33"},{id:"sk19",name:"Escuro",color:"#33190f"}];function br(i,e,t,n){const s=[];for(let a=0;a<e;a++){const r=t[a%t.length],o=Math.floor(a/t.length),c=qn[(a*11+o*3)%qn.length],l=n[(a*3+o)%n.length];s.push({id:`${i}${a}`,name:`${r.name} ${["I","II","III","IV","V","VI","VII","VIII","IX","X"][o]||o+1}`,model:r.id,modelName:r.name,pattern:l,colors:c.colors,colorway:c.id,variant:o,detail:r.detail||0})}return s}const l_=[{id:"classic",name:"Clássico",detail:0},{id:"long",name:"Longo",detail:1},{id:"short",name:"Curto",detail:2},{id:"high",name:"Cintura Alta",detail:3},{id:"split",name:"Fenda Lateral",detail:4},{id:"satin",name:"Cetim",detail:5},{id:"taped",name:"Fita de Campeão",detail:6},{id:"boxer",name:"Boxer",detail:7},{id:"muay",name:"Competição",detail:8},{id:"retro",name:"Retrô",detail:9},{id:"pro",name:"Pro Elite",detail:10},{id:"heritage",name:"Heritage",detail:11}],d_=[{id:"tank",name:"Regata"},{id:"sleeveless",name:"Sem Manga"},{id:"compression",name:"Compressão"},{id:"loose",name:"Solto"},{id:"crop",name:"Crop"},{id:"hoodie",name:"Moletom Sem Manga"},{id:"jersey",name:"Jersey"},{id:"tech",name:"Tech"},{id:"vintage",name:"Vintage"},{id:"mesh",name:"Mesh"}],h_=[{id:"boxing",name:"Boxing Boot"},{id:"low",name:"Low Top"},{id:"high",name:"High Top"},{id:"speed",name:"Speed Lace"},{id:"classic",name:"Classic Leather"},{id:"mesh",name:"Mesh Pro"},{id:"gold",name:"Gold Edition"},{id:"retro",name:"Retro 74"},{id:"mat",name:"Mat Elite"},{id:"champ",name:"Champion"}],u_=[{id:"classic",name:"Clássico"},{id:"hood",name:"Capuz"},{id:"royal",name:"Royal"},{id:"satin",name:"Cetim"},{id:"lux",name:"Luxo"},{id:"warrior",name:"Guerreiro"},{id:"samurai",name:"Samurai"},{id:"champ",name:"Campeão"},{id:"minimal",name:"Minimal"},{id:"legacy",name:"Legacy"}],p_=[{id:"classic",name:"Clássica"},{id:"pro",name:"Pro Fight"},{id:"laced",name:"Laced"},{id:"velcro",name:"Velcro"},{id:"compact",name:"Compacta"},{id:"power",name:"Power"},{id:"speed",name:"Speed"},{id:"heritage",name:"Heritage"},{id:"elite",name:"Elite"},{id:"custom",name:"Custom"}],_r=["solid","stripe","dual","gradient","checker","stars","diagonal","vsplit","rings","flame","geo","wave"],Ai=br("shorts",100,l_,_r),Ta=br("top",100,d_,_r),Ri=br("shoe",100,h_,_r),Pi=br("robe",100,u_,_r),Li=br("glove",100,p_,_r);for(const[i,e]of[[Ai,"shorts"],[Ta,"top"],[Ri,"shoe"],[Pi,"robe"],[Li,"glove"]])i.forEach((t,n)=>{t.name=`${t.modelName} ${Jh[n*5%Jh.length]} ${["I","II","III","IV","V","VI","VII","VIII","IX","X"][Math.floor(n/10)%10]}`,t.slot=e});const Do=[{id:"neighborhood",name:"Academia do Bairro",city:"São Paulo, BRA",capacity:320,tier:1,accent:"#f59e0b",accent2:"#7c2d12",crowd:.28,roof:"hall",mat:"#1a1a20",ropes:["#dc2626","#f5f5f4","#2563eb"],fog:"#0b0a09",light:"#ffd9a0",intro:"Onde todo campeão dá o primeiro passo."},{id:"municipal",name:"Ginásio Municipal",city:"Curitiba, BRA",capacity:1800,tier:1,accent:"#38bdf8",accent2:"#0c4a6e",crowd:.55,roof:"hall",mat:"#172033",ropes:["#2563eb","#f5f5f4","#dc2626"],fog:"#080c14",light:"#bfe3ff",intro:"Arquibancadas lotadas, sonhos em jogo."},{id:"national",name:"Arena Nacional",city:"Rio de Janeiro, BRA",capacity:12e3,tier:2,accent:"#22c55e",accent2:"#14532d",crowd:.75,roof:"arena",mat:"#14251c",ropes:["#facc15","#16a34a","#f5f5f4"],fog:"#07110b",light:"#d8ffe8",intro:"A casa do boxe brasileiro."},{id:"tokyo",name:"Ginásio Korakuen",city:"Tóquio, JPN",capacity:15e3,tier:3,accent:"#ef4444",accent2:"#450a0a",crowd:.82,roof:"arena",mat:"#1d0f12",ropes:["#dc2626","#f5f5f4","#dc2626"],fog:"#120608",light:"#ffe0d6",intro:"Tradição, disciplina e trovões no ringue."},{id:"vegas",name:"Neon Grand Arena",city:"Las Vegas, USA",capacity:2e4,tier:3,accent:"#a855f7",accent2:"#312e81",crowd:.9,roof:"arena",mat:"#16102a",ropes:["#a855f7","#f2c14e","#22d3ee"],fog:"#0a0714",light:"#e8d5ff",intro:"As luzes mais brilhantes do mundo."},{id:"newyork",name:"Empire Square Garden",city:"Nova York, USA",capacity:19500,tier:3,accent:"#f97316",accent2:"#431407",crowd:.88,roof:"arena",mat:"#1c100a",ropes:["#f97316","#f5f5f4","#1d4ed8"],fog:"#100a06",light:"#ffe2c4",intro:"O palco que transforma lutadores em lendas."},{id:"london",name:"Royal Crown Hall",city:"Londres, GBR",capacity:17e3,tier:3,accent:"#eab308",accent2:"#422006",crowd:.84,roof:"arena",mat:"#1c1608",ropes:["#eab308","#7f1d1d","#f5f5f4"],fog:"#0d0a03",light:"#fff0c2",intro:"Elegância, história e socos de aço."},{id:"mexico",name:"Coliseo Azteca",city:"Cidade do México, MEX",capacity:22e3,tier:3,accent:"#22c55e",accent2:"#052e16",crowd:.93,roof:"stadium",mat:"#0c2116",ropes:["#16a34a","#f5f5f4","#dc2626"],fog:"#04120a",light:"#eafff0",intro:"Um mar de gente. Um oceano de ruído."},{id:"manila",name:"Thunder Dome Manila",city:"Manila, PHI",capacity:16e3,tier:2,accent:"#facc15",accent2:"#422006",crowd:.86,roof:"arena",mat:"#241c06",ropes:["#facc15","#1d4ed8","#f5f5f4"],fog:"#120d03",light:"#fff4c9",intro:"Paixão tropical em cada assento."},{id:"berlin",name:"Stahl Arena",city:"Berlim, GER",capacity:14e3,tier:2,accent:"#94a3b8",accent2:"#0f172a",crowd:.78,roof:"hall",mat:"#121820",ropes:["#64748b","#dc2626","#f5f5f4"],fog:"#070a0e",light:"#dfe9ff",intro:"Engenharia, precisão e força bruta."},{id:"moscow",name:"Iron Bear Coliseum",city:"Moscou, RUS",capacity:18e3,tier:3,accent:"#ef4444",accent2:"#1c1917",crowd:.85,roof:"arena",mat:"#1a0e0e",ropes:["#dc2626","#f5f5f4","#facc15"],fog:"#0d0505",light:"#ffdada",intro:"Frio lá fora. Fogo aqui dentro."},{id:"dubai",name:"Golden Sands Arena",city:"Dubai, UAE",capacity:25e3,tier:4,accent:"#f2c14e",accent2:"#78350f",crowd:.9,roof:"stadium",mat:"#231a08",ropes:["#f2c14e","#f5f5f4","#0f172a"],fog:"#120e04",light:"#fff1c1",intro:"Ouro, suor e o topo do mundo."},{id:"underground",name:"The Underground",city:"Local sigiloso",capacity:900,tier:2,accent:"#f43f5e",accent2:"#1e1b4b",crowd:.6,roof:"underground",mat:"#0b0a12",ropes:["#f43f5e","#312e81","#f5f5f4"],fog:"#05040a",light:"#ff9eb0",intro:"Sem regras para os fracos. Só para os fortes."},{id:"seoul",name:"Seoul Cyber Dome",city:"Seul, KOR",capacity:21e3,tier:4,accent:"#22d3ee",accent2:"#164e63",crowd:.92,roof:"arena",mat:"#06181c",ropes:["#22d3ee","#a855f7","#f5f5f4"],fog:"#030d10",light:"#c8fbff",intro:"O futuro do espetáculo em 360 graus."},{id:"champions",name:"TG Coliseum of Champions",city:"TG City",capacity:4e4,tier:5,accent:"#f2c14e",accent2:"#7f1d1d",crowd:1,roof:"stadium",mat:"#160d0d",ropes:["#f2c14e","#c1121f","#f5f5f4"],fog:"#0c0505",light:"#fff2cd",intro:"O templo máximo. Onde a glória é eterna."}],Ss=Object.fromEntries(Do.map(i=>[i.id,i])),f_=[{id:"rookie",name:"Estreante",desc:"IA mais lenta e tolerante.",mult:.78,reward:.8},{id:"pro",name:"Profissional",desc:"Leitura de luta equilibrada.",mult:1,reward:1},{id:"elite",name:"Elite",desc:"Reflexos rápidos e punição implacável.",mult:1.18,reward:1.25},{id:"legend",name:"Lenda",desc:"A experiência de um campeão mundial.",mult:1.38,reward:1.6}],qi=[{id:"gear_bag",type:"gym",slot:"heavybag",name:"Saco de Pancada Reforçado",price:1200,desc:"Treino de potência +4% de ganho.",boost:{strength:.04},icon:"bag"},{id:"gear_ring",type:"gym",slot:"ring",name:"Ringue Profissional",price:3500,desc:"Sparring de elite +4% em todos os treinos.",boost:{all:.04},icon:"ring"},{id:"gear_speed",type:"gym",slot:"speed",name:"Kit de Velocidade TG",price:1800,desc:"Treino de velocidade +5%.",boost:{speed:.05},icon:"bolt"},{id:"gear_recovery",type:"gym",slot:"recovery",name:"Câmara de Recuperação",price:2400,desc:"Recuperação +5% entre rounds.",boost:{recovery:.05},icon:"heart"},{id:"gear_sparring",type:"gym",slot:"sparring",name:"Sparring Partners",price:2e3,desc:"Reflexos +4% no treino.",boost:{reflexes:.04},icon:"people"},{id:"boost_tape",type:"training",name:"Bandagem de Foco (fictícia)",price:350,desc:"Item de treino fictício: +8% de ganho em uma sessão.",consumable:!0,icon:"wrap"},{id:"boost_recovery",type:"training",name:"Banho de Gelo TG (fictício)",price:420,desc:"Recupera energia e +6% de treino físico.",consumable:!0,icon:"ice"},{id:"boost_mind",type:"training",name:"Treino Mental Elite (fictício)",price:500,desc:"Melhora leitura de luta por uma sessão.",consumable:!0,icon:"brain"},{id:"cosmetic_gold",type:"cosmetic",slot:"glove",name:"Luvas Ouro Absoluto",price:800,coins:200,desc:"Visual lendário dourado.",cosmetic:!0,icon:"glove"},{id:"cosmetic_medal",type:"cosmetic",slot:"medal",name:"Medalha de Campeão",price:600,coins:120,desc:"Sua história no peito.",cosmetic:!0,icon:"medal"},{id:"robe_champ",type:"cosmetic",slot:"robe",name:"Roupão dos Campeões",price:1400,desc:"Entrada de respeito.",cosmetic:!0,icon:"robe"},{id:"coach_legend",type:"staff",name:'Coach "Mestre" Okada',price:6e3,desc:"Treinador lendário: +7% em todos os atributos de treino.",boost:{all:.07},icon:"coach"},{id:"coach_speed",type:"staff",name:'Coach Ana "Relâmpago"',price:3200,desc:"Treinador de velocidade: +8% em velocidade e mobilidade.",boost:{speed:.08,mobility:.08},icon:"coach"},{id:"sponsor_local",type:"sponsor",name:"Patrocínio Academia Local",price:2e3,desc:"Renda extra de 200 moedas por vitória.",icon:"sponsor"},{id:"sponsor_global",type:"sponsor",name:"Patrocínio TG Global",price:9e3,desc:"Renda extra de 900 moedas e 20 TG por vitória.",icon:"sponsor"},{id:"belt_case",type:"cosmetic",slot:"gallery",name:"Vitrine de Cinturões",price:1800,desc:"Sua galeria de troféus.",cosmetic:!0,icon:"belt"}],Qh={idle:["A base está firme. Agora quero ver a mão voltar mais rápido.","Não é sobre bater forte. É sobre bater certo.","O ringue é um espelho. Ele mostra quem você realmente é.","Energia é seu bem mais valioso. Não desperdice nos primeiros rounds.","Eu já vi campeões nascerem aqui. Estou vendo um agora?","A guarda alta é o seu seguro de vida."]},eu=[{id:"latest",name:"Últimas"},{id:"results",name:"Resultados"},{id:"transfers",name:"Contratos"},{id:"upcoming",name:"Próximas Lutas"},{id:"title",name:"Campeonatos"},{id:"rankings",name:"Rankings"},{id:"rivalries",name:"Rivalidades"},{id:"records",name:"Recordes"},{id:"interviews",name:"Entrevistas"}],m_=[{id:"fighter",name:"Lutador do Ano",icon:"star"},{id:"ko",name:"Nocaute do Ano",icon:"fist"},{id:"fight",name:"Melhor Luta do Ano",icon:"fire"},{id:"prospect",name:"Revelação do Ano",icon:"spark"},{id:"champ",name:"Melhor Campeão",icon:"belt"},{id:"streak",name:"Melhor Sequência Invicta",icon:"bolt"},{id:"return",name:"Melhor Retorno",icon:"return"},{id:"defense",name:"Melhor Defesa de Cinturão",icon:"shield"},{id:"rivalry",name:"Maior Rivalidade",icon:"clash"},{id:"coach",name:"Melhor Treinador",icon:"coach"}],bp=[{id:"first_win",name:"Primeira Vitória",desc:"Vença sua primeira luta.",icon:"fist",coins:100},{id:"first_ko",name:"Nocauteador",desc:"Vença por nocaute.",icon:"ko",coins:150},{id:"streak5",name:"Imparável",desc:"Alcance 5 vitórias seguidas.",icon:"fire",coins:250},{id:"title",name:"Cinturão de Ouro",desc:"Conquiste um cinturão.",icon:"belt",coins:500},{id:"world",name:"Campeão Mundial",desc:"Conquiste um cinturão mundial.",icon:"globe",coins:1e3},{id:"top1",name:"O Homem no Topo",desc:"Alcance o topo do ranking.",icon:"crown",coins:800},{id:"ko10",name:"Mãos de Trovão",desc:"Alcance 10 nocautes na carreira.",icon:"bolt",coins:400},{id:"defend3",name:"Dinastia",desc:"Defenda um cinturão 3 vezes.",icon:"shield",coins:600},{id:"rich",name:"Magnata",desc:"Acumule 25.000 moedas.",icon:"coin",coins:300},{id:"traveler",name:"Cidadão do Mundo",desc:"Lute em 5 arenas diferentes.",icon:"plane",coins:300},{id:"undisputed",name:"Absoluto",desc:"Conquiste 3 cinturões mundiais.",icon:"trophy",coins:1500},{id:"legend",name:"Lenda Viva",desc:"Alcance reputação 100.",icon:"legend",coins:2e3}],ei={callout:["Ele diz que é o melhor? Eu vou provar que é só conversa.","Não vou deixar a luta chegar aos juízes. Acaba antes.","Eu vi medo nos olhos dele. Isso já é meio caminho.","Quando a campainha tocar, ele vai lembrar do meu nome para sempre.","Ele pode correr, mas não pode se esconder do meu direto.","Eu não vim para participar. Eu vim para dominar."],respectful:["Respeito o adversário. Mas o cinturão vai para casa comigo.","Será uma guerra. Estou pronto para cada segundo.","Ele é duro. Eu também. Que vença o melhor.","Não subestimo ninguém. Só não aceito perder."],win:["O trabalho não acabou. Isso foi só o começo.","Dedico essa vitória a todos que acreditaram em mim.","Eu avisei. Ninguém acreditou. Agora sabem.","Cada round foi uma declaração. E eu ainda estou escrevendo."],coach:["Esse garoto tem algo especial. Ele não recua diante da dor.","Ainda precisa polir a defesa, mas o coração é de campeão.","Eu treino campeões há 30 anos. Esse aqui me lembra por quê.","Ele já venceu a luta mais difícil: a que acontece dentro da cabeça."]},tu=["Senhoras e senhores... o momento que todos esperavam!","Uma noite de boxe. Um ringue. Dois guerreiros.","Preparados... para o espetáculo?"],_p={joystick:128,opacity:.8,side:"right",haptic:!0,buttons:132},nu=["Noite de Glória","Fúria no Ringue","Choque de Titãs","Destino de Campeões","Sangue e Aço","Trovão no Ringue","A Noite dos Gigantes","Arena em Chamas","Coração de Guerreiro","Último Round","Rei da Noite","Impacto Mundial","Guerra Total","Além do Limite","O Rugido do Leão"],iu=["TG FIGHT NIGHT","TG GOLDEN GLOVES","TG CHAMPIONS","TG WORLD SERIES","TG LEGACY"];function g_(i){return new Date(i).toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"}).replace(".","")}const gd="tgboxing.universe.v1",ci={handlers:new Map,on(i,e){return this.handlers.has(i)||this.handlers.set(i,new Set),this.handlers.get(i).add(e),()=>{var t;return(t=this.handlers.get(i))==null?void 0:t.delete(e)}},emit(i,e){for(const t of this.handlers.get(i)||[])try{t(e)}catch(n){console.error(n)}}},mr={hair:"hair10",beard:"none",brow:"b0",face:"square",eyes:"e0",nose:"n0",mouth:"m4",scar:"s0",skin:"sk5",height:.48,reach:.5,muscle:.58,width:.52,shorts:"shorts0",top:"none",shoe:"shoe0",robe:"robe0",glove:"glove0",colorway:"cw8",wrap:"none",headgear:"none",medal:"none",tattoo:"Nenhuma"},rr={sfx:.85,music:.4,crowd:.75,quality:"auto",autoSave:!0,muted:!1,controls:{..._p},difficulty:"pro",reducedMotion:!1,cameraShake:!0,showHints:!0,highContrast:!1};function xp(){return{strength:42,speed:42,stamina:42,precision:42,defense:42,reflexes:42,mobility:42,recovery:42,conditioning:42}}function v_({name:i="Kaito",nickname:e="The Rising Sun",nationality:t="BRA",division:n="middle",style:s="technical",appearance:a=mr,attributes:r=xp(),age:o=22}={}){const c=new Date,l=new Date(c.getFullYear(),c.getMonth(),c.getDate()+28);return{version:vp,createdAt:c.toISOString(),updatedAt:c.toISOString(),profile:{name:i,nickname:e,nationality:t,division:n,style:s,age:o,appearance:{...a},attributes:{...r},created:!0},career:{date:l.toISOString(),money:2500,coins:300,reputation:8,points:12,record:{w:0,l:0,d:0,ko:0},streak:0,bestStreak:0,belts:[],history:[],offers:[],news:[],rivalries:[],awards:[],achievements:[],trophies:[],foughtArenas:[],training:{sessionsLeft:4,totalSessions:0,fatigue:0,lastDrill:null},gym:{level:1,equipment:[],coach:"Basico"},sponsor:null,totalPurse:0,season:{year:c.getFullYear(),fights:0,wins:0,kos:0,defenses:0,bestWin:null},nextEvent:null,daysUntilFight:null,activeOffer:null,appliedMatches:[],boosters:{},rankHistory:[],beltHistory:[]},settings:{...rr,controls:{...rr.controls}},multiplayer:{history:[],lastCode:null,name:i,totalMatches:0,wins:0}}}function y_(){try{const i=localStorage.getItem(md);if(!i)return null;const e=JSON.parse(i);return!e||!e.profile?null:b_(e)}catch(i){return console.warn("Save load failed",i),null}}function b_(i){i.settings||(i.settings={...rr}),i.settings.controls={...rr.controls,...i.settings.controls||{}},i.settings={...rr,...i.settings,controls:i.settings.controls},i.career=i.career||{};const e=i.career;return e.record=e.record||{w:0,l:0,d:0,ko:0},e.history=e.history||[],e.news=e.news||[],e.offers=e.offers||[],e.belts=e.belts||[],e.rivalries=e.rivalries||[],e.awards=e.awards||[],e.achievements=e.achievements||[],e.trophies=e.trophies||[],e.foughtArenas=e.foughtArenas||[],e.rankHistory=e.rankHistory||[],e.beltHistory=e.beltHistory||[],e.training=e.training||{sessionsLeft:4,totalSessions:0,fatigue:0},e.gym=e.gym||{level:1,equipment:[],coach:"Basico"},e.season=e.season||{year:new Date().getFullYear(),fights:0,wins:0,kos:0,defenses:0,bestWin:null},e.appliedMatches=e.appliedMatches||[],e.boosters=e.boosters||{},e.activeOffer=e.activeOffer||null,i.multiplayer={history:[],lastCode:null,name:i.profile.name,totalMatches:0,wins:0,...i.multiplayer||{}},i.version=vp,i}function kl(i,{universe:e=null}={}){if(i)try{i.updatedAt=new Date().toISOString(),localStorage.setItem(md,JSON.stringify(i)),e&&localStorage.setItem(gd,JSON.stringify(e))}catch(t){console.warn("Save failed (quota?)",t),ci.emit("toast",{text:"Falha ao salvar. Armazenamento cheio?",type:"error"})}}function __(){try{const i=localStorage.getItem(gd);return i?JSON.parse(i):null}catch{return null}}function su(){localStorage.removeItem(md),localStorage.removeItem(gd)}let ms=null,Nl=null;function x_(i){Nl=i}function Mt(i,e=!1){if(i){if(e){ms&&(clearTimeout(ms),ms=null),kl(i,{universe:Nl});return}ms&&clearTimeout(ms),ms=setTimeout(()=>{ms=null,kl(i,{universe:Nl})},260)}}function M_(i){return 1.62+Ve((i==null?void 0:i.height)??.5,0,1)*.42}function S_(i){return Math.round(168+((i==null?void 0:i.reach)??.5)*30)}function gr(i){const e=Object.values(i||{});return e.length?Math.round(e.reduce((t,n)=>t+n,0)/e.length):0}function Un(i,e){if(!i)return;const t={id:"n"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),date:i.career.date,...e};return i.career.news.unshift(t),i.career.news.length>70&&(i.career.news.length=70),ci.emit("news",t),t}function kn(i,e){if(!i||i.career.achievements.includes(e))return!1;const t=bp.find(n=>n.id===e);return t?(i.career.achievements.push(e),i.career.coins+=t.coins||0,ci.emit("toast",{text:`Conquista: ${t.name} (+${t.coins||0} TG)`,type:"achievement",icon:t.icon}),ci.emit("achievement",t),!0):!1}function ko(i,e,t=""){i&&(i.career.coins=Math.max(0,i.career.coins+Math.round(e)),t&&ci.emit("economy",{amount:e,reason:t}))}function Mp(i,e){i&&(i.career.money=Math.max(0,i.career.money+Math.round(e)))}function Sp(i,e){if(!i)return;const t=new Date(i.career.date);t.setDate(t.getDate()+e),i.career.date=t.toISOString()}function Ns(i){if(!i)return null;const e=i.profile,t=i.career;return{id:"player",isPlayer:!0,name:e.name,nick:e.nickname,nationality:e.nationality,age:e.age,division:e.division,style:e.style,attributes:{...e.attributes},record:{...t.record},points:t.points,appearance:{...e.appearance},overall:gr(e.attributes),belts:t.belts}}function w_(i){var e,t;return((t=(e=i==null?void 0:i.career)==null?void 0:e.gym)==null?void 0:t.equipment)||[]}function E_(i,e){let t=0;for(const n of w_(i)){const s=qi.find(a=>a.id===n);s!=null&&s.boost&&(t+=s.boost[e]||0,t+=s.boost.all||0)}return t}const rn={},$c=new Map;function ct(i,e={}){var s;const t=[i,e.roughness??"",e.metalness??"",e.emissive||"",e.emissiveIntensity??"",e.transparent?1:0,e.opacity??"",e.side||"",((s=e.map)==null?void 0:s.uuid)||""].join("|");if($c.has(t))return $c.get(t);const n=new Dt({color:new Ue(i),roughness:e.roughness??.55,metalness:e.metalness??.04,map:e.map||null,emissive:new Ue(e.emissive||"#000000"),emissiveIntensity:e.emissiveIntensity??0,side:e.side||ri,transparent:e.transparent||!1,opacity:e.opacity??1});return $c.set(t,n),n}function Jn(i,e,t=5,n=10){const s=`cap-${i}-${e}-${t}-${n}`;return rn[s]||(rn[s]=new Wo(i,e,t,n)),rn[s]}function We(i=18,e=14,t=Math.PI*2){const n=`sph-${i}-${e}-${t}`;return rn[n]||(rn[n]=new Ti(1,i,e,0,t)),rn[n]}function Pt(){return rn.box||(rn.box=new Pn(1,1,1)),rn.box}function Yt(i,e,t,n=14,s=!1){const a=`cyl-${i}-${e}-${t}-${n}-${s}`;return rn[a]||(rn[a]=new Ln(i,e,t,n,1,s)),rn[a]}function _i(i,e,t=10,n=16,s=Math.PI*2){const a=`tor-${i}-${e}-${t}-${n}-${s}`;return rn[a]||(rn[a]=new Rn(i,e,t,n,s)),rn[a]}class ga{constructor(e={},{robe:t=!1,scale:n=1,quality:s="high"}={}){this.appearance={...e},this.quality=s,this.root=new vt,this.body=new vt,this.root.add(this.body),this.robeVisible=t,this.time=Math.random()*20,this.expression="neutral",this.hitFlash=0,this.pose={},this.target={},this.parts={},this.materials={},this.baseHeight=M_(this.appearance),this.scale=n*this.baseHeight/1.8,this.root.scale.setScalar(this.scale),this.reach=(S_(this.appearance)-168)/30,this.build(),this.setRobe(t),this.initPose()}build(){var de,me;const e=this.appearance,n=(ns.find(ce=>ce.id===e.skin)||ns[5]).color,s=.86+(e.width??.5)*.34,a=.82+(e.muscle??.5)*.42,r=ct(n,{roughness:.6}).clone();this.materials.skin=r;const o=ct(n,{roughness:.36}).clone();this.materials.skinShine=o;const c=Ci.find(ce=>ce.id===e.hair)||Ci[0],l=ct(c.color,{roughness:.82}),h=Rs.find(ce=>ce.id===e.brow)||Rs[0],d=Ls.find(ce=>ce.id===e.eyes)||Ls[0],u=Ds.find(ce=>ce.id===e.mouth)||Ds[0],p=Is.find(ce=>ce.id===e.nose)||Is[0],g=Ps.find(ce=>ce.id===e.face)||Ps[0],v=As.find(ce=>ce.id===e.beard)||As[0],m=ks.find(ce=>ce.id===e.scar)||ks[0],f=Ai.find(ce=>ce.id===e.shorts)||Ai[0],_=Li.find(ce=>ce.id===e.glove)||Li[0],b=Ri.find(ce=>ce.id===e.shoe)||Ri[0],M=Pi.find(ce=>ce.id===e.robe)||Pi[0],I=Ta.find(ce=>ce.id===e.top)||null,w=qn.find(ce=>ce.id===e.colorway)||qn[0],E=((de=w==null?void 0:w.colors)==null?void 0:de[1])||"#f2c14e",C=((me=w==null?void 0:w.colors)==null?void 0:me[2])||"#f5f5f4";this.shortsDef=f,this.gloveDef=_,this.shoeDef=b,this.robeDef=M,this.trimColor=C,this.accentColor=E;const U=this.body;U.position.y=.915;const y=new vt;y.position.y=0,U.add(y),this.parts.torso=y;const x=new q(We(20,16),r);x.scale.set(.315*s*a,.275,.2*s),x.position.y=.315,y.add(x),this.parts.chest=x;const N=new q(We(16,12),r);N.scale.set(.225*s,.2,.155*s),N.position.y=.06,y.add(N);for(const ce of[-1,1]){const fe=new q(We(14,10),o);fe.scale.set(.135*s*a,.1*a,.065),fe.position.set(ce*.115*s,.345,.155+.02*a),y.add(fe)}for(let ce=0;ce<3;ce++)for(const fe of[-1,1]){const Pe=new q(We(10,8),o);Pe.scale.set(.052*T_(a),.045,.028),Pe.position.set(fe*.062,.19-ce*.075,.16),y.add(Pe)}for(const ce of[-1,1]){const fe=new q(We(12,8),r);fe.scale.set(.06,.14,.05),fe.position.set(ce*.205*s,.1,.1),y.add(fe)}for(const ce of[-1,1]){const fe=new q(We(12,10),r);fe.scale.set(.09,.17,.1),fe.position.set(ce*.255*s,.25,-.01),y.add(fe)}const O=new q(Yt(.072,.083,.14,10),r);O.position.y=.53,y.add(O);const G=new vt;G.position.y=.615,y.add(G),this.parts.head=G;const F=g.id,R={oval:[1,1.12,1],square:[1.05,1.06,.98],round:[1.08,1,1.02],long:[.92,1.2,.95],diamond:[1,1.12,.94],angular:[1.02,1.08,1],heart:[1.06,1.1,.98],wide:[1.12,1.03,.98],narrow:[.9,1.13,.94],sculpted:[1.02,1.1,1]}[F]||[1,1.1,1],W=new q(We(20,16),r);W.scale.set(.132*R[0],.15*R[1],.128*R[2]),W.position.y=.1,G.add(W);const Y=new q(We(16,12),r);Y.scale.set(.112*R[0],.085,.108*R[2]),Y.position.set(0,.022,.018),G.add(Y);for(const ce of[-1,1]){const fe=new q(We(10,8),r);fe.scale.set(.022,.037,.018),fe.position.set(ce*.132*R[0],.075,0),G.add(fe)}const ie=new q(We(10,8),r),D=p.id==="n1"||p.id==="n4"||p.id==="n7";ie.scale.set((D?.028:.02)*(p.id==="n3"?1.1:1),p.id==="n6"?.055:.04,p.id==="n3"?.05:.034),ie.position.set(0,.075,.125*R[2]),(p.id==="n8"||p.id==="n9")&&(ie.rotation.x=-.3),G.add(ie);const P={e0:"#5a3b23",e1:"#25170f",e2:"#5b8fbf",e3:"#4e7d54",e4:"#d1a75e",e5:"#7c8a8c",e6:"#c98b33",e7:"#90713f",e8:"#a8d8e0",e9:"#c0502a",e10:"#1e1713",e11:"#9ac4cc",e12:"#8fbf6a",e13:"#3d2d22"}[d.id]||"#3a2618";this.eyeMat=ct(P,{roughness:.3}),this.eyeWhiteMat=ct("#f2efe8",{roughness:.35});const te=d.id==="e13"?.9:1;for(const ce of[-1,1]){const fe=new q(We(10,8),this.eyeWhiteMat);fe.scale.set(.024*te,.019,.012),fe.position.set(ce*.055,.105,.117*R[2]),G.add(fe);const Pe=new q(We(8,6),this.eyeMat);Pe.scale.set(.012,.012,.008),Pe.position.set(ce*.055,.105,.128*R[2]),G.add(Pe);const ke=new q(We(6,5),ct("#ffffff",{roughness:.1}));ke.scale.setScalar(.0035),ke.position.set(ce*.057,.109,.135*R[2]),G.add(ke)}this.browParts=[];for(const ce of[-1,1]){const fe=new q(Pt(),l),Pe=h.id==="b1"||h.id==="b13"?.018:.011;fe.scale.set(.052,Pe,.018),fe.position.set(ce*.057,.133,.122*R[2]),fe.rotation.z=ce*(h.id==="b3"?-.28:h.id==="b2"?-.16:.1),G.add(fe),this.browParts.push(fe)}const ae=new q(We(12,8),ct("#5c2d2b",{roughness:.5}));ae.scale.set(.042,.009,.012),ae.position.set(0,.005,.118*R[2]),(u.id==="m2"||u.id==="m12")&&(ae.scale.y=.02),(u.id==="m4"||u.id==="m10")&&(ae.scale.x=.05),G.add(ae),this.parts.mouth=ae;const $=new q(We(10,6),ct("#9b5b51",{roughness:.55}));$.scale.set(.044,.008,.008),$.position.set(0,.014,.124*R[2]),G.add($),this.parts.lips=$,this.hairParts=[],this.buildHair(G,c,l),this.buildBeard(G,v,l,r,R),m.id!=="s0"&&this.buildScar(G,m,R),e.headgear&&e.headgear!=="none"&&this.buildHeadgear(G,r,e.headgear);const Q=1+this.reach*.075;this.parts.arms={};for(const ce of[-1,1]){const fe=ce<0?"L":"R",Pe=new vt;Pe.position.set(ce*.29*s,.465,0),y.add(Pe);const ke=new q(We(12,10),o);ke.scale.set(.095*a,.095*a,.09),Pe.add(ke);const Oe=new q(Jn(.072*a,.18*Q,4,10),r);Oe.position.y=-.155*Q,Pe.add(Oe);const k=new vt;k.position.y=-.3*Q,Pe.add(k);const yt=new q(Jn(.059*a,.18*Q,4,10),r);yt.position.y=-.15*Q,k.add(yt);const Ge=new vt;Ge.position.y=-.3*Q,k.add(Ge);const Xe=ct("#efe7d6",{roughness:.8});if(e.wrap&&e.wrap!=="none"){const ot=new q(Yt(.063,.058,.09,10),e.wrap==="bandagem-ouro"?ct("#d4af37",{roughness:.5}):Xe);ot.position.y=-.015,Ge.add(ot);for(let ue=0;ue<3;ue++){const A=new q(_i(.061,.006,6,12),Xe);A.rotation.x=Math.PI/2,A.position.y=-.03+ue*.028,Ge.add(A)}}const De=this.buildGlove(ce,_,w);De.position.y=-.1,Ge.add(De),this.parts.arms[fe]={shoulder:Pe,elbow:k,wrist:Ge,glove:De}}this.buildShorts(U,f,E,C),this.parts.legs={};for(const ce of[-1,1]){const fe=ce<0?"L":"R",Pe=new vt;Pe.position.set(ce*.12*s,-.005,0),U.add(Pe);const ke=new q(Jn(.082,.3,4,10),r);ke.position.y=-.2,Pe.add(ke);const Oe=new vt;Oe.position.y=-.4,Pe.add(Oe);const k=new q(Jn(.058,.3,4,10),r);k.position.y=-.2,Oe.add(k);const yt=new vt;yt.position.y=-.4,Oe.add(yt),this.buildShoe(yt,b,w),this.parts.legs[fe]={hip:Pe,knee:Oe,foot:yt}}this.buildTop(y,I,w,s,a,r),this.buildRobe(U,M,w),this.buildMedal(y),this.buildTattoos(y,e),this.root.traverse(ce=>{ce.isMesh&&(ce.castShadow=!0,ce.receiveShadow=!0)}),this.parts.headGroup=G}buildHair(e,t,n){const s=t.shape,a=t.volume||1,r=(d,u=0,p=0,g=0,v=0,m=0,f=0)=>(d.position.set(u,p,g),d.rotation.set(v,m,f),e.add(d),this.hairParts.push(d),d);if(s==="bald"){const d=new q(We(18,12),ct("#2a1d16",{roughness:.95,transparent:!0,opacity:.35}));d.scale.set(.134,.09,.13),r(d,0,.145,-.005);return}const o=new Ti(1,20,12,0,Math.PI*2,0,Math.PI*.64),c=new q(o,n),l={buzz:[.137,.09,.13],fade:[.14,.11,.133],afro:[.195,.17,.19],curls:[.165,.145,.16],long:[.15,.12,.145],mohawk:[.1,.08,.115],ponytail:[.14,.11,.137],braids:[.142,.105,.138],slick:[.14,.108,.133],spiky:[.145,.1,.138],topknot:[.138,.1,.132],undercut:[.135,.09,.128],flat:[.145,.1,.138],dreads:[.145,.11,.14],wavy:[.155,.125,.15],sidepart:[.142,.115,.138],cloud:[.175,.14,.17],samurai:[.14,.11,.135],classic:[.142,.115,.138]}[s]||[.142,.1,.137];c.scale.set(l[0]*a,l[1]*a,l[2]*a),r(c,0,.148,-.005);const h=n;switch(s){case"afro":{for(let d=0;d<8;d++){const u=new q(We(10,8),h),p=d/8*Math.PI*2;u.scale.setScalar(.07*a+Math.random()*.02),r(u,Math.cos(p)*.115,.19+Math.sin(d)*.025,Math.sin(p)*.11-.01)}break}case"curls":{for(let d=0;d<14;d++){const u=new q(We(8,6),h),p=d/14*Math.PI*2;u.scale.setScalar(.038+d%3*.01),r(u,Math.cos(p)*(.08+d%3*.022),.215+d%4*.018,Math.sin(p)*.085-.01)}break}case"long":{const d=new q(Jn(.095,.17,4,10),h);d.scale.set(1.3,1.5,.6),r(d,0,.045,-.105,.12);for(const u of[-1,1]){const p=new q(Jn(.035,.12,4,8),h);r(p,u*.115,.015,-.03,.05,0,u*.08)}break}case"mohawk":{for(let d=0;d<7;d++){const u=new q(new Cs(.033,.1,5),h);r(u,0,.24,.09-d*.028,.3*Math.sin(d))}break}case"ponytail":{const d=new q(We(8,6),h);d.scale.setScalar(.05),r(d,0,.21,-.12);const u=new q(Jn(.035,.12,4,8),h);u.scale.set(1,1.4,1),r(u,0,.1,-.16,.45);break}case"braids":{for(let d=0;d<6;d++){const u=new q(Jn(.013,.16+d%3*.03,3,6),h);r(u,-.12+d*.048,-.01,-.12,.15,0,(d-2.5)*.03)}break}case"spiky":{for(let d=0;d<8;d++){const u=new q(new Cs(.028,.075,5),h),p=d/8*Math.PI*2;r(u,Math.cos(p)*.075,.24+d%3*.008,Math.sin(p)*.075,Math.sin(p)*.4,0,-Math.cos(p)*.4)}break}case"topknot":{const d=new q(We(10,8),h);d.scale.set(.062,.05,.062),r(d,0,.26,-.02);break}case"undercut":{const d=new q(We(14,8),h);d.scale.set(.148,.045,.14),r(d,0,.17,-.01);break}case"flat":{const d=new q(Pt(),h);d.scale.set(.22,.075,.19),r(d,0,.255,-.005);break}case"dreads":{for(let d=0;d<9;d++){const u=new q(Jn(.018,.18+d%4*.04,3,6),h);r(u,-.15+d%5*.07,-.03,-.12-d%3*.015,.1+d%3*.08)}break}case"wavy":{for(let d=0;d<5;d++){const u=new q(We(10,8),h);u.scale.set(.075,.05,.05),r(u,-.1+d*.05,.235,.03*Math.sin(d),0,0,.3)}break}case"sidepart":{const d=new q(Pt(),h);d.scale.set(.11,.055,.07),r(d,.06,.235,.04,.1,0,-.18);const u=new q(We(10,8),h);u.scale.set(.15,.05,.1),r(u,-.01,.23,.06,0,0,.12);break}case"cloud":{for(let d=0;d<5;d++){const u=new q(We(10,8),h);u.scale.set(.08,.065,.075),r(u,-.1+d*.05,.24,.015*Math.cos(d),0,0,.2)}break}case"samurai":{const d=new q(We(8,8),h);d.scale.setScalar(.045),r(d,0,.245,-.1);const u=new q(Yt(.145,.145,.035,16,!0),ct("#f5f5f4",{roughness:.8}));r(u,0,.205,-.005);break}case"classic":{const d=new q(We(10,8),h);d.scale.set(.06,.045,.08),r(d,-.11,.19,.02,0,0,.3);break}case"slick":{for(let d=0;d<4;d++){const u=new q(Pt(),h);u.scale.set(.02,.004,.15),r(u,-.08+d*.05,.245,.02,-.1)}break}case"fade":{const d=new q(Yt(.14,.135,.055,18,!0),h);r(d,0,.155,-.005);break}}}buildBeard(e,t,n,s,a){this.beardParts=[];const r=(c,l,h,d,u=0,p=0,g=0,v=1,m=1,f=1)=>(c.position.set(l,h,d),c.rotation.set(u,p,g),c.scale.set(v,m,f),e.add(c),this.beardParts.push(c),c);if(t.shape==="none")return;const o=t.shape==="stubble"?ct("#2a1c14",{roughness:.95,transparent:!0,opacity:.45}):n;switch(t.shape){case"mustache":{const c=new q(Pt(),o);r(c,0,.045,.123,0,0,0,.075,.014,.014);break}case"goatee":{const c=new q(Pt(),o);r(c,0,.048,.124,0,0,0,.06,.012,.012);const l=new q(We(8,6),o);r(l,0,-.045,.105,0,0,0,.036,.05,.03);break}case"soul":{const c=new q(We(8,6),o);r(c,0,-.03,.12,0,0,0,.025,.03,.012);break}case"chin":{const c=new q(We(10,8),o);r(c,0,-.035,.095,0,0,0,.066,.07,.045);break}case"chinstrap":{const c=new q(_i(.112,.014,6,18,Math.PI),o);r(c,0,-.02,.01,.1,0,0,1,1.1,1);break}case"horseshoe":case"walrus":case"imperial":case"english":{const c=new q(Pt(),o);if(r(c,0,.044,.126,0,0,0,t.shape==="walrus"?.1:.08,.018,.016),t.shape==="horseshoe")for(const l of[-1,1]){const h=new q(Pt(),o);r(h,l*.055,.005,.122,0,0,0,.02,.07,.012)}break}case"long":case"bandholz":case"garibaldi":case"wizard":{const c=new q(We(12,10),o);r(c,0,-.02,.075,.1,0,0,.125,.15,.085);const l=new q(Jn(.045,.06,3,6),o);r(l,0,-.14,.07,.2);const h=new q(Pt(),o);r(h,0,.047,.126,0,0,0,.09,.016,.014);break}case"mutton":case"friendly":{for(const l of[-1,1]){const h=new q(We(10,8),o);r(h,l*.105,.02,.055,0,0,0,.045,.09,.035)}const c=new q(We(10,8),o);r(c,0,-.04,.09,0,0,0,.08,.06,.04);break}case"vandyke":case"anchor":case"balbo":case"ducktail":{const c=new q(We(10,8),o);r(c,0,-.035,.105,0,0,0,.045,.055,.03);const l=new q(Pt(),o);if(r(l,0,.05,.124,0,0,0,.07,.013,.012),t.shape==="anchor"||t.shape==="ducktail")for(const h of[-1,1]){const d=new q(Pt(),o);r(d,h*.07,.035,.114,0,0,h*.4,.012,.07,.01)}break}case"extended":{const c=new q(Pt(),o);r(c,0,.044,.128,0,0,0,.13,.015,.02);break}case"shortbox":case"hollywood":case"circle":{const c=new q(We(10,8),o);if(r(c,0,-.01,.095,0,0,0,t.shape==="circle"?.105:.09,.1,.06),t.shape==="shortbox"){const l=new q(Pt(),o);r(l,0,.047,.126,0,0,0,.075,.014,.012)}break}case"stubble":{const c=new q(We(14,10),o);r(c,0,-.01,.07,0,0,0,.118,.12,.085);break}case"full":default:{const c=new q(We(14,10),o);r(c,0,-.02,.07,0,0,0,.115,.115,.08);const l=new q(Pt(),o);r(l,0,.047,.126,0,0,0,.09,.015,.013)}}}buildScar(e,t,n){const s=ct("#a7574c",{roughness:.7}),a=(r,o,c,l=0,h=.05)=>{const d=new q(Pt(),s);d.scale.set(.005,h,.004),d.position.set(r,o,c),d.rotation.z=l,e.add(d)};(t.id==="s1"||t.id==="s7")&&a(-.065,.13,.13,.4,.06),(t.id==="s2"||t.id==="s7")&&a(.075,.03,.118,-.4,.055),t.id==="s3"&&a(0,-.04,.12,.1,.045),t.id==="s4"&&a(-.04,.17,.115,-.2,.04),t.id==="s5"&&a(.02,.085,.142,.05,.035),t.id==="s6"&&(a(-.07,.11,.128,.5,.07),a(.06,.04,.125,-.3,.06)),t.id==="s8"&&a(.035,.005,.125,.2,.03),t.id==="s9"&&a(-.11,.09,.055,.4,.045),t.id==="s10"&&a(-.05,.115,.131,.1,.028),t.id==="s11"&&(a(.09,.14,.1,-.3,.07),a(-.08,-.01,.11,.5,.045))}buildHeadgear(e,t,n){const s={"clássico-preto":"#171717","vermelho-competição":"#7f1d1d","azul-amador":"#1e3a8a","dourado-elite":"#a16207","branco-minimal":"#e5e7eb"},a=Object.keys(s).find(c=>n.includes(c.split("-")[0]))||"clássico-preto",r=ct(s[a],{roughness:.5}),o=new q(_i(.115,.022,8,20,Math.PI*1.65),r);o.position.set(0,.13,.01),o.rotation.set(0,0,Math.PI*.18),e.add(o);for(const c of[-1,1]){const l=new q(We(10,8),r);l.scale.set(.055,.09,.03),l.position.set(c*.11,.04,.055),e.add(l)}}buildGlove(e,t,n){const s=new vt,a=t.colors[0],r=t.colors[1]||"#111111",o=t.colors[2]||"#f5f5f4",c=ct(a,{roughness:.36}),l=ct(r,{roughness:.5}),h=ct(o,{roughness:.4}),d=t.model,u=new q(Yt(.07,.078,.1,12),l);u.position.y=.01,s.add(u);const p=new q(_i(.071,.007,6,14),h);p.rotation.x=Math.PI/2,p.position.y=.03,s.add(p);const g=new q(We(18,14),c),v=d==="power"||d==="classic"||d==="elite"?1.1:d==="compact"||d==="speed"?.9:1;g.scale.set(.098*v,.135*v,.105*v),g.position.set(0,-.115,.012),s.add(g);const m=new q(We(10,8),c);m.scale.set(.042,.06,.045),m.position.set(e*.058,-.1,.06),s.add(m);const f=new q(_i(.075,.008,6,14),h);if(f.rotation.x=Math.PI/2,f.position.y=-.02,s.add(f),t.model==="laced"||t.model==="heritage"){const _=new q(Pt(),h);_.scale.set(.012,.1,.01),_.position.set(0,-.12,.108),s.add(_)}return s.userData.mainColor=a,s}buildShorts(e,t,n,s){const a=t.colors,r=Bc(a,t.pattern,`shorts-${t.id}`),o=ct("#ffffff",{roughness:.57,map:r}),c=ct(s,{roughness:.5}),l=ct(n,{roughness:.45}),h={classic:.34,long:.42,short:.28,high:.36,split:.35,satin:.34,taped:.32,boxer:.36,muay:.3,retro:.32,pro:.35,heritage:.34}[t.model]||.34,d=new vt;d.position.y=-.02,e.add(d);const u=new q(Yt(.245,.3,h,18,!0),o);u.scale.z=.86,u.position.y=.09-h/2,d.add(u);const p=new q(Yt(.253,.253,.075,18),c);p.scale.z=.86,p.position.y=.105,d.add(p);const g=new q(Yt(.256,.256,.018,18,!0),l);g.scale.z=.86,g.position.y=.084,d.add(g);for(const v of[-1,1]){const m=new q(Yt(.135,.145,h*.5,12,!0),o);m.position.set(v*.115,.09-h*.75,0),m.scale.z=.94,d.add(m);const f=new q(_i(.138,.008,6,14),l);f.rotation.x=Math.PI/2,f.position.set(v*.115,.09-h,0),f.scale.z=.94,d.add(f)}if(["split","taped","pro","muay"].includes(t.model))for(const v of[-1,1]){const m=new q(Pt(),l);m.scale.set(.014,h*.85,.02),m.position.set(v*.29,.09-h*.5,0),d.add(m)}this.shortsGroup=d}buildShoe(e,t,n){const s=new vt,a=t.colors[0],r="#121212",o=t.colors[1]||"#f5f5f4",c=ct(a,{roughness:.48}),l=ct(r,{roughness:.8}),h=ct(o,{roughness:.4}),d=t.model==="high"||t.model==="boxing"||t.model==="champ",u=new q(Pt(),c);u.scale.set(.115,.075,.235),u.position.set(0,-.02,.055),u.geometry=rn.box,s.add(u);const p=new q(We(12,8),c);p.scale.set(.058,.045,.075),p.position.set(0,-.015,.155),s.add(p);const g=new q(Pt(),l);if(g.scale.set(.12,.022,.25),g.position.set(0,-.055,.055),s.add(g),d){const f=new q(Yt(.062,.055,.09,10,!0),c);f.position.set(0,.03,-.015),s.add(f)}const v=new q(Pt(),h);v.scale.set(.12,.015,.02),v.position.set(0,0,.06),s.add(v);const m=ct("#f5f5f4",{roughness:.8});for(let f=0;f<3;f++){const _=new q(Pt(),m);_.scale.set(.06,.007,.008),_.position.set(0,.014,.02+f*.035),s.add(_)}this.shoeGroup=s}buildTop(e,t,n,s,a,r){if(!t||t.id==="none")return;const o=Bc(t.colors,t.pattern,`top-${t.id}`),c=ct("#ffffff",{roughness:.68,map:o}),l=new vt,h=new q(Yt(.33*s,.25*s,.5,16,!0),c);h.position.y=.28,h.scale.z=.78,l.add(h),t.model==="compression"&&h.scale.set(.98,1,.76),t.model==="loose"&&h.scale.set(1.08,1.05,.84),t.model==="crop"&&(h.scale.y=.62),e.add(l),this.topGroup=l}buildRobe(e,t,n){const s=Bc(t.colors,t.pattern,`robe-${t.id}`),a=ct("#ffffff",{roughness:.34,map:s}),r=ct(t.colors[1]||"#f2c14e",{roughness:.35}),o=new vt,c=new q(Yt(.34,.46,1,18,!0),a);c.position.y=.34,c.scale.z=.8,o.add(c);const l=new q(Yt(.36,.5,.08,18,!0),r);l.position.y=.82,o.add(l);const h=new q(Yt(.35,.35,.075,18),r);h.position.y=.35,h.scale.z=.8,o.add(h);for(const d of[-1,1]){const u=new q(Yt(.11,.14,.45,12,!0),a);u.position.set(d*.4,.45,0),u.rotation.z=d*.12,o.add(u)}if(t.model==="hood"||t.model==="royal"){const d=new q(Yt(.19,.24,.24,14,!0),a);d.position.set(0,.78,-.08),o.add(d)}o.visible=!1,e.add(o),this.robeGroup=o}buildMedal(e){if(!this.appearance.medal||this.appearance.medal==="none")return;const t=yp.find(o=>o===this.appearance.medal);if(!t)return;const n=t.includes("Ouro")?"#f2c14e":t.includes("Prata")?"#cbd5e1":t.includes("Bronze")?"#b45309":"#f2c14e",s=ct("#d4af37",{roughness:.25,metalness:.8}),a=new q(_i(.12,.006,4,20),s);a.position.set(0,.4,.15),a.rotation.x=Math.PI*.12,e.add(a);const r=new q(Yt(.04,.04,.012,16),ct(n,{roughness:.25,metalness:.7}));r.rotation.x=Math.PI/2,r.position.set(0,.28,.19),e.add(r)}buildTattoos(e,t){if(!t.tattoo||t.tattoo==="Nenhuma")return;const n=ct("#1b1b1f",{roughness:.85});if(["Dragão","Cobra","Asas","Leão"].includes(t.tattoo)){const s=new q(We(12,8),n);s.scale.set(.09,.12,.012),s.position.set(.17,.33,.135),e.add(s);const a=new q(_i(.05,.012,4,12,Math.PI),n);a.position.set(.17,.37,.15),a.rotation.z=.4,e.add(a)}else{const s=new q(_i(.09,.008,4,14,Math.PI*1.2),n);s.position.set(-.16,.3,.145),s.rotation.z=.3,e.add(s)}}setRobe(e){this.robeVisible=e,this.robeGroup&&(this.robeGroup.visible=e)}setExpression(e){if(this.expression===e)return;this.expression=e;const t=e==="angry"||e==="shout"||e==="focused",n=e==="hurt"||e==="tired";for(const[s,a]of(this.browParts||[]).entries()){const r=s===0?-1:1;a.rotation.z=t?r*.28:n?r*-.2:r*.1,a.position.y=t?.128:n?.138:.133}if(this.parts.mouth){const s=this.parts.mouth;s.scale.set(e==="shout"?.055:e==="hurt"?.05:.042,e==="shout"||e==="hurt"?.028:e==="happy"?.012:.009,.012),s.position.y=e==="happy"?.006:.005}for(const s of[]);this.expressionType=e}flash(e="#ff6b4a"){this.hitFlash=.24,this.flashColor=e}initPose(){const e={bodyX:.02,bodyY:0,bodyZ:0,bob:0,torsoX:.06,torsoY:.12,torsoZ:0,headX:.04,headY:0,headZ:0,shLX:-1.02,shLY:-.24,shLZ:.15,elL:-1.62,shRX:-1.08,shRY:.24,shRZ:-.15,elR:-1.68,hipLX:-.14,hipLZ:.03,kneeL:.22,hipRX:.12,hipRZ:-.03,kneeR:.18,rootX:0,rootY:0,rootZ:0,rootRotX:0};this.basePose={...e},this.pose={...e},this.target={...e}}update(e,t={}){this.time+=e;const n=this.time,s={...this.basePose},a=t.stamina??100,r=Math.min(1,Math.abs(t.moveX||0)+Math.abs(t.moveZ||0)),o=a<28,c=o?1.7:1;s.bob=Math.sin(n*2.2*c)*(o?.012:.007),s.bodyY=Math.sin(n*1.3)*.015,s.rootX=Math.sin(n*1.1)*.008,s.torsoX=.06+(o?.06:0),s.headX=.04+Math.sin(n*1.7)*.018,s.headY=Math.sin(n*.8)*.035,s.shLX=-1.02+Math.sin(n*2.1)*.02,s.shRX=-1.08+Math.sin(n*2.1+.4)*.02,o&&(s.shLX+=.22,s.shRX+=.25,s.elL+=.15,s.elR+=.15);const l=Math.sin(n*9)*.25*r;if(s.hipLX=-.14-l*(t.moveZ||0)*.7+Math.abs(t.moveX||0)*.05,s.hipRX=.12-l*(t.moveZ||0)*.7-Math.abs(t.moveX||0)*.05,s.kneeL=.22+Math.abs(l)*.16,s.kneeR=.18+Math.abs(l)*.16,s.rootX+=(t.moveX||0)*.04,s.rootY+=Math.abs(Math.sin(n*9))*.012*r,s.torsoZ=(t.moveX||0)*-.05,t.blocking&&(s.shLX=-1.42,s.shRX=-1.48,s.shLY=.42,s.shRY=-.42,s.elL=-2.12,s.elR=-2.16,s.torsoX=.12,s.headX=.11,s.hipLX=-.08,s.hipRX=.08,s.kneeL=.28,s.kneeR=.26),t.dodging){const d=t.dodgeDir||1;s.bodyZ=d*.38,s.torsoZ=d*.18,s.headZ=d*.12,s.torsoX=-.04,s.rootX+=d*.09,s.hipLX-=d*.1,s.hipRX-=d*.1}if(t.action&&t.action!=="idle"&&t.actionDur){const d=Ve((t.actionTime||0)/t.actionDur,0,1),u=C_(d),p=Ve(d/.28,0,1)*(1-Ve((d-.25)/.2,0,1));this.applyPunchPose(s,t.action,u,p,o),(t.action==="jab"||t.action==="cross")&&(s.torsoX+=u*.08)}if(t.stun>0){const d=Ve(t.stun,0,1);s.headX=-.2*d-.05,s.torsoX=-.1*d,s.bodyZ=Math.sin(n*22)*.08*d,s.shLX+=.3*d,s.shRX+=.34*d}if(t.knockedDown){const d=Ve(t.fallProgress??1,0,1);s.rootRotX=-Math.PI/2*ar(d),s.rootY=-.6*ar(d),s.torsoX=.05,s.headX=.1,s.shLX=-2,s.shRX=-1.7,s.elL=-.2,s.elR=-.3,s.shLY=.5,s.shRY=-.5,s.hipLX=-.35,s.hipRX=.25,s.kneeL=.6,s.kneeR=.4,s.bodyZ=.1}if(t.victory){const d=Math.abs(Math.sin(n*3.2));s.shLX=-2.85,s.shRX=-2.75,s.elL=-.25,s.elR=-.3,s.shLY=-.25,s.shRY=.25,s.headX=-.12,s.torsoX=-.02,s.rootY=d*.04,s.hipLX=-.05,s.hipRX=.05,s.kneeL=.08,s.kneeR=.08}t.defeated&&(s.torsoX=.16,s.headX=.22,s.shLX+=.4,s.shRX+=.4,s.rootY=0),t.entrance&&(s.rootX=Math.sin(n*4)*.03,s.shRX=-2.6+Math.sin(n*4)*.2,s.torsoY=Math.sin(n*4)*.05,s.hipLX=-.1-Math.sin(n*6)*.25,s.hipRX=.1+Math.sin(n*6)*.25,s.rootY=Math.abs(Math.sin(n*6))*.015);const h=t.action&&t.action!=="idle"?32:t.knockedDown?12:16;for(const d of Object.keys(s))typeof s[d]=="number"&&(this.pose[d]=En(this.pose[d]??s[d],s[d],h,e));if(this.applyPose(),this.hitFlash>0){this.hitFlash=Math.max(0,this.hitFlash-e);const d=this.hitFlash/.24,u=new Ue(this.flashColor||"#ff6b4a");this.materials.skin.emissive=u,this.materials.skin.emissiveIntensity=d*.45,this.materials.skinShine.emissive=u,this.materials.skinShine.emissiveIntensity=d*.5}else this.materials.skin.emissiveIntensity!==0&&(this.materials.skin.emissiveIntensity=0,this.materials.skinShine.emissiveIntensity=0)}applyPunchPose(e,t,n,s,a){const r=a?.1:0;switch(t){case"jab":e.shLX=Je(-1.02,-1.58,n)+s*.18+r,e.shLY=Je(-.24,.02,n),e.shLZ=Je(.15,.02,n),e.elL=Je(-1.62,-.12,n),e.torsoY=.12+n*.14,e.headX+=n*.04;break;case"cross":e.shRX=Je(-1.08,-1.65,n)+s*.2+r,e.shRY=Je(.24,-.04,n),e.shRZ=Je(-.15,-.02,n),e.elR=Je(-1.68,-.1,n),e.torsoY=.12-n*.24,e.shLX+=n*-.05,e.elL+=n*.2;break;case"hook":e.shRX=Je(-1.08,-1.38,n),e.shRY=Je(.24,-1,n),e.shRZ=Je(-.15,-.45,n),e.elR=Je(-1.68,-1.55,n),e.torsoY=.12+n*.36,e.bodyZ=-n*.08,e.shLX+=n*.18;break;case"uppercut":e.shRX=Je(-1.08,-.55,n),e.shRY=Je(.24,.1,n),e.shRZ=Je(-.15,.02,n),e.elR=Je(-1.68,-2.45,n),e.torsoX=.06+n*.22,e.torsoY=.12-n*.2,e.headX+=n*.12,e.kneeL+=n*.12,e.kneeR+=n*.1;break;case"body":e.shRX=Je(-1.08,-1.1,n),e.elR=Je(-1.68,-1.9,n),e.torsoX=.06+n*.22,e.headX+=n*.1;break}}applyPose(){var r;const e=this.pose;this.body.position.set(e.rootX,.915+(e.rootY||0),e.rootZ||0),this.body.rotation.set(e.rootRotX||0,e.bodyY||0,e.bodyZ||0),this.parts.torso.rotation.set(e.torsoX,e.torsoY,e.torsoZ),this.parts.torso.position.y=e.bob||0,this.parts.head.rotation.set(e.headX,e.headY,e.headZ);const t=this.parts.arms.L,n=this.parts.arms.R;t.shoulder.rotation.set(e.shLX,e.shLY,e.shLZ),n.shoulder.rotation.set(e.shRX,e.shRY,e.shRZ),t.elbow.rotation.x=e.elL,n.elbow.rotation.x=e.elR;const s=this.parts.legs.L,a=this.parts.legs.R;s.hip.rotation.set(e.hipLX,0,e.hipLZ),a.hip.rotation.set(e.hipRX,0,e.hipRZ),s.knee.rotation.x=e.kneeL,a.knee.rotation.x=e.kneeR,(r=this.robeGroup)!=null&&r.visible&&this.robeGroup.rotation.set(e.rootRotX||0,e.bodyY||0,e.bodyZ||0)}getGloveWorld(e="R"){const t=this.parts.arms[e].glove;return t.updateWorldMatrix(!0,!1),new L().setFromMatrixPosition(t.matrixWorld)}getHeadWorld(){return this.parts.head.updateWorldMatrix(!0,!1),new L().setFromMatrixPosition(this.parts.head.matrixWorld).add(new L(0,.1*this.scale,0))}getRenderState(){var e;return{pose:{...this.pose},expression:this.expression,robe:(e=this.robeGroup)==null?void 0:e.visible,visible:this.root.visible}}applyRenderState(e){e&&(this.pose={...e.pose},this.setExpression(e.expression),this.robeGroup&&(this.robeGroup.visible=!!e.robe),this.root.visible=e.visible!==!1,this.applyPose())}dispose(){this.root.traverse(e=>{e.isMesh}),this.root.removeFromParent()}}function T_(i){return .7+i*.5}function C_(i){return i<.22?ar(i/.22)*.55:i<.42?.55+ar((i-.22)/.2)*.45:i<.62?1:1-ar((i-.62)/.38)}function Ol(i="referee"){const e=new ga({skin:"sk5",hair:"hair44",beard:"none",brow:"b0",face:"square",eyes:"e0",nose:"n0",mouth:"m1",scar:"s0",height:.46,reach:.5,muscle:.35,width:.5,shorts:"shorts68",top:"none",shoe:"shoe40",robe:"robe0",glove:"glove0",colorway:"cw28",wrap:"none",headgear:"none",medal:"none"},{robe:!1});if(i==="referee"){const t=document.createElement("canvas");t.width=256,t.height=256;const n=t.getContext("2d");n.fillStyle="#f5f5f4",n.fillRect(0,0,256,256),n.fillStyle="#111";for(let o=0;o<8;o++)n.fillRect(o*32,0,16,256);const s=new hp(t);s.colorSpace=Tn;const a=new Dt({map:s,roughness:.8}),r=new q(new Ln(.34,.27,.52,16,1,!0),a);r.position.y=.28,r.scale.z=.8,e.parts.torso.add(r),e.parts.arms.L.glove.visible=!1,e.parts.arms.R.glove.visible=!1}return e}function A_(i){const e=new vt,t=new q(new Rn(.58,.06,8,40,Math.PI*1.55),new Dt({color:"#2a1212",roughness:.7}));t.rotation.z=Math.PI*.72,e.add(t);const n=new Dt({map:Zb(i),color:"#ffffff",metalness:.75,roughness:.28}),s=new q(new Ln(.37,.37,.045,32),n);s.rotation.x=Math.PI/2,s.position.set(0,.03,.02),e.add(s);for(const a of[-1,1]){const r=new q(new Ln(.17,.17,.035,24),n);r.rotation.x=Math.PI/2,r.position.set(a*.62,-.02,0),e.add(r)}return e.scale.setScalar(.9),e}const R_=new L(0,1,0);function Ze(i,e={}){return new Dt({color:new Ue(i),roughness:e.roughness??.7,metalness:e.metalness??.05,emissive:new Ue(e.emissive||"#000000"),emissiveIntensity:e.emissiveIntensity??0,map:e.map||null,transparent:e.transparent||!1,opacity:e.opacity??1,side:e.side||ri,depthWrite:e.depthWrite??!0})}function Cn(i,e,t,n,s,a,r,o,c=!1,l=!0){const h=new q(new Pn(e,t,n),s);return h.position.set(a,r,o),h.castShadow=c,h.receiveShadow=l,i.add(h),h}function Kt(i,e,t,n,s,a,r,o,c=16,l=!1){const h=new q(new Ln(e,t,n,c),s);return h.position.set(a,r,o),h.castShadow=l,h.receiveShadow=!0,i.add(h),h}function Ca(i,e,t,n,s,a,r,o=0,c=0,l=0){const h=new q(new as(e,t),n);return h.position.set(s,a,r),h.rotation.set(o,c,l),i.add(h),h}class P_{constructor(e,t,n="high",s="#f2c14e"){this.scene=e,this.config=t;const a=n==="low",r=t.crowd??.8,o=Math.floor((a?220:560)*(.35+r*.65));this.count=o,this.base=[];const c=new Wo(.11,.24,2,6),l=new Ti(.085,6,5),h=new Dt({roughness:.9,vertexColors:!0}),d=new Dt({roughness:.9});this.bodies=new kh(c,h,o),this.heads=new kh(l,d,o),this.bodies.instanceMatrix.setUsage($d),this.heads.instanceMatrix.setUsage($d),this.bodies.receiveShadow=!1,this.heads.receiveShadow=!1,this.bodies.castShadow=!1,this.heads.castShadow=!1;const u=[s,"#f5f5f4","#c1121f","#1d4ed8","#111111","#f97316","#a855f7","#22c55e"],p=L_(90210);let g=0,v=0;for(;g<o&&v++<o*8;){const b=g%3,M=5.8+b*1.9+g%7*.15,I=p()*Math.PI*2;if(Math.cos(I)>.66)continue;const E=Math.floor(p()*3),C=Math.sin(I)*(M+E*.5),U=Math.cos(I)*(M+E*.5)-.4,y=-.72+b*.62+E*.08,x=.82+p()*.35;this.base.push({x:C,y,z:U,phase:p()*Math.PI*2,speed:.7+p()*1.2,amp:.02+p()*.035,angle:I,scale:x});const N=new Ue(u[Math.floor(p()*u.length)]);N.offsetHSL(0,0,(p()-.5)*.18),this.bodies.setColorAt(g,N),this.heads.setColorAt(g,new Ue().setHSL(.07+p()*.02,.35,.35+p()*.35)),g++}this.bodies.count=g,this.heads.count=g,e.add(this.bodies),e.add(this.heads),this.time=0,this.cheer=.3;const m=Math.floor(g*.35),f=new Float32Array(m*3);for(let b=0;b<m;b++){const M=this.base[Math.floor(p()*g)];f[b*3]=M.x+(p()-.5)*.12,f[b*3+1]=M.y+.5+p()*.15,f[b*3+2]=M.z+(p()-.5)*.12}const _=new Ct;_.setAttribute("position",new Wt(f,3)),this.phones=new fr(_,new Ea({color:"#fff3c4",size:.045,transparent:!0,opacity:.85,blending:yn,depthWrite:!1})),e.add(this.phones),this.update(0,.3)}update(e,t=.3){this.time+=e,this.cheer=t;const n=new lt,s=new Pa,a=new L,r=new L,o=this.time;for(let c=0;c<this.bodies.count;c++){const l=this.base[c],h=Math.sin(o*l.speed*2+l.phase)*l.amp*(1+t*1.6),d=Math.sin(o*.8+l.phase)*.012,u=t>.6&&Math.sin(o*3+l.phase)>.6?.09:0;r.set(l.x+d,l.y+.22+h+u,l.z),a.set(l.scale,l.scale*(1+t*.05),l.scale),s.setFromAxisAngle(R_,Math.sin(o*.4+l.phase)*.12),n.compose(r,s,a),this.bodies.setMatrixAt(c,n),r.y=l.y+.53+h+u*1.3,n.compose(r,s,a),this.heads.setMatrixAt(c,n)}this.bodies.instanceMatrix.needsUpdate=!0,this.heads.instanceMatrix.needsUpdate=!0,this.phones&&(this.phones.material.opacity=.55+Math.sin(this.time*5)*.15+t*.2)}dispose(){this.scene.remove(this.bodies,this.heads,this.phones),this.bodies.geometry.dispose(),this.heads.geometry.dispose(),this.bodies.material.dispose(),this.heads.material.dispose(),this.phones&&this.phones.geometry.dispose()}}function L_(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function wp({accent:i="#f2c14e",accent2:e="#111827",matColor:t="#1a1a20",ropes:n=["#dc2626","#f5f5f4","#2563eb"],arenaId:s="default"}={}){const a=new vt,r=new vt,o=6.4,c=new Dt({map:jb({id:s,accent:i,mat:t}),roughness:.85,metalness:.02});Cn(r,o,.12,o,c,0,-.06,0,!1,!0);const l=new Dt({map:Yb({id:s,accent:i,accent2:e}),roughness:.8});Cn(r,o+.02,.78,o+.02,Ze(e,{roughness:.9}),0,-.51,0,!1,!0);for(const[g,v,m]of[[0,o/2+.012,0],[0,-o/2-.012,Math.PI],[o/2+.012,0,Math.PI/2],[-o/2-.012,0,-Math.PI/2]])Ca(r,o,.62,l,g,-.45,v,0,m,0);Cn(r,o+.3,.06,o+.3,Ze("#0c0c12",{roughness:.65}),0,-.92,0,!1,!0);const h=Ze("#17171d",{roughness:.4,metalness:.5}),d=[n[0],n[2],n[0],n[2]];[[-o/2,-o/2],[o/2,-o/2],[-o/2,o/2],[o/2,o/2]].forEach(([g,v],m)=>{Kt(r,.085,.085,1.55,h,g,.72,v,12,!0),Kt(r,.11,.11,.55,Ze(d[m],{roughness:.55}),g,1.18,v,12,!0),Kt(r,.13,.13,.17,Ze(n[1],{roughness:.7}),g,.9,v,12);const f=Kt(r,.09,.09,.2,Ze(n[1],{roughness:.5}),g,.43,v,10);f.rotation.z=Math.PI/2});for(let g=0;g<3;g++){const v=.38+g*.36,m=Ze(n[g]||"#f5f5f4",{roughness:.35});for(const f of[-1,1])Kt(r,.018,.018,o,m,0,v,f*o/2,8).rotation.z=Math.PI/2,Kt(r,.018,.018,o,m,f*o/2,v,0,8).rotation.x=Math.PI/2}const p=Ze("#8b1e1e",{roughness:.6});Kt(r,.22,.2,.09,p,-o/2+.55,.42,o/2-.5,10),Kt(r,.04,.055,.4,Ze("#222"),-o/2+.55,.65,o/2-.5,8),Kt(r,.16,.13,.22,Ze("#e5e7eb",{metalness:.5,roughness:.4}),o/2-.5,.55,o/2-.55,12),Cn(r,1.1,.015,.75,Ze(i,{roughness:.8}),-o/2+.65,.012,o/2+.55,!1),Cn(r,1.1,.015,.75,Ze("#f5f5f4",{roughness:.8}),o/2-.65,.012,o/2+.55,!1);for(let g=0;g<4;g++){const v=Ca(r,2.6,.32,new Dt({map:Qb(),roughness:.6,emissive:new Ue(i),emissiveIntensity:.06}),0,.2,o/2+1.4,0,0,0);v.rotation.y=0}return a.add(r),{group:a,ring:r,size:o}}function I_(i,{quality:e="high",crowd:t=!0,staff:n=!0}={}){const s=new Vo,a=i.accent||"#f2c14e",r=i.accent2||"#111827",o=new Ue(i.fog||"#07070a");s.background=o,s.fog=new Ia(o,i.roof==="stadium"?.018:.026);const c=new vt;s.add(c);const l=new Dt({color:new Ue(o).multiplyScalar(1.4),roughness:.35,metalness:.25}),h=new q(new ts(26,48),l);h.rotation.x=-Math.PI/2,h.position.y=-.86,h.receiveShadow=!0,c.add(h);for(let P=0;P<3;P++){const te=new q(new Xo(7+P*2.2,7.06+P*2.2,64),new Lt({color:a,transparent:!0,opacity:.08-P*.02,side:nn}));te.rotation.x=-Math.PI/2,te.position.y=-.85,c.add(te)}const d=wp({accent:a,accent2:r,matColor:i.mat,ropes:i.ropes,arenaId:i.id});c.add(d.group);const u=d.size;let p=null;t&&i.tier>0&&i.id!=="underground"&&(p=new P_(c,i,e,a));const g=Ze("#2a2b33",{roughness:.4,metalness:.8}),v=i.roof==="hall"?5.6:7.2;for(const[P,te,ae,$]of[[11,.12,0,0],[.12,11,0,0]]){const Q=new q(new Pn(P||.16,.16,te||.16),g);Q.position.set(ae,v,$),c.add(Q)}const m=new q(new Rn(5.4,.07,6,40),g);m.rotation.x=Math.PI/2,m.position.y=v,c.add(m);const f=Ze("#101014",{roughness:.3,metalness:.8}),_=[a,"#f5f5f4",a,"#f5f5f4"];for(let P=0;P<8;P++){const te=P/8*Math.PI*2,ae=new q(new Ln(.16,.2,.36,12),f);ae.position.set(Math.cos(te)*4.2,v-.3,Math.sin(te)*4.2),ae.rotation.z=Math.cos(te)*.35,ae.rotation.x=Math.sin(te)*.35,c.add(ae);const $=new pr(new wa({map:Dl(_[P%4],128),color:_[P%4],transparent:!0,opacity:.5,blending:yn,depthWrite:!1}));$.scale.setScalar(.65),$.position.set(ae.position.x,ae.position.y-.2,ae.position.z),c.add($)}for(let P=0;P<4;P++){const te=P/4*Math.PI*2+Math.PI/4,ae=new Lt({color:a,transparent:!0,opacity:.035,side:nn,depthWrite:!1,blending:yn}),$=new q(new Cs(1.5,v,20,1,!0),ae);$.position.set(Math.cos(te)*3.2,v/2,Math.sin(te)*3.2),$.rotation.z=Math.cos(te)*.14,$.rotation.x=Math.sin(te)*.14,c.add($),$.userData.beam=!0}const b=new jo(i.light||"#ffffff",r,i.roof==="hall"?.55:.4);s.add(b);const M=new Yo("#fff6e8",i.roof==="hall"?190:260,26,Math.PI/4.4,.5,1.4);M.position.set(1.6,v,3.5),M.target.position.set(0,0,0),M.castShadow=!0,M.shadow.mapSize.set(e==="low"?512:1024,e==="low"?512:1024),M.shadow.bias=-4e-4,M.shadow.camera.near=1,M.shadow.camera.far=22,s.add(M,M.target);const I=new si(a,70,22,2);I.position.set(-4,3.2,-3.5),s.add(I);const w=new si("#7fb5ff",45,18,2);w.position.set(3.5,2.5,-4),s.add(w);const E=new si(i.light||"#fff0d0",45,9,2);if(E.position.set(0,3.5,0),s.add(E),i.roof==="stadium"){const P=new Wb("#cfd8ff",.7);P.position.set(8,12,6),s.add(P)}const C=new Dt({map:Kb("TG BOXING",i.name.toUpperCase(),a),emissive:new Ue("#ffffff"),emissiveIntensity:.35,roughness:.5}),U=new vt;Cn(U,4.6,2.6,.4,C,0,0,0);const y=new Tb(new zb(new Pn(4.7,2.7,.45)),new dp({color:a,transparent:!0,opacity:.6}));U.add(y),U.position.set(0,v+2.2,-9),U.rotation.y=.15,c.add(U);for(let P=0;P<4;P++){const te=Math.PI*.45+P*Math.PI*.38,ae=Math.cos(te)*11,$=Math.sin(te)*11,Q=Ca(c,3,3.4,new Dt({map:gp(i,P%2?"CHAMPIONS":"TG BOXING"),roughness:.8,emissive:new Ue(a),emissiveIntensity:.06,side:nn}),ae,2.4,$,0,-te+Math.PI/2,0);Q.userData.banner=!0}D_(c,i,a,r,v);let x=null;const N=[];if(n){x=Ol("referee"),x.root.position.set(-1.3,.02,.4),x.root.scale.setScalar(.92),c.add(x.root),N.push(x);for(const[P,te]of[[-1,u/2+1.1],[1,u/2+1.1]])for(let ae=0;ae<2;ae++){const $=Ol("trainer");$.root.position.set(P*(1.15+ae*.5),-.86,te+ae*.25),$.root.scale.setScalar(.94),$.root.rotation.y=P*.3+Math.PI,$.setRobe(!1);const Q=new q(new Ln(.29,.24,.42,12,1,!0),Ze(P<0?"#f5f5f4":a,{roughness:.8}));Q.position.y=.28,Q.scale.z=.8,$.parts.torso.add(Q),c.add($.root),N.push($)}}const O=160,G=new Float32Array(O*3);for(let P=0;P<O;P++)G[P*3]=(Math.random()-.5)*16,G[P*3+1]=Math.random()*6,G[P*3+2]=(Math.random()-.5)*16;const F=new Ct;F.setAttribute("position",new Wt(G,3));const R=new fr(F,new Ea({color:a,size:.025,transparent:!0,opacity:.4,depthWrite:!1,blending:yn}));s.add(R);const W=[];for(let P=0;P<8;P++){const te=new pr(new wa({map:Dl("#ffffff"),color:"#ffffff",transparent:!0,opacity:0,blending:yn,depthWrite:!1}));te.scale.setScalar(.5),c.add(te),W.push({sprite:te,x:(Math.random()-.5)*10,y:1+Math.random()*2.2,z:-4-Math.random()*5,life:0})}let Y=0;const ie=(P,te=.3)=>{Y+=P,p==null||p.update(P,.25+te*.7),R.rotation.y+=P*.01,R.position.y=Math.sin(Y*.2)*.1;for(const ae of W)ae.life=Math.max(0,ae.life-P),ae.life<=0&&Math.random()<P*(.35+te*.9)?(ae.life=.1+Math.random()*.16,ae.sprite.parent||c.add(ae.sprite),ae.sprite.position.set(ae.x,ae.y,ae.z),ae.sprite.material.opacity=.9):ae.life>0?ae.sprite.material.opacity=Math.max(0,ae.life*4):ae.sprite.material.opacity=0;I.intensity=60+Math.sin(Y*1.3)*10+te*20,D&&(D.rotation.y=Math.sin(Y*.15)*.1+.15)},D=U;return{scene:s,root:c,update:ie,ringSize:u,referee:x,staff:N,crowd:p,dispose:()=>{p==null||p.dispose(),s.traverse(P=>{var te,ae,$,Q;P.isMesh&&(P.geometry&&!P.userData.shared&&((ae=(te=P.geometry).dispose)==null||ae.call(te)),P.material&&(Array.isArray(P.material)?P.material.forEach(de=>{var me;return(me=de.dispose)==null?void 0:me.call(de)}):(P.material.map&&(P.material.map=null),(Q=($=P.material).dispose)==null||Q.call($))))}),s.clear()}}}function D_(i,e,t,n,s){const a=e.id;if(a==="tokyo"){const r=new q(new ts(2.2,40),new Lt({color:"#c1121f",transparent:!0,opacity:.55}));r.position.set(0,3.3,-12.5),i.add(r);for(let o=0;o<6;o++){Kt(i,.04,.04,4.6,Ze("#171717"),-7+o*2.8,1.45,-7.5,8);const c=new q(new Ti(.26,10,8),new Dt({color:"#f5f5f4",emissive:"#ff8a8a",emissiveIntensity:.6}));c.scale.y=1.4,c.position.set(-7+o*2.8,3.65,-7.5),i.add(c)}}else if(a==="vegas"){for(let o=0;o<6;o++){const c=new q(new Pn(.06,3.8,.06),new Lt({color:o%2?"#22d3ee":"#a855f7"}));c.position.set(-9+o*3.6,2,-11.5),i.add(c)}const r=new q(new Rn(4.2,.035,6,64),new Lt({color:"#a855f7"}));r.position.set(0,s-.1,-8.4),i.add(r)}else if(a==="mexico")for(let r=0;r<16;r++){const o=new q(new as(.35,.3),new Dt({color:["#22c55e","#f5f5f4","#dc2626","#facc15"][r%4],side:nn,roughness:.8}));o.position.set(-10+r*1.35,3.8+Math.sin(r)*.2,-9),o.rotation.z=Math.sin(r)*.2,i.add(o)}else if(a==="underground"){const r=Ze("#2a2a2a",{roughness:.5,metalness:.7});for(let c=0;c<14;c++)Kt(i,.03,.03,5.5,r,-9+c*1.35,1.9,-8.8,6);const o=new q(new Rn(3.2,.04,6,48),new Lt({color:"#f43f5e"}));o.position.set(0,4.6,-7),o.rotation.x=.2,i.add(o),au(i,"#f43f5e")}else if(a==="dubai"||a==="champions"){for(let r=0;r<4;r++){const o=new q(new Rn(3.4,.12,8,36,Math.PI),Ze(t,{metalness:.7,roughness:.3}));o.position.set(0,1.4,-10-r*1.6),i.add(o)}au(i,t)}else if(a==="seoul")for(let r=0;r<5;r++){const o=new q(new Rn(3.5+r*.6,.02,6,64),new Lt({color:r%2?"#22d3ee":"#a855f7",transparent:!0,opacity:.6}));o.position.set(0,2.2+r*.7,-9),i.add(o)}else if(a==="newyork")for(let r=0;r<5;r++){const o=new si("#f97316",12,10,2);o.position.set(-8+r*4,2.2,6.4),i.add(o)}else if(a==="london"){const r=new q(new Rn(1.8,.07,8,40),Ze(t,{metalness:.8,roughness:.3}));r.position.set(0,3.1,-11),i.add(r);const o=new q(new Cs(1.1,1.1,5,1,!0),Ze(t,{metalness:.8,roughness:.3,side:nn}));o.position.set(0,3.1,-10.9),i.add(o)}else if(a==="national")for(let r=0;r<3;r++){const o=new q(new Pn(6,.2,.08),new Lt({color:["#22c55e","#facc15","#1d4ed8"][r]}));o.position.set(0,1.6+r*.35,-10),i.add(o)}else if(a==="moscow")for(let r=0;r<3;r++){const o=new q(new ts(.55,5),new Lt({color:"#ef4444"}));o.position.set(-3+r*3,3.4,-10.5),i.add(o)}else if(a==="manila")for(let r=0;r<12;r++){const o=new q(new Ti(.16,8,6),new Lt({color:"#facc15"}));o.position.set(-8+r*1.5,3.2+r%3*.3,-8.5),i.add(o)}else if(a==="berlin"){const r=new q(new Pn(8,2.2,.2),Ze("#334155",{roughness:.8}));r.position.set(0,1.1,-11.5),i.add(r);for(let o=0;o<8;o++){const c=new q(new Pn(.9,2.1,.22),Ze(o%2?"#475569":"#334155",{roughness:.8}));c.position.set(-3.8+o*1.1,1.1,-9.5),i.add(c)}}}function au(i,e,t){for(let n=0;n<6;n++){const s=new pr(new wa({map:Dl(e),color:e,transparent:!0,opacity:.08,blending:yn,depthWrite:!1}));s.scale.set(3+n,1.8+n*.2,1),s.position.set(-6+n*2.4,-.4+n%2*.2,-5.5),i.add(s)}}function k_(){const i=new Vo;i.background=new Ue("#0a0908"),i.fog=new Ia("#0a0908",.045);const e=new vt;i.add(e);const t=new Dt({color:"#1a1512",roughness:.62,metalness:.05}),n=new q(new as(18,18),t);n.rotation.x=-Math.PI/2,e.add(n),Cn(e,18,5,.3,Ze("#191512",{roughness:.9}),0,2.5,-9),Cn(e,.3,5,18,Ze("#14110f",{roughness:.9}),-9,2.5,0);for(let u=0;u<3;u++)Ca(e,3,2.2,new Lt({color:"#f6c578"}),-4+u*4,2.6,-8.82),Cn(e,3.2,2.4,.1,Ze("#2b2119"),-4+u*4,2.6,-8.83);const s=wp({accent:"#dc2626",accent2:"#3b1d1d",matColor:"#221a1a",ropes:["#dc2626","#f5f5f4","#1d4ed8"],arenaId:"gym"});s.group.scale.setScalar(.72),s.group.position.set(2.4,0,-3),N_(s.group),e.add(s.group);for(let u=0;u<3;u++){const p=-5.3+u*1.6;Kt(e,.34,.38,1.5,Ze("#5b2a1c",{roughness:.7}),p,2.2,-2.5,14,!0),Kt(e,.33,.33,.16,Ze("#e5e7eb",{roughness:.8}),p,2.85,-2.5,14),Kt(e,.018,.018,1,Ze("#888"),p,3.5,-2.5,6)}Cn(e,1.1,.6,1.1,Ze("#3f2a1d"),-4.4,2.3,1.5),Kt(e,.04,.04,.9,Ze("#999"),-4.4,1.7,1.5,6);const a=new q(new Ti(.18,12,8),Ze("#7c2d12",{roughness:.4}));a.scale.y=1.2,a.position.set(-4.4,1.3,1.5),e.add(a);const r=Ol("trainer");r.root.position.set(-.7,0,1.7),r.root.rotation.y=.6;const o=new q(new Ln(.3,.25,.44,12,1,!0),Ze("#b45309",{roughness:.8}));o.position.y=.28,o.scale.z=.8,r.parts.torso.add(o),e.add(r.root);for(let u=0;u<3;u++)Ca(e,1.8,2.6,new Dt({map:gp({id:"gym"+u,accent:["#dc2626","#eab308","#38bdf8"][u],accent2:"#1a1a1a"},["GLORY","PAIN","LEGACY"][u]),roughness:.85}),-7.5+u*2.2,2.6,-8.7);Cn(e,2.2,.18,.7,Ze("#1d1d1d"),3.8,.65,3.2),Cn(e,.15,.6,.6,Ze("#2a2a2a"),3,.3,3.2),Cn(e,.15,.6,.6,Ze("#2a2a2a"),4.6,.3,3.2),i.add(new jo("#ffedd5","#1c1917",.55));const c=new Yo("#ffd7a0",130,20,Math.PI/3.5,.5,1.2);c.position.set(3.5,7,4),c.target.position.set(0,1.1,0),c.castShadow=!0,c.shadow.mapSize.set(1024,1024),i.add(c,c.target);const l=new si("#f59e0b",30,12,2);l.position.set(-4,2.4,2),i.add(l);let h=0;return{scene:i,root:e,coach:r,update:u=>{h+=u,a.rotation.z=Math.sin(h*7)*.25,a.position.x=-4.4+Math.sin(h*7)*.06},ring:s,dispose:()=>i.clear()}}function N_(i){i.traverse(e=>{e.isMesh&&(e.castShadow=!1,e.receiveShadow=!0)})}function O_(){const i=new Vo;i.background=new Ue("#060608"),i.fog=new Ia("#060608",.05);const e=new vt;i.add(e);const t=new Dt({color:"#0d0b0c",roughness:.22,metalness:.55}),n=new q(new ts(12,64),t);n.rotation.x=-Math.PI/2,e.add(n),Kt(e,1.15,1.35,.26,Ze("#181818",{roughness:.35,metalness:.6}),0,.13,0,48,!0);const s=new q(new Rn(1.22,.025,8,64),new Lt({color:"#f2c14e"}));s.rotation.x=Math.PI/2,s.position.y=.265,e.add(s);const a=new Dt({color:"#12090c",roughness:.8}),r=new q(new Ln(7.5,7.5,8,48,1,!0,Math.PI*.7,Math.PI*1.6),a);r.position.y=4,r.material.side=sn,e.add(r);const o=new q(new as(5.4,2.7),new Lt({map:Jb(),transparent:!0,opacity:.42,depthWrite:!1}));o.position.set(0,4.25,-9.2),e.add(o);for(let f=0;f<3;f++){const _=new q(new Rn(4.2,.018,6,64,Math.PI),new Lt({color:f===1?"#f2c14e":"#3a2a2a",transparent:!0,opacity:.5}));_.position.set(0,.5+f*.3,-1),_.rotation.x=Math.PI,e.add(_)}i.add(new jo("#97a6c4","#1a0b0b",.35));const c=new Yo("#fff0d6",340,30,Math.PI/5,.4,1.2);c.position.set(3.2,7.5,5),c.target.position.set(0,1.2,0),c.castShadow=!0,c.shadow.mapSize.set(1024,1024),i.add(c,c.target);const l=new si("#e11d48",120,16,2);l.position.set(-4,3.2,-4),i.add(l);const h=new si("#f2c14e",75,14,2);h.position.set(4.2,1.5,-2.5),i.add(h);const d=new q(new Cs(2.4,8,24,1,!0),new Lt({color:"#f2c14e",transparent:!0,opacity:.035,side:nn,depthWrite:!1,blending:yn}));d.position.set(.6,4,2.2),e.add(d);const u=120,p=new Float32Array(u*3);for(let f=0;f<u;f++)p[f*3]=(Math.random()-.5)*14,p[f*3+1]=Math.random()*7,p[f*3+2]=(Math.random()-.5)*10;const g=new Ct;g.setAttribute("position",new Wt(p,3));const v=new fr(g,new Ea({color:"#f2c14e",size:.02,transparent:!0,opacity:.4,depthWrite:!1,blending:yn}));i.add(v);let m=0;return{scene:i,root:e,update:f=>{m+=f,v.rotation.y+=f*.03,l.intensity=110+Math.sin(m*.9)*20,s.material.color.setHSL(.11,.8,.55+Math.sin(m*1.2)*.05)},dispose:()=>i.clear()}}function U_(){const i=new Vo;i.background=new Ue("#0b0b0f"),i.fog=new Ia("#0b0b0f",.03);const e=new vt;i.add(e);const t=new Dt({color:"#16161d",roughness:.55,metalness:.1,side:sn}),n=new q(new Ln(9,9,9,48,1,!0),t);n.position.y=4.5,e.add(n);const s=new q(new Ti(9,32,16,0,Math.PI*2,0,Math.PI/2),t);s.position.y=9,e.add(s);const a=new q(new ts(9,64),new Dt({color:"#141419",roughness:.4,metalness:.3}));a.rotation.x=-Math.PI/2,e.add(a),Kt(e,1,1.15,.14,Ze("#1c1c24",{roughness:.32,metalness:.5}),0,.07,0,48,!0);const r=new q(new Rn(1.05,.018,6,64),new Lt({color:"#f2c14e"}));r.rotation.x=Math.PI/2,r.position.y=.145,e.add(r);for(let d=-4;d<=4;d++){const u=Ca(e,18,.012,new Lt({color:"#2a2a35",transparent:!0,opacity:.5}),0,.002,d*1.8,-Math.PI/2,0,0);u.rotation.z=Math.PI/2}i.add(new jo("#7b90c0","#1b0d0d",.4));const o=new Yo("#fff1db",260,20,Math.PI/4.2,.5,1.3);o.position.set(2.8,5.4,4.8),o.target.position.set(0,1.1,0),o.castShadow=!0,o.shadow.mapSize.set(1024,1024),o.shadow.bias=-5e-4,i.add(o,o.target);const c=new si("#7cb8ff",60,14,2);c.position.set(-3.7,2.4,2.6),i.add(c);const l=new si("#f2c14e",80,14,2);l.position.set(2.6,2.8,-3.4),i.add(l);const h=new si("#e11d48",35,10,2);return h.position.set(-1.4,1.6,-3.8),i.add(h),{scene:i,root:e,update:d=>{c.intensity=55+Math.sin(performance.now()*.001)*8},dispose:()=>i.clear()}}const No=["Nenhuma","Dragão","Coroa","Chama","Cobra","Asas","Estrela","Cruz","Leão","Tribal"];function ws(i,e="middle"){if(!i)return Aa("default");const t=fd("look-"+i.id+(i.name||"")),n=["cruiser","heavy","lheavy"].includes(i.division||e),s=["fly","bantam","feather"].includes(i.division||e),a=n?t.range(.55,.96):s?t.range(.28,.7):t.range(.4,.88),r=n?t.range(.58,.85):s?t.range(.3,.58):t.range(.42,.7),o=i.height?Ve((i.height-162)/44,0,1):t.range(.2,.9),c=i.reach?Ve((i.reach-168)/30,0,1):t.range(.25,.85),l=t.int(0,qn.length-1),h=Ai[t.int(0,Ai.length-1)],d=Li[t.int(0,Li.length-1)];return{skin:ns[t.int(0,ns.length-1)].id,hair:Ci[t.int(0,Ci.length-1)].id,beard:t.chance(.55)?As[t.int(0,As.length-1)].id:"none",brow:Rs[t.int(0,Rs.length-1)].id,face:Ps[t.int(0,Ps.length-1)].id,eyes:Ls[t.int(0,Ls.length-1)].id,nose:Is[t.int(0,Is.length-1)].id,mouth:Ds[t.int(0,Ds.length-1)].id,scar:t.chance(.45)?ks[t.int(1,ks.length-1)].id:"s0",height:o,reach:c,muscle:a,width:r,shorts:h.id,top:t.chance(.14)?Ta[t.int(0,Ta.length-1)].id:"none",shoe:Ri[t.int(0,Ri.length-1)].id,robe:Pi[t.int(0,Pi.length-1)].id,glove:d.id,colorway:qn[l].id,wrap:t.chance(.45)?"bandagem-tradicional":"none",headgear:"none",medal:"none",tattoo:No[t.int(0,No.length-1)]}}function Aa(i="default",e="middle"){const t=fd("random-look-"+i),n=t.range(.35,.9);return{skin:ns[t.int(0,ns.length-1)].id,hair:Ci[t.int(0,Ci.length-1)].id,beard:t.chance(.4)?As[t.int(0,As.length-1)].id:"none",brow:Rs[t.int(0,Rs.length-1)].id,face:Ps[t.int(0,Ps.length-1)].id,eyes:Ls[t.int(0,Ls.length-1)].id,nose:Is[t.int(0,Is.length-1)].id,mouth:Ds[t.int(0,Ds.length-1)].id,scar:ks[t.int(0,ks.length-1)].id,height:t.range(.2,.85),reach:t.range(.25,.85),muscle:n,width:t.range(.35,.75),shorts:Ai[t.int(0,Ai.length-1)].id,top:"none",shoe:Ri[t.int(0,Ri.length-1)].id,robe:Pi[t.int(0,Pi.length-1)].id,glove:Li[t.int(0,Li.length-1)].id,colorway:qn[t.int(0,qn.length-1)].id,wrap:t.chance(.4)?"bandagem-tradicional":"none",headgear:"none",medal:"none",tattoo:No[t.int(0,No.length-1)]}}class F_{constructor(e){this.canvas=e;const t=typeof matchMedia<"u"&&matchMedia("(pointer:coarse)").matches;this.mobile=t||typeof innerWidth<"u"&&innerWidth<860,this.renderer=new xb({canvas:e,antialias:!this.mobile,alpha:!1,powerPreference:"high-performance",stencil:!1}),this.renderer.outputColorSpace=Tn,this.renderer.toneMapping=Du,this.renderer.toneMappingExposure=1.1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Lu,this.quality=this.mobile?"medium":"high",this.applyQuality(),this.audio=new qb,this.clock=new Xb,this.background=null,this.frameHook=null,this.navigator=()=>{},this.save=null,this.universe=null,this.transition=0,this.menuNews=[],this.resize=this.resize.bind(this),window.addEventListener("resize",this.resize),this.resize(),this.loop=this.loop.bind(this),requestAnimationFrame(this.loop),this.lastFps=60,this.fpsAccum=0,this.fpsFrames=0}applyQuality(){const e=window.devicePixelRatio||1,t=this.quality==="low"?1:this.quality==="medium"?1.35:1.8;this.renderer.setPixelRatio(Math.min(e,t)),this.renderer.shadowMap.enabled=this.quality!=="low",this.renderer.setSize(window.innerWidth,window.innerHeight,!1)}setQuality(e){this.quality=e,this.applyQuality(),this.resize()}boot({save:e,universe:t}){this.save=e,this.universe=t,e&&this.audio.setSettings(e.settings||{})}navigate(e,t={}){this.navigator(e,t)}setFrame(e){this.frameHook=e}clearBackground(){var e,t,n,s;(e=this.background)!=null&&e.dispose&&this.background.dispose(),(t=this.background)!=null&&t.scene&&((s=(n=this.background.scene).traverse)==null||s.call(n,a=>{var r,o,c,l,h;a.isMesh&&((o=(r=a.geometry)==null?void 0:r.dispose)==null||o.call(r),(c=a.material)!=null&&c.map&&(a.material.map=null),(h=(l=a.material)==null?void 0:l.dispose)==null||h.call(l))})),this.background=null,this.setFrame(null)}defaultAppearance(){var e,t;return(t=(e=this.save)==null?void 0:e.profile)!=null&&t.appearance?this.save.profile.appearance:ws({id:"hero-default",name:"Kaito",division:"middle"})}showMenu(){var c,l;this.clearBackground();const e=O_(),t=((l=(c=this.save)==null?void 0:c.profile)==null?void 0:l.appearance)||this.defaultAppearance(),n=new ga(t,{robe:!1,quality:this.quality}),s=this.mobile;n.root.position.set(s?0:.55,.26,.1),n.root.rotation.y=-.12,e.scene.add(n.root),n.setExpression("focused");const a=new Zt(s?46:35,window.innerWidth/window.innerHeight,.1,60),r=()=>{window.innerWidth/window.innerHeight<1?(a.position.set(1.35,1.62,5.9),a.lookAt(0,1.22,0)):(a.position.set(3,1.72,6.35),a.lookAt(.4,1.12,0))};r();let o=0;this.background={kind:"showcase",scene:e.scene,camera:a,boxer:n,update:h=>{o+=h,n.update(h,{stamina:100,idle:!0}),n.root.rotation.y=-.12+Math.sin(o*.22)*.18,e.update(h),a.position.x+=Math.sin(o*.18)*6e-4,a.lookAt(s?0:.4,1.12,0)},resize:()=>{a.aspect=window.innerWidth/window.innerHeight,a.fov=window.innerWidth/window.innerHeight<1?46:35,a.updateProjectionMatrix(),r()},render:()=>this.renderer.render(e.scene,a),dispose:()=>{n.dispose(),e.dispose()}}}showEditor(e){this.clearBackground();const t=U_(),n=new ga(e,{robe:!1,quality:this.quality});n.root.position.set(0,.14,0),n.setExpression("focused"),t.scene.add(n.root);const s=new Zt(35,window.innerWidth/window.innerHeight,.1,60),a=()=>{const c=window.innerWidth/window.innerHeight<.9;s.position.set(0,c?1.65:1.5,c?5.2:4.5),s.lookAt(0,c?1.1:1.05,0)};a();let r=0,o=0;return this.background={kind:"studio",scene:t.scene,camera:s,boxer:n,update:c=>{r+=c,this.editorDragging?n.root.rotation.y=o:n.root.rotation.y=Math.sin(r*.3)*.22,n.update(c,{stamina:100,idle:!0}),t.update()},setRotation:c=>{o=c,this.editorDragging=!0,setTimeout(()=>{this.editorDragging=!1},1600)},resize:()=>{s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),a()},render:()=>this.renderer.render(t.scene,s),dispose:()=>{n.dispose(),t.dispose()}},n}showGym(){var o,c;this.clearBackground();const e=k_(),t=((c=(o=this.save)==null?void 0:o.profile)==null?void 0:c.appearance)||this.defaultAppearance(),n=new ga(t,{robe:!1,quality:this.quality});n.root.position.set(2.2,.02,-5.2),n.root.rotation.y=Math.PI*.92,e.scene.add(n.root);const s=new Zt(44,window.innerWidth/window.innerHeight,.1,60),a=()=>{const l=window.innerWidth/window.innerHeight<.9;s.position.set(l?3.2:4.5,1.8,l?4.6:5.4),s.lookAt(0,1.05,-1.4)};a();let r=0;this.background={kind:"gym",scene:e.scene,camera:s,coach:e.coach,player:n,update:l=>{r+=l,e.update(l);const h=r%2.1,d=h<.2?"jab":null;n.update(l,{stamina:82,action:d,actionTime:h%.3,actionDur:.3,moveZ:0,expression:"focused"}),e.coach.update(l,{stamina:95,idle:!0})},resize:()=>{s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),a()},render:()=>this.renderer.render(e.scene,s),dispose:()=>{n.dispose(),e.dispose()}}}showFight(e){this.clearBackground(),this.background={kind:"fight",scene:e.scene,camera:e.camera,view:e,update:t=>e.update(t),render:()=>e.render(),resize:()=>e.resize(window.innerWidth,window.innerHeight),dispose:()=>e.dispose()},e.resize(window.innerWidth,window.innerHeight)}recreateMenu(){var e;((e=this.background)==null?void 0:e.kind)==="showcase"&&this.showMenu()}saveNow(){Mt(this.save,!0)}resize(){var n;const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.applyQuality(),(n=this.background)!=null&&n.resize&&this.background.resize()}loop(){var t,n;requestAnimationFrame(this.loop);const e=Math.min(.05,this.clock.getDelta());this.fpsAccum+=e,this.fpsFrames++,this.fpsAccum>1&&(this.lastFps=Math.round(this.fpsFrames/this.fpsAccum),this.fpsAccum=0,this.fpsFrames=0),this.audio.update(e);try{(t=this.background)!=null&&t.update&&this.background.update(e),this.frameHook&&this.frameHook(e),(n=this.background)!=null&&n.render&&this.background.render()}catch(s){console.error("Frame error",s)}ci.emit("frame",e)}}const ru={fist:'<path d="M6 11V7a2 2 0 0 1 4 0v3-5a2 2 0 0 1 4 0v5-4a2 2 0 0 1 4 0v7c0 4-3 7-7 7h-1a7 7 0 0 1-7-7v-2a2 2 0 0 1 4 0z"/><path d="M10 11v3M14 10v4"/>',belt:'<path d="M4 8h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><circle cx="12" cy="12" r="3"/><path d="M12 9v6M9 12h6"/>',trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5v2a4 4 0 0 0 4 4M16 6h3v2a4 4 0 0 1-4 4"/><path d="M12 13v4M8 21h8M10 17h4"/>',coin:'<circle cx="12" cy="12" r="8"/><path d="M9 10h4a2 2 0 0 1 0 4H9M11 8v8"/>',news:'<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',shop:'<path d="M4 9l2-5h12l2 5"/><path d="M4 9h16v11H4zM8 9v11M16 9v11"/><path d="M4 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 4 0"/>',gym:'<path d="M3 10h2v4H3zM19 10h2v4h-2zM6 8h3v8H6zM15 8h3v8h-3zM9 12h6"/>',stats:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1L14.5 3h-5L9 6a7 7 0 0 0-1.7 1L5 6 3 9.5 5 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 1.7 1L9.5 21h5l.5-3a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5a7 7 0 0 0 .1-1z"/>',play:'<path d="M7 4l13 8-13 8z"/>',pause:'<path d="M8 5v14M16 5v14"/>',close:'<path d="M5 5l14 14M19 5L5 19"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',crown:'<path d="M3 7l4 4 5-6 5 6 4-4v10H3z"/><path d="M5 20h14"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18"/>',shield:'<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',bolt:'<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>',heart:'<path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11z"/>',target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',feet:'<path d="M6 20c-2 0-3-2-2-5 1-4 1-7 3-9s4 1 4 4-1 10-5 10zM18 20c2 0 3-2 2-5-1-4-1-7-3-9s-4 1-4 4 1 10 5 10z"/>',flame:'<path d="M12 3c2 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-6 0 3 2 4 3 3 0-3-1-5 0-8z"/>',lungs:'<path d="M12 3v9M9 7c-3 0-5 3-5 7 0 3 2 5 4 5s3-2 3-5V9M15 7c3 0 5 3 5 7 0 3-2 5-4 5s-3-2-3-5V9"/>',star:'<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.1-5.5-2.9-5.5 2.9 1-6.1L3 9.6l6.2-.9z"/>',fire:'<path d="M12 2c1 5 6 7 6 12a6 6 0 0 1-12 0c0-2 1-4 3-6 0 2 1 3 2 3 0-3-1-6 1-9z"/>',spark:'<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/>',return:'<path d="M4 10h11a5 5 0 0 1 0 10H8"/><path d="M8 5l-4 5 4 5"/>',clash:'<path d="M4 4l7 7M4 20l7-7M20 4l-7 7M20 20l-7-7"/>',coach:'<circle cx="12" cy="7" r="3"/><path d="M5 21c0-5 3-8 7-8s7 3 7 8"/><path d="M8 13l4 3 4-3"/>',person:'<circle cx="12" cy="7" r="3"/><path d="M5 21c0-5 3-8 7-8s7 3 7 8"/>',people:'<circle cx="9" cy="8" r="3"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><path d="M16 3a3 3 0 0 1 0 6M18 14c2 .5 4 3 4 7"/>',bag:'<path d="M6 6h12l1 15H5zM9 6V4h6v2"/><path d="M9 11h6M9 15h6"/>',ring:'<path d="M3 8h18v12H3z"/><path d="M6 8V4M18 8V4M3 12h18M3 16h18"/>',wrap:'<path d="M4 8c6-4 12 4 16 0v8c-6 4-12-4-16 0z"/><path d="M8 8v8M12 8v8M16 8v8"/>',ice:'<path d="M12 2v20M3 7l18 10M21 7L3 17M8 4l4 3 4-3M8 20l4-3 4 3"/>',brain:'<path d="M9 3a4 4 0 0 0-4 4c-2 1-2 4 0 5-1 3 1 5 3 5 1 2 4 2 5 0V4c-1-1-3-1-4-1zM15 3a4 4 0 0 1 4 4c2 1 2 4 0 5 1 3-1 5-3 5-1 2-4 2-5 0V4c1-1 3-1 4-1z"/>',medal:'<circle cx="12" cy="14" r="5"/><path d="M9 9L6 3M15 9l3-6M12 12l1 2 2 .3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2L9 13.3l2-.3z"/>',robe:'<path d="M8 3h8l3 5v13H5V8z"/><path d="M12 3v18M8 8l4 3 4-3"/>',glove:'<path d="M6 12V7a2 2 0 0 1 4 0v3-5a2 2 0 0 1 4 0v4-3a2 2 0 0 1 4 0v6c0 5-3 8-8 8-3 0-6-2-6-5v-1a2 2 0 0 1 2-2z"/><path d="M10 20v-4"/>',sponsor:'<path d="M4 6h16v12H4z"/><path d="M8 10h8M8 14h5"/>',beltCase:'<path d="M3 6h18v14H3zM8 6V3h8v3M3 11h18"/>',plane:'<path d="M2 13l20-9-8 18-2-7z"/>',trophy2:'<path d="M6 3h12v4a6 6 0 0 1-12 0z"/><path d="M12 13v5M7 21h10"/>',legend:'<circle cx="12" cy="12" r="9"/><path d="M8 9l4-2 4 2-4 2zM8 14h8M9 17h6"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',check:'<path d="M4 12l5 5L20 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',link:'<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',users:'<circle cx="9" cy="8" r="3"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><path d="M16 4a3 3 0 0 1 0 6M18 14c2 .5 4 3 4 7"/>',wifi:'<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>',upgrade:'<path d="M12 20V5M6 11l6-6 6 6"/>',swap:'<path d="M4 8h16M16 4l4 4-4 4M20 16H4M8 12l-4 4 4 4"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',book:'<path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4zM20 4h-3a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h3z"/>',home:'<path d="M3 11l9-8 9 8v10H3zM9 21v-7h6v7"/>',chart:'<path d="M4 20V4M4 20h16M8 16v-5M12 16V7M16 16v-8"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',volume:'<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',download:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',upload:'<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',wifiOff:'<path d="M2 2l20 20M8.5 15.5a6 6 0 0 1 7 0M5 12a11 11 0 0 1 5-2.8M2 8a16 16 0 0 1 8-4.5M16 4.5A16 16 0 0 1 22 8"/><circle cx="12" cy="19" r="1"/>'};function J(i,e=20,t=""){const n=ru[i]||ru.grid;return`<svg class="ic ${t}" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n}</svg>`}const B_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function V(i){return String(i??"").replace(/[&<>"']/g,e=>B_[e])}function Bt(i){const e=document.createElement("template");return e.innerHTML=String(i).trim(),e.content.firstElementChild}function nt(i){return new Intl.NumberFormat("pt-BR").format(Math.round(Number(i)||0))}function $_(i){return`C$ ${nt(i)}`}function Vt(i){if(!i)return"—";const e=new Date(i);return Number.isNaN(e.getTime())?"—":e.toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"}).replace(".","")}function Fn(i=""){return i.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join("").toUpperCase()||"TG"}function It(i){return`${(i==null?void 0:i.w)||0}-${(i==null?void 0:i.l)||0}-${(i==null?void 0:i.d)||0}`}function wi(i){var e;return((e=i_[i])==null?void 0:e.name)||i||"—"}function Et(i){var e;return((e=xn[i])==null?void 0:e.name)||"Peso-Médio"}function On(i){return Ft.find(e=>e.id===i)||Ft[0]}function ai(i){var e;return((e=Da.find(t=>t.id===i))==null?void 0:e.name)||"Cinturão"}function z_(i,e=100){return`${Math.max(0,Math.min(100,Number(i)/e*100))}%`}function vd(i,e=!1){return`<div class="bars">${[["strength","Força"],["speed","Velocidade"],["stamina","Resistência"],["precision","Precisão"],["defense","Defesa"],["reflexes","Reflexos"],["mobility","Mobilidade"],["recovery","Recuperação"],["conditioning","Condicionamento"]].map(([n,s])=>`
    <div class="bar-row"><span>${s}</span><span class="bar-track"><i class="bar-fill" style="width:${z_((i==null?void 0:i[n])||0)}"></i></span><span class="attr-value">${Math.round((i==null?void 0:i[n])||0)}</span></div>
  `).join("")}</div>`}function _n(i){const e=Object.values(i||{});return e.length?Math.round(e.reduce((t,n)=>t+n,0)/e.length):0}function jn({kicker:i,title:e,sub:t,actions:n=""}){return`<div class="screen-head">
    <div>
      ${i?`<div class="kicker">${V(i)}</div>`:""}
      <h1 class="screen-title">${e}</h1>
      ${t?`<p class="screen-sub">${t}</p>`:""}
    </div>
    ${n?`<div class="head-actions">${n}</div>`:""}
  </div>`}function Hi(i,e,t="",n=!1){return`<div class="stat-tile ${n?"accent":""}"><div class="label">${i}</div><div class="value">${e}</div>${t?`<div class="sub">${t}</div>`:""}</div>`}function G_(i,e=60){let t=null;return(...n)=>{t&&clearTimeout(t),t=setTimeout(()=>{t=null,i(...n)},e)}}const H_=[{id:"career",label:"Carreira",icon:"crown"},{id:"rankings",label:"Rankings",icon:"chart"},{id:"news",label:"Notícias",icon:"news"},{id:"shop",label:"Loja TG",icon:"shop"},{id:"gym",label:"Academia",icon:"gym"},{id:"multiplayer",label:"Online",icon:"wifi"},{id:"stats",label:"Estatísticas",icon:"stats"}];class V_{constructor(e){this.app=e,this.save=e.save,this.universe=e.universe,this.screens={},this.current={name:"menu",data:{}},this.cleanups=[],this.root=document.getElementById("ui-root"),this.toastStack=document.getElementById("toast-stack"),this.modalEl=null,this.draft=null,this.locked=!1,this.lastBackground=null,this.onResize=null,window.addEventListener("keydown",t=>{t.key==="Escape"&&this.modalEl&&this.closeModal()})}addScreen(e,t){return this.screens[e]=t,this}onCleanup(e){typeof e=="function"&&this.cleanups.push(e)}runCleanups(){for(const e of this.cleanups.splice(0))try{e()}catch(t){console.warn("cleanup",t)}}start(){this.navigate("menu")}goMenu(){this.navigate("menu")}ensureBackground(e){var n,s,a;const t=this.app;if(e!=="fight"){if(e==="editor"||e==="create"){t.showEditor(((n=this.draft)==null?void 0:n.appearance)||((a=(s=t.save)==null?void 0:s.profile)==null?void 0:a.appearance)||t.defaultAppearance()),this.lastBackground="studio";return}if(e==="gym"){t.showGym(),this.lastBackground="gym";return}this.lastBackground!=="showcase"&&(t.showMenu(),this.lastBackground="showcase")}}navigate(e,t={}){var a;const n=this.screens[e];if(!n){console.warn("Unknown screen",e);return}this.runCleanups(),this.closeModal(),this.current={name:e,data:t},this.locked=!1,(a=document.activeElement)!=null&&a.blur&&document.activeElement.blur(),this.ensureBackground(e),this.root.innerHTML="",this.app.audio.setScene(e==="menu"||e==="career"||e==="rankings"||e==="news"||e==="shop"||e==="stats"?"menu":e==="gym"?"gym":e==="editor"?"editor":"menu");let s;try{s=n(this,t)}catch(r){console.error("Screen render failed",e,r),s=Bt(`<div class="screen plain"><div class="empty-state"><b>Erro ao abrir a tela</b><p>${V((r==null?void 0:r.message)||r)}</p><button class="btn btn-primary" data-nav="menu">Voltar ao menu</button></div></div>`)}s&&this.root.appendChild(s),this.bindTopbar(),this.root.querySelectorAll("[data-nav]").forEach(r=>{r.addEventListener("click",o=>{o.preventDefault();const c=r.dataset.nav;c&&c!==this.current.name&&this.navigate(c)})}),this.current.name===e&&(this.app.save=this.save)}refresh({scroll:e="reset"}={}){var n;const t=e==="reset"?0:((n=this.root.querySelector(".screen"))==null?void 0:n.scrollTop)||0;this.navigate(this.current.name,this.current.data),e==="keep"&&requestAnimationFrame(()=>{const s=this.root.querySelector(".screen");s&&(s.scrollTop=t)})}topbar(e,t=""){const n=this.save,s=n==null?void 0:n.profile,a=n==null?void 0:n.career,r=(s==null?void 0:s.name)||"Visitante",o=s!=null&&s.division?Et(s.division):"Sem carreira";return`<header class="topbar">
      <button class="brand-mini" data-nav="menu" aria-label="Menu principal">
        <span class="brand-mark">TG</span>
        <span class="brand-text"><b>TG BOXING</b><span>The Glory of Champions</span></span>
      </button>
      <nav class="topnav" aria-label="Navegação principal">
        ${H_.map(c=>`<button data-nav="${c.id}" class="${e===c.id?"active":""}">${J(c.icon,15)} ${c.label}</button>`).join("")}
      </nav>
      <div class="userbar">
        ${a?`<div class="wallet">
          <span class="chip gold" title="TG COIN (moeda virtual)">${J("coin",14)} ${nt(a.coins)}</span>
          <span class="chip" title="Carteira da carreira">${J("coin",13)} C$ ${nt(a.money)}</span>
        </div>`:""}
        ${t}
        <button class="sound-toggle" data-action="toggle-sound" title="Som">${J((this.audioMuted,"volume"),17)}</button>
        <button class="profile-pill" data-nav="${n?"career":"create"}">
          <span class="avatar">${Fn(r)}</span>
          <span><b>${V(r)}</b><small>${n?`${It(a.record)} · ${V(o)}`:"Crie seu lutador"}</small></span>
        </button>
      </div>
    </header>`}bindTopbar(e=this.root){const t=e.querySelector('[data-action="toggle-sound"]');t&&t.addEventListener("click",()=>{this.audioMuted=!this.audioMuted,this.app.audio.master&&(this.app.audio.master.gain.value=this.audioMuted?0:.9),this.toast(this.audioMuted?"Som silenciado":"Som ativado","info",this.audioMuted?"volume":"music")})}saveNow(){Mt(this.save,!0),this.toast("Jogo salvo","success","check")}toast(e,t="info",n=""){if(!this.toastStack)return;const s=typeof e=="string"?{text:e,type:t,icon:n}:e||{},a=document.createElement("div");a.className=`toast ${s.type||""}`,a.innerHTML=`${s.icon?J(s.icon,17):""}<span>${V(s.text||"")}</span>`,this.toastStack.appendChild(a),setTimeout(()=>{a.classList.add("out"),setTimeout(()=>a.remove(),320)},s.type==="achievement"?4200:2600)}modal({title:e="",body:t="",actions:n=[],wide:s=!1,onClose:a=null,className:r=""}={}){this.closeModal();const o=document.createElement("div");return o.className="modal-backdrop",o.innerHTML=`<div class="modal ${s?"wide":""} ${r}">
      <h2>${e}</h2>
      <div class="modal-body">${t}</div>
      <div class="modal-actions">${n.map((c,l)=>`<button class="btn ${c.cls||""}" data-i="${l}">${c.label}</button>`).join("")}</div>
    </div>`,o.addEventListener("click",c=>{c.target===o&&this.closeModal(a)}),o.querySelectorAll(".modal-actions [data-i]").forEach(c=>{c.addEventListener("click",()=>{var h,d;const l=n[Number(c.dataset.i)];if(l){if(l.keepOpen){(h=l.onClick)==null||h.call(l,o);return}this.closeModal(),(d=l.onClick)==null||d.call(l,o)}})}),this.root.appendChild(o),this.modalEl={back:o,onClose:a},o}closeModal(e=null){if(!this.modalEl)return;const t=e||this.modalEl.onClose;if(this.modalEl.back.remove(),this.modalEl=null,t)try{t()}catch(n){console.warn(n)}}confirm({title:e="Confirmar",message:t="",confirmLabel:n="Confirmar",danger:s=!1,onConfirm:a=null,cancelLabel:r="Cancelar"}={}){return this.modal({title:e,body:`<p>${t}</p>`,actions:[{label:r,cls:"btn-ghost"},{label:n,cls:s?"btn-red":"btn-primary",onClick:a}]})}notify(e,t="info",n=""){this.toast({text:e,type:t,icon:n})}get hasCareer(){var e,t;return!!((t=(e=this.save)==null?void 0:e.profile)!=null&&t.created)}}function W_(i){ci.on("toast",e=>i.toast(e)),ci.on("achievement",e=>{e&&i.toast({text:`Conquista desbloqueada: ${e.name}`,type:"achievement",icon:e.icon})})}const X_=["strength","speed","stamina","precision","defense","reflexes","mobility","recovery","conditioning"],q_=["Frio","Explosivo","Confiante","Humilde","Provocador","Calculista","Showman","Guerreiro","Místico","Implacável"];function j_(i=Math.floor(Math.random()*1e9)){const e=fd("universe-"+i),t={seed:i,createdAt:new Date().toISOString(),fighters:[],divisions:{},champions:{},beltHistory:[],lastSim:null,season:new Date().getFullYear(),awards:[]};for(const n of pn){const s=[];for(let a=0;a<100;a++){const r=Y_(e,n,a,t,i);s.push(r),t.fighters.push(r)}t.divisions[n.id]={fighterIds:s.map(a=>a.id)},t.champions[n.id]={};for(let a=0;a<Ft.length;a++){const r=s[a];t.champions[n.id][Ft[a].id]=r.id,r.belts=[{org:Ft[a].id,type:"world",division:n.id,defenses:e.int(0,6),wonAt:ou(e,400)}],r.points+=400-a*60}for(let a=3;a<9;a++)s[a].belts=[{org:Ft[a%3].id,type:a<5?"continental":"international",division:n.id,defenses:e.int(0,3),wonAt:ou(e,300)}];s.sort((a,r)=>r.points-a.points)}return t.fighters.sort((n,s)=>s.points-n.points),t.lastSim=new Date().toISOString(),t}function ou(i,e){const t=new Date;return t.setDate(t.getDate()-i.int(20,e)),t.toISOString()}function Y_(i,e,t,n,s){const a=jh[i.int(0,jh.length-1)],r=Yh[i.int(0,Yh.length-1)];let o=ao[i.int(0,ao.length-1)];i.chance(.18)&&(o=ao[i.int(0,ao.length-1)]);const c=i.pick(Si).id,l=t<3?3:t<12?2:t<45?1:0,h=l===3?i.int(78,94):l===2?i.int(68,88):l===1?i.int(55,80):i.int(42,68),d={};for(const I of X_)d[I]=Ve(h+i.int(-12,12)+(t<10?5:0),30,97);const u=Bn[c].modifiers;d.strength=Ve(Math.round(d.strength*(u.power||1)),28,97),d.speed=Ve(Math.round(d.speed*(u.speed||1)),28,97),d.defense=Ve(Math.round(d.defense*(u.defense||1)),28,97);const p=l===3?i.int(24,46):l===2?i.int(16,34):l===1?i.int(7,24):i.int(1,14),g=l===3?i.int(0,5):l===2?i.int(1,9):l===1?i.int(2,12):i.int(0,9),v=i.chance(.18)?i.int(1,2):0,m=l===3?i.range(.35,.78):i.range(.15,.7),f=2+l*16+i.int(0,22),_=Math.round((l===3?1750:l===2?950:l===1?420:90)+i.range(-120,220)+p*8-g*3),b=l===3?i.int(26,36):i.int(18,37),M=Ve(.25+i.range(0,.8)+(e.id==="heavy"?.12:0),0,1);return{id:`${e.id}-${String(t).padStart(3,"0")}-${s%997}`,name:`${a} ${r}`,first:a,last:r,nick:o,nationality:Zi[i.int(0,Zi.length-1)].code,age:b,division:e.id,style:c,personality:i.pick(q_),attributes:d,overall:gr(d),height:Math.round(162+M*44),reach:Math.round(165+M*42+i.int(-4,8)),record:{w:p,l:g,d:v,ko:Math.round(p*m)},points:_,streak:l===3?i.int(1,12):i.int(-3,6),bestStreak:i.int(4,18),belts:[],rankSeed:t,reputation:f,form:i.shuffle(["V","V","V","D","V","E"]).slice(0,5),retired:!1,koRate:m,story:""}}function Ko(i,e){return i.fighters.filter(t=>t.division===e&&!t.retired)}function Ep(i,e,t=null,n=null){var a,r;let s=Ko(i,e).sort((o,c)=>c.points-o.points);if(n){const o=(r=(a=i.champions)==null?void 0:a[e])==null?void 0:r[n],c=s.find(l=>l.id===o);s=s.filter(l=>l.id!==o),c&&s.unshift(c)}if(t&&t.division===e){const o={...t,isPlayer:!0,points:t.points||12};s.push(o),s=s.sort((c,l)=>l.points-c.points)}return s.slice(0,100)}function xr(i,e,t){if(!i)return 100;const s=Ko(i,e).sort((a,r)=>r.points-a.points).findIndex(a=>a.points<t);return s===-1?100:s+1}function Os(i,e,t){var s,a;const n=(a=(s=i.champions)==null?void 0:s[e])==null?void 0:a[t];return i.fighters.find(r=>r.id===n)||null}function Tp(i){var e;return(((e=i==null?void 0:i.career)==null?void 0:e.belts)||[]).filter(t=>t.division===i.profile.division)}function K_(i){return Tp(i).filter(e=>["world","undisputed","supreme"].includes(e.tier))}function yd(i,e,t=3){var m;const n=Ns(i),s=i.profile.division,a=Ep(e,s),r=xr(e,s,n.points),o=[],c=new Set,l=Math.random,h=K_(i),d=Tp(i);if(h.length>0){const f=new Set(h.map(b=>b.org)),_=Ft.find(b=>!f.has(b.id));if(_){const b=Os(e,s,_.id);if(b&&!c.has(b.id)){c.add(b.id);const M=f.size>=2?"supreme":"undisputed";o.push(ro(i,e,b,{title:{org:_.id,tier:M,name:M==="supreme"?"Campeão dos Campeões":"Cinturão Absoluto"},purse:95e3+f.size*4e4,coins:1800,rounds:6,arenaId:"champions",hype:100,eventName:"TG UNIFICATION: "+_.short+" x TGB",rnd:l}))}}}if(o.length<1&&r<=2)for(const f of Ft){if(h.some(b=>b.org===f.id))continue;const _=Os(e,s,f.id);if(_&&!c.has(_.id)){c.add(_.id),o.push(ro(i,e,_,{title:{org:f.id,tier:"world",name:"Cinturão Mundial "+f.short},purse:7e4,coins:1200,rounds:6,arenaId:"champions",hype:95,eventName:"TG WORLD CHAMPIONSHIP",rnd:l}));break}}const u=a.filter(f=>!f.isPlayer&&!c.has(f.id)),p=Math.min(u.length-1,Math.max(0,r-4)),v=u.slice(Math.max(0,p-3),Math.min(u.length,p+16)).sort(()=>l()-.5);for(const f of v){if(o.length>=t)break;if(c.has(f.id))continue;c.add(f.id);const _=a.findIndex(w=>w.id===f.id)+1,b=Ve(Math.abs(r-_),1,50),M=Math.round((1600+b*420+i.career.reputation*120)/50)*50;let I=null;if(d.length&&_<=6&&r<=8){const w=Ft[Math.floor(l()*Ft.length)],E=_<=2?"interim":r<_?"national":"international";I={org:w.id,tier:E,name:((m=Da.find(C=>C.id===E))==null?void 0:m.name)||"Cinturão"}}o.push(ro(i,e,f,{title:I,purse:Math.max(1200,M),coins:Math.round(M/45),rounds:M>12e3?6:M>5e3?4:3,arenaId:J_(r,l),hype:Ve(30+(100-r)*.6+l()*15,20,100),rnd:l}))}for(;o.length<t;){const f=a.filter(b=>!b.isPlayer&&!c.has(b.id)).slice(-1)[0]||a.find(b=>!b.isPlayer);if(!f||c.has(f.id))break;c.add(f.id);const _=Math.max(800,Math.round((1200+i.career.reputation*100)/50)*50);o.push(ro(i,e,f,{purse:_,coins:Math.round(_/50),rounds:3,arenaId:"neighborhood",hype:25,rnd:l}))}return o.forEach((f,_)=>{f.id="offer"+Date.now().toString(36)+_}),o}function J_(i,e){return i<=3?e()>.4?"champions":"vegas":i<=10?["national","tokyo","vegas","london","newyork","dubai"][Math.floor(e()*6)]:i<=30?["municipal","national","manila","berlin","seoul"][Math.floor(e()*5)]:i<=60?["neighborhood","municipal","underground"][Math.floor(e()*3)]:["neighborhood","municipal"][Math.floor(e()*2)]}function ro(i,e,t,{title:n=null,purse:s=2e3,coins:a=50,rounds:r=3,arenaId:o="neighborhood",hype:c=40,eventName:l=null,rnd:h=Math.random}){const d=Do.find(g=>g.id===o)||Do[0],u=new Date(i.career.date);u.setDate(u.getDate()+14+Math.floor(h()*18));const p=Bn[t.style]||Si[2];return{id:"offer"+Math.random().toString(36).slice(2,8),opponentId:t.id,opponent:{id:t.id,name:t.name,nick:t.nick,nationality:t.nationality,record:{...t.record},style:t.style,overall:t.overall,attributes:{...t.attributes},age:t.age,height:t.height,reach:t.reach,points:t.points},title:n,purse:s,coinReward:Math.max(40,Math.round(s/40)),rounds:r,arenaId:d.id,arenaName:d.name,city:d.city,date:u.toISOString(),eventName:l||`${iu[Math.floor(h()*iu.length)]}: ${nu[Math.floor(h()*nu.length)]}`,hype:Math.round(c),difficulty:s>3e4?"elite":(s>1e4,"pro"),styleName:p.name,accepted:!1,negotiated:!1,purseBoost:0,callout:ei.callout[Math.floor(h()*ei.callout.length)]}}function Z_(i){if(i.negotiated)return{ok:!1,message:"A melhor oferta já foi feita."};i.negotiated=!0;const e=.12+Math.random()*.15;return i.purseBoost=Math.round(i.purse*e),i.purse+=i.purseBoost,i.coinReward+=Math.round(i.coinReward*e),{ok:!0,amount:i.purseBoost,message:`Bônus de negociação: +${i.purseBoost} moedas e +${Math.round(i.coinReward*e)} TG.`}}function Q_(i,e,t=Math.random){const n=i.overall+(i.isPlayer,0),s=e.overall,a=1/(1+Math.pow(10,(s-n)/32)),r=t()<a,o=r?i:e,c=r?e:i,l=Ve(.18+Math.abs(n-s)/140+(o.koRate||.3)*.35,.12,.72),h=t()<l?"KO":t()<.08?"TKO":t()<.07?"DRAW":"DEC";if(h==="DRAW")return{winner:null,loser:null,method:"DRAW",round:null};const d=h==="DEC"?null:1+Math.floor(t()*8);return{winner:o,loser:c,method:h,round:d,winnerA:r}}function Jo(i,e,t=2){if(!i)return[];const n=[],s=Math.random;for(let a=0;a<t;a++){const r=pn[Math.floor(s()*pn.length)],o=Ko(i,r.id).slice(0,40);if(o.length<4)continue;const c=o[Math.floor(s()*o.length)];let l=o[Math.floor(s()*o.length)],h=0;for(;l.id===c.id&&h++<10;)l=o[Math.floor(s()*o.length)];if(c.id===l.id)continue;const d=Q_(c,l,s);if(d.winner){if(e1(i,d,{title:!1}),s()<.55){const u=Cp(i,d,r.id,!1,!1);u&&(e&&Un(e,u),n.push(u))}if(s()<.35&&e){const u=bd(i,e,r.id);u&&(Un(e,u),n.push(u))}}}return i.lastSim=new Date().toISOString(),n}function e1(i,e,{title:t=!1,divisionId:n=null}={}){const{winner:s,loser:a,method:r}=e;if(!s||!a)return;s.record.w++,a.record.l++,(r==="KO"||r==="TKO")&&s.record.ko++,s.streak=Math.max(1,s.streak+1),a.streak=Math.min(-1,a.streak-1),s.streak>s.bestStreak&&(s.bestStreak=s.streak),s.form=["V",...s.form].slice(0,5),a.form=["D",...a.form].slice(0,5);const o=Ve(1+(100-(a.rankSeed||50))/90,.4,2.2),c=Math.round((r==="DEC"?45:70)*o);s.points+=c,a.points=Math.max(10,a.points-Math.round(c*.6)),s.reputation=Ve(s.reputation+2,0,100),a.reputation=Ve(a.reputation-1,0,100),t&&(s.belts=s.belts||[],s.belts.push({org:e.org,type:e.tier||"world",division:n,wonAt:new Date().toISOString(),defenses:0}))}function Cp(i,e,t,n=!1,s=!1){var d;if(!(e!=null&&e.winner))return null;const a=xn[t]||pn[6],r=e.winner,o=e.loser,c=e.method==="DEC"?"decisão unânime":e.method==="KO"?`nocaute no round ${e.round}`:`nocaute técnico no round ${e.round}`,l=[`${r.name} vence ${o.name} e sobe no ranking dos ${a.name.toLowerCase()}s`,`Noite de ${r.nick||"glória"}: ${r.name} domina e vence por ${c}`,`${r.name} confirma favoritismo e bate ${o.name}`,`Impacto: ${r.name} nocauteia ${o.name} e pede title shot`,`${r.name} mostra por que é um nome a se temer na divisão`],h=n?`${r.name} brilha e vence ${o.name} por ${c}`:l[Math.floor(Math.random()*l.length)];return{cat:s?"title":"results",title:h,subtitle:`${r.name} (${r.record.w}-${r.record.l}-${r.record.d}) derrota ${o.name} (${o.record.w}-${o.record.l}-${o.record.d}) em ${c}.`,body:`A divisão dos ${a.name.toLowerCase()}s ganhou mais um capítulo nesta noite. ${r.name}, ${r.age} anos, ${r.personality.toLowerCase()}, impôs seu ritmo desde o primeiro round. ${r.nick?`Conhecido como "${r.nick}", `:""}o lutador usou ${(d=Bn[r.style])==null?void 0:d.name.toLowerCase()} para neutralizar ${o.name}.

Com o resultado, ${r.name} chega a ${r.record.w} vitórias e ${r.record.ko} nocautes. ${e.method==="DEC"?"Os juízes não tiveram dúvidas.":"O árbitro não teve alternativa senão interromper a luta."} O próximo passo pode ser uma disputa de cinturão.`,tag:s?"TÍTULO":"RESULTADO",division:t,fighterIds:[r.id,o.id],hero:{name:r.name,nick:r.nick,nationality:r.nationality,color:a.color},imageSeed:Math.floor(Math.random()*1e3),featured:s}}function t1(i,e,t,n,s,a,r){var d;const o=xn[n],c=Ft.find(u=>u.id===s)||Ft[0],l=((d=Da.find(u=>u.id===a))==null?void 0:d.name)||"Cinturão Mundial";return{cat:"title",title:`${e.name} conquista o ${l} ${c.short} dos ${o.name.toLowerCase()}s`,subtitle:e.id==="player"?`${r.profile.name} vence ${t.name} e escreve seu nome na história.`:`${e.name} supera ${t.name} e é o novo campeão ${c.short}.`,body:`O ${l} ${c.short} tem um novo dono. ${e.name} venceu ${t.name} em uma luta que parou a arena e agora carrega o cinturão dos ${o.name.toLowerCase()}s.

${ei.win[Math.floor(Math.random()*ei.win.length)]}

A organização já prepara a primeira defesa obrigatória. O ranking da divisão será atualizado nesta semana.`,tag:"CAMPEONATO",division:n,fighterIds:[e.id,t.id],hero:{name:e.name,nick:e.nick,nationality:e.nationality,color:c.color},imageSeed:Math.floor(Math.random()*1e3),featured:!0}}function bd(i,e,t){const n=xn[t]||pn[Math.floor(Math.random()*pn.length)],s=Ko(i,n.id);if(!s.length)return null;const a=s[Math.floor(Math.random()*Math.min(30,s.length))],r=s[Math.floor(Math.random()*Math.min(50,s.length))],o=[{cat:"rivalries",tag:"RIVALIDADE",title:`Clima tenso: ${a.name} provoca ${r.name} antes de possível confronto`,subtitle:`"${ei.callout[Math.floor(Math.random()*ei.callout.length)]}"`,body:`Fontes próximas à organização afirmam que a rivalidade entre ${a.name} e ${r.name} pode render uma luta explosiva. Os dois já se provocaram em entrevistas e a federação estuda uma eliminatória.`},{cat:"transfers",tag:"CONTRATO",title:`${a.name} assina novo contrato e promete título`,subtitle:"Acordo inclui bônus por nocaute e uma futura disputa de cinturão.",body:`${a.name} renovou com sua promotora por mais três lutas. O lutador, de ${a.age} anos, disse que recusou propostas para permanecer na divisão dos ${n.name.toLowerCase()}s e buscar o título ${Ft[Math.floor(Math.random()*3)].short}.`},{cat:"rankings",tag:"RANKING",title:`Movimentação no ranking: ${a.name} entra no TOP 10`,subtitle:"Sequência de vitórias coloca o lutador na disputa por uma chance pelo título.",body:`A atualização semanal do ranking dos ${n.name.toLowerCase()}s trouxe mudanças importantes. ${a.name} subiu posições após sua última vitória e agora aparece entre os dez melhores. ${r.name}, por outro lado, caiu após resultado negativo.`},{cat:"records",tag:"RECORDE",title:`${a.name} alcança ${a.record.w} vitórias e entra para a história da divisão`,subtitle:"Lutador segue em busca de uma oportunidade pelo cinturão mundial.",body:`Com a carreira consolidada, ${a.name} alcançou ${a.record.w} vitórias, sendo ${a.record.ko} por nocaute. O cartel impressiona e coloca o nome do atleta entre os mais respeitados dos ${n.name.toLowerCase()}s.`},{cat:"interviews",tag:"ENTREVISTA",title:`"${a.nick||"O campeão"}": ${a.name} abre o jogo sobre o próximo passo`,subtitle:"Lutador fala de treinos, rivalidade e o sonho do cinturão.",body:`${a.name} concedeu entrevista coletiva e não fugiu de perguntas. "${ei.respectful[Math.floor(Math.random()*ei.respectful.length)]}", declarou. O treinador completou: "${ei.coach[Math.floor(Math.random()*ei.coach.length)]}".`}];return{...o[Math.floor(Math.random()*o.length)],division:n.id,fighterIds:[a.id,r.id],hero:{name:a.name,nick:a.nick,nationality:a.nationality,color:n.color},imageSeed:Math.floor(Math.random()*1e3)}}function Ap(i,e,t=14){var a,r,o,c;const n=Math.random,s=pn.slice();for(let l=0;l<t;l++){const h=s[Math.floor(n()*s.length)],d=Ft.map(p=>Os(e,h.id,p.id)).filter(Boolean),u=d[Math.floor(n()*d.length)];if(u&&l<5)Un(i,{cat:"title",tag:"CAMPEÃO",title:`${u.name} segue no topo dos ${h.name.toLowerCase()}s`,subtitle:`Campeão ${((a=Ft.find(p=>{var g,v;return p.id===((v=(g=u.belts)==null?void 0:g[0])==null?void 0:v.org)}))==null?void 0:a.short)||"TGB"} defende invicto há ${((o=(r=u.belts)==null?void 0:r[0])==null?void 0:o.defenses)??2} lutas.`,body:`${u.name}, ${u.age} anos, é o atual campeão dos ${h.name.toLowerCase()}s. Com cartel de ${u.record.w}-${u.record.l}-${u.record.d} e ${u.record.ko} nocautes, ele é considerado um dos lutadores mais perigosos do circuito. Seu estilo ${(c=Bn[u.style])==null?void 0:c.name.toLowerCase()} impõe respeito a qualquer desafiante.`,division:h.id,hero:{name:u.name,nick:u.nick,nationality:u.nationality,color:h.color},imageSeed:Math.floor(n()*1e3),featured:l===0});else{const p=bd(e,i,h.id);p&&Un(i,p)}}return Un(i,{cat:"upcoming",tag:"PRÓXIMA LUTA",title:"TG BOXING anuncia nova temporada de eventos mundiais",subtitle:"Calendário terá etapas no Brasil, Japão, EUA e Oriente Médio.",body:"A TG BOXING confirmou o calendário internacional da temporada. A promessa é de eventos em 15 arenas, eliminatórias continentais e uma noite final no TG Coliseum of Champions. Fique de olho nas próximas lutas.",division:"middle",hero:{name:"TG BOXING",nick:"The Glory of Champions",nationality:"TGB",color:"#f2c14e"},imageSeed:1,featured:!0}),i.career.news}function n1(i,e){const t=i?i.fighters.slice():[],n=e?Ns(e):null;n&&t.push({...n,koRate:n.record.w?n.record.ko/n.record.w:0,bestStreak:e.career.bestStreak,reputation:e.career.reputation,belts:e.career.belts,form:[]});const s=t.filter(r=>!r.retired),a=r=>s.slice().sort(r).slice(0,10);return{mostWins:a((r,o)=>o.record.w-r.record.w),mostKos:a((r,o)=>o.record.ko-r.record.ko),longestStreak:a((r,o)=>(o.bestStreak||0)-(r.bestStreak||0)),mostDefenses:a((r,o)=>{const c=(r.belts||[]).reduce((h,d)=>h+(d.defenses||0),0);return(o.belts||[]).reduce((h,d)=>h+(d.defenses||0),0)-c}),mostTitles:a((r,o)=>(o.belts||[]).length-(r.belts||[]).length)}}function i1(i,e){var c;const t=e?e.fighters.filter(l=>!l.retired):[],n=Ns(i),s=n?n.record.w*4+n.record.ko*3+i.career.reputation*2+i.career.belts.length*40:0,a=t.slice().sort((l,h)=>{var d,u;return h.record.w*4+h.record.ko*3+(((d=h.belts)==null?void 0:d.length)||0)*40-(l.record.w*4+l.record.ko*3+(((u=l.belts)==null?void 0:u.length)||0)*40)})[0],r=s>(a?a.record.w*4+a.record.ko*3+(((c=a.belts)==null?void 0:c.length)||0)*40:0)?n:a;return m_.map(l=>{let h=r;return l.id==="ko"&&(h=n&&n.record.ko>=((a==null?void 0:a.record.ko)||0)?n:a),l.id==="prospect"&&(h=n&&i.career.record.w<=12?n:t.filter(d=>d.age<=24).sort((d,u)=>u.record.w-d.record.w)[0]),l.id==="rivalry"&&(h=n&&i.career.rivalries.length?n:t[0]),l.id==="coach"&&(h={name:i.profile.name+"'s corner",nick:"Treinador do ano",isCoach:!0}),{...l,year:i.career.season.year,winner:h?{name:h.name,nick:h.nick,id:h.id,isPlayer:h.isPlayer}:{name:"TG Boxing",nick:""}}})}const tr=[{id:"power",name:"Trabalho de Potência",icon:"fist",attrs:["strength","conditioning"],cost:1,desc:"Saco pesado, pliometria e explosão. Aumenta Força."},{id:"speed",name:"Mãos Rápidas",icon:"bolt",attrs:["speed","precision"],cost:1,desc:"Velocidade de reação e combinações no mitt. Aumenta Velocidade."},{id:"stamina",name:"Base Aeróbica",icon:"lungs",attrs:["stamina","conditioning"],cost:1,desc:"Corrida, corda e rounds infinitos. Aumenta Resistência."},{id:"defense",name:"Guarda e Esquiva",icon:"shield",attrs:["defense","reflexes"],cost:1,desc:"Sparring defensivo e leitura de golpes. Aumenta Defesa."},{id:"footwork",name:"Pés de Dançarino",icon:"feet",attrs:["mobility","speed"],cost:1,desc:"Escada de agilidade e ângulos. Aumenta Mobilidade."},{id:"recovery",name:"Recuperação e Respiração",icon:"heart",attrs:["recovery","stamina"],cost:1,desc:"Controle de respiração e descanso ativo. Aumenta Recuperação."}];function _d(i,e,t=3){return!i||!e?[]:((!i.career.offers||i.career.offers.length===0)&&(i.career.offers=yd(i,e,t)),i.career.offers)}function s1(i,e){return e?i.career.activeOffer?{ok:!1,message:"Você já tem um contrato assinado. Cumpra ou cancele antes."}:(e.accepted=!0,i.career.activeOffer=e,i.career.nextEvent={name:e.eventName,date:e.date,arena:e.arenaName,city:e.city,purse:e.purse},i.career.daysUntilFight=Math.max(1,Math.ceil((new Date(e.date)-new Date(i.career.date))/864e5)),Un(i,{cat:"upcoming",tag:"CONTRATO",title:`${i.profile.name} aceita desafio contra ${e.opponent.name}`,subtitle:`${e.eventName} · ${e.arenaName}, ${e.city} · Bolsa de C$ ${e.purse.toLocaleString("pt-BR")}.`,body:`${i.profile.name} assinou o contrato para enfrentar ${e.opponent.name} (${e.opponent.record.w}-${e.opponent.record.l}-${e.opponent.record.d}) em ${g_(e.date)}. O confronto será realizado na ${e.arenaName}, em ${e.city}. A bolsa acertada é de C$ ${e.purse.toLocaleString("pt-BR")}, com ${e.coinReward} TG COIN de bônus.`,division:i.profile.division,hero:{name:i.profile.name,nick:i.profile.nickname,nationality:i.profile.nationality},imageSeed:7,featured:!0}),{ok:!0}):{ok:!1,message:"Oferta inválida."}}function a1(i){if(!i.career.activeOffer)return;const e=i.career.activeOffer;e.accepted=!1,i.career.activeOffer=null,i.career.nextEvent=null,i.career.daysUntilFight=null,Un(i,{cat:"transfers",tag:"CONTRATO",title:`${i.profile.name} cancela luta contra ${e.opponent.name}`,subtitle:"A promoter busca um novo adversário para a data.",body:`A equipe de ${i.profile.name} informou que a luta contra ${e.opponent.name} foi cancelada por motivos contratuais. A comissão deve anunciar um substituto em breve.`,division:i.profile.division,hero:{name:i.profile.name,nick:i.profile.nickname},imageSeed:9})}function r1(i,e,t){if(i.career.offers=(i.career.offers||[]).filter(n=>n.id!==t),e&&i.career.offers.length<3){const n=yd(i,e,3-i.career.offers.length),s=new Set(i.career.offers.map(a=>a.opponentId));i.career.offers.push(...n.filter(a=>!s.has(a.opponentId)).slice(0,3-i.career.offers.length))}}function Rp(i,e,t=7){return Sp(i,t),i.career.training.sessionsLeft=4,i.career.training.fatigue=Math.max(0,(i.career.training.fatigue||0)-55),i.career.date=i.career.date,Jo(e,i,2),i.career.training}function o1(i,e,t,n=.72){const s=tr.find(d=>d.id===t);if(!s)return{ok:!1,message:"Treino inválido."};if(i.career.training.sessionsLeft<=0)return{ok:!1,message:"Sem sessões hoje. Descanse para recuperar a energia."};const a=i.career.training.fatigue||0,r=Ve(1-a/180,.55,1.05),o=Ve(.72+n*.72,.72,1.42),c={},l=Object.entries(i.career.boosters||{}).find(([,d])=>d>0),h=!!l;for(const d of s.attrs){const u=E_(i,d),p=h?1.08:1,g=(1.15+Math.random()*1.55)*r*o*(1+u)*p,v=Math.max(1,Math.round(g)),m=i.profile.attributes[d]||42;i.profile.attributes[d]=Math.min(99,m+v),c[d]=i.profile.attributes[d]-m}return l&&(i.career.boosters[l[0]]=Math.max(0,l[1]-1)),i.career.training.sessionsLeft--,i.career.training.totalSessions++,i.career.training.fatigue=Ve(a+13,0,100),i.career.training.lastDrill=t,i.career.points+=1,Sp(i,1),Math.random()<.3&&Jo(e,i,1),{ok:!0,gains:c,drill:s,fatigue:i.career.training.fatigue}}function c1(i,e){const t=i.career.rankHistory[i.career.rankHistory.length-1];(!t||t.rank!==e)&&(i.career.rankHistory.push({date:i.career.date,rank:e,points:i.career.points}),i.career.rankHistory.length>120&&i.career.rankHistory.shift())}function l1(i,e,t){const n=i.career,s=xr(e,i.profile.division,n.points);return c1(i,s),n.record.w>=1&&kn(i,"first_win"),n.record.ko>=1&&kn(i,"first_ko"),n.streak>=5&&kn(i,"streak5"),n.belts.length>=1&&kn(i,"title"),n.belts.some(a=>["world","undisputed","supreme"].includes(a.tier))&&kn(i,"world"),s===1&&kn(i,"top1"),n.record.ko>=10&&kn(i,"ko10"),n.belts.some(a=>(a.defenses||0)>=3)&&kn(i,"defend3"),n.money>=25e3&&kn(i,"rich"),new Set(n.foughtArenas).size>=5&&kn(i,"traveler"),n.belts.filter(a=>["world","undisputed","supreme"].includes(a.tier)).length>=3&&kn(i,"undisputed"),n.reputation>=100&&kn(i,"legend"),s}function cu(i){var e;return((e=Da.find(t=>t.id===i))==null?void 0:e.prestige)||1}function d1({save:i,universe:e,result:t,offer:n,division:s,arenaId:a}){var D,P,te,ae;if(!i||!t)return{ok:!1,message:"Resultado inválido."};const r=t.matchId||"m"+Date.now().toString(36);if(i.career.appliedMatches||(i.career.appliedMatches=[]),i.career.appliedMatches.includes(r))return{ok:!1,message:"Este resultado já foi registrado."};const o=i.career,c=(n==null?void 0:n.opponent)||{},l=t.winnerId==="p1",h=!t.winnerId,d=t.method||"DEC",u=l&&(d==="KO"||d==="TKO"),p=s||i.profile.division,g=xn[p]||xn.middle;o.record.w+=l?1:0,o.record.l+=!l&&!h?1:0,o.record.d+=h?1:0,o.record.ko+=u?1:0,o.streak=l?Math.max(1,o.streak+1):h?0:Math.min(-1,o.streak-1),o.bestStreak=Math.max(o.bestStreak,o.streak),o.totalPurse+=(n==null?void 0:n.purse)||0,o.season.fights++,o.season.wins+=l?1:0,o.season.kos+=u?1:0,new Date(o.date).getFullYear()!==o.season.year&&(o.season={year:new Date(o.date).getFullYear(),fights:0,wins:0,kos:0,defenses:0,bestWin:null});const v=l?6:h?1:-4;o.reputation=Ve(o.reputation+v,0,100);const m=l?u?190:145:h?35:-25,f=Math.round(((n==null?void 0:n.hype)||40)*.55),_=n!=null&&n.title?80:0,b=o.points;o.points=Math.max(0,o.points+m+(l?f+_:0));const M=l?1:h?.72:.58,I=Math.round(((n==null?void 0:n.purse)||2e3)*M),w=o.sponsor?qi.find($=>$.id===o.sponsor):null,E=l&&w?o.sponsor==="sponsor_global"?900:200:0,C=l&&w&&o.sponsor==="sponsor_global"?20:0,U=l?1:h?.4:.22,y=Math.round(((n==null?void 0:n.coinReward)||50)*U)+C;Mp(i,I+E),ko(i,y,"Bolsa de luta");let x=null,N=null;if(n!=null&&n.title&&l){const $=o.belts.find(Q=>Q.org===n.title.org&&Q.division===p);if($)$.defenses=($.defenses||0)+1,$.lastDefendedAt=new Date().toISOString(),cu(n.title.tier)>=cu($.tier)&&($.tier=n.title.tier),$.level=n.title.tier,o.season.defenses++,x={...$,defense:!0};else{const Q={org:n.title.org,tier:n.title.tier,division:p,defenses:0,wonAt:new Date().toISOString(),opponent:c.name||"Desafiante",name:n.title.name};o.belts.push(Q),o.beltHistory.push({...Q,event:"won"}),x=Q}o.trophies.push({id:"trophy-"+Date.now().toString(36),name:n.title.name,org:n.title.org,date:new Date().toISOString(),division:p})}if(n!=null&&n.title&&!l){const $=o.belts.findIndex(Q=>Q.org===n.title.org&&Q.division===p);$>=0&&(N=o.belts.splice($,1)[0],o.beltHistory.push({...N,event:"lost",date:new Date().toISOString(),opponent:c.name}))}const O=e==null?void 0:e.fighters.find($=>$.id===c.id);O&&(l?(O.record.l++,O.points=Math.max(10,O.points-48),O.streak=Math.min(-1,O.streak-1),O.form=["D",...O.form||[]].slice(0,5)):h||(O.record.w++,u&&O.record.ko++,O.points+=52,O.streak=Math.max(1,O.streak+1),O.form=["V",...O.form||[]].slice(0,5)),n!=null&&n.title&&!l&&["world","undisputed","supreme"].includes(n.title.tier)&&((D=e.champions)!=null&&D[p])&&(e.champions[p][n.title.org]=O.id));const G={id:"fight-"+Date.now().toString(36),matchId:r,date:new Date().toISOString(),opponentId:c.id||null,opponentName:c.name||"Desafiante",opponentRecord:c.record||null,method:h?"DRAW":d,round:t.round||null,result:l?"V":h?"E":"D",purse:I,coins:y,title:(n==null?void 0:n.title)||null,arena:((P=Ss[a||(n==null?void 0:n.arenaId)])==null?void 0:P.name)||(n==null?void 0:n.arenaName)||"Arena",division:p,scorecards:t.scorecards||[],stats:t.stats||null,pointsBefore:b,pointsAfter:o.points};o.history.unshift(G),o.history.length>100&&(o.history.length=100),o.foughtArenas.includes(a)||o.foughtArenas.push(a),l&&(o.season.bestWin=c.name||o.season.bestWin);const F={id:"player",name:i.profile.name,nick:i.profile.nickname,nationality:i.profile.nationality,record:{...o.record},age:i.profile.age,style:i.profile.style,personality:((te=Bn[i.profile.style])==null?void 0:te.name)||"Determinado",belts:o.belts},R=Cp(e,{winner:l?F:O,loser:l?O:F,method:d,round:t.round},p,!0,!!(n!=null&&n.title));if(R&&Un(i,R),x){const $=t1(e,F,O||{name:c.name||"Desafiante",nationality:c.nationality},p,n.title.org,n.title.tier,i);Un(i,$)}N&&Un(i,{cat:"title",tag:"TÍTULO",title:`${i.profile.name} perde o ${((ae=Da.find($=>$.id===N.tier))==null?void 0:ae.name)||"cinturão"} para ${c.name||"o desafiante"}`,subtitle:"Uma noite amarga para o até então campeão.",body:`O reinado de ${i.profile.name} chegou ao fim. ${c.name||"O desafiante"} venceu por ${d} e levou o cinturão dos ${g.name.toLowerCase()}s. A revanche já é especulada nos bastidores.`,division:p,hero:{name:i.profile.name,nick:i.profile.nickname},imageSeed:3,featured:!0});const W=n!=null&&n.date?new Date(n.date).getTime():Date.now(),Y=new Date(Math.max(Date.now(),W+864e5));o.date=Y.toISOString(),o.activeOffer=null,o.nextEvent=null,o.daysUntilFight=null,o.offers=yd(i,e,3),Jo(e,i,2);const ie=l1(i,e);return o.appliedMatches.push(r),o.appliedMatches.length>60&&o.appliedMatches.shift(),{ok:!0,won:l,draw:h,method:d,ko:u,purse:I,sponsorMoney:E,coins:y,repDelta:v,pointsDelta:o.points-b,rank:ie,titleWon:x,titleLost:N,historyEntry:G,resultArticle:R,record:{...o.record},reputation:o.reputation,money:o.money,tgCoins:o.coins}}function h1(i,e){return e?i1(i,e):[]}function xd(i,e){return xr(e,i.profile.division,i.career.points)}function u1(i){var t;const e=[];for(const n of qi.filter(s=>s.type==="training")){const s=((t=i.career.boosters)==null?void 0:t[n.id])||0;s&&e.push({item:n,count:s})}return e}class p1{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const t of this._parts)e.push(t);return f1(e).buffer}}function f1(i){let e=0;for(const s of i)e+=s.byteLength;const t=new Uint8Array(e);let n=0;for(const s of i){const a=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);t.set(a,n),n+=s.byteLength}return t}function Pp(i){return new m1(i).unpack()}function Lp(i){const e=new g1,t=e.pack(i);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}class m1{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){const e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){const e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){const t=this.read(e);let n=0,s="",a,r;for(;n<e;)a=t[n],a<160?(r=a,n++):(a^192)<32?(r=(a&31)<<6|t[n+1]&63,n+=2):(a^224)<16?(r=(a&15)<<12|(t[n+1]&63)<<6|t[n+2]&63,n+=3):(r=(a&7)<<18|(t[n+1]&63)<<12|(t[n+2]&63)<<6|t[n+3]&63,n+=4),s+=String.fromCodePoint(r);return this.index+=e,s}unpack_array(e){const t=new Array(e);for(let n=0;n<e;n++)t[n]=this.unpack();return t}unpack_map(e){const t={};for(let n=0;n<e;n++){const s=this.unpack();t[s]=this.unpack()}return t}unpack_float(){const e=this.unpack_uint32(),t=e>>31,n=(e>>23&255)-127,s=e&8388607|8388608;return(t===0?1:-1)*s*2**(n-23)}unpack_double(){const e=this.unpack_uint32(),t=this.unpack_uint32(),n=e>>31,s=(e>>20&2047)-1023,r=(e&1048575|1048576)*2**(s-20)+t*2**(s-52);return(n===0?1:-1)*r}read(e){const t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}}class g1{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const t=e.constructor;if(e instanceof Array){const n=this.pack_array(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const n=e;this.pack_bin(new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(n=>{this.pack_bin(new Uint8Array(n)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){const n=this.pack_object(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const t=this._textEncoder.encode(e),n=t.length;if(n<=15)this.pack_uint8(176+n);else if(n<=65535)this._bufferBuilder.append(216),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(n);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){const t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");const n=s=>{if(s<t){const a=this.pack(e[s]);return a instanceof Promise?a.then(()=>n(s+1)):n(s+1)}};return n(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);const n=Math.floor(Math.log(e)/Math.LN2),s=e/2**n-1,a=Math.floor(s*2**52),r=2**32,o=t<<31|n+1023<<20|a/r&1048575,c=a%r;this._bufferBuilder.append(203),this.pack_int32(o),this.pack_int32(c)}pack_object(e){const t=Object.keys(e),n=t.length;if(n<=15)this.pack_uint8(128+n);else if(n<=65535)this._bufferBuilder.append(222),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(n);else throw new Error("Invalid length");const s=a=>{if(a<t.length){const r=t[a];if(e.hasOwnProperty(r)){this.pack(r);const o=this.pack(e[r]);if(o instanceof Promise)return o.then(()=>s(a+1))}return s(a+1)}};return s(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){const t=e/4294967296,n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const t=Math.floor(e/4294967296),n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}constructor(){this._bufferBuilder=new p1,this._textEncoder=new TextEncoder}}let Ip=!0,Dp=!0;function nr(i,e,t){const n=i.match(e);return n&&n.length>=t&&parseFloat(n[t],10)}function Bs(i,e,t){if(!i.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Md("Unable to polyfill events");return}const s=i.RTCPeerConnection.prototype,a=s.addEventListener;s.addEventListener=function(o,c){if(o!==e)return a.apply(this,arguments);const l=h=>{const d=t(h);d&&(c.handleEvent?c.handleEvent(d):c(d))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),a.apply(this,[o,l])};const r=s.removeEventListener;s.removeEventListener=function(o,c){if(o!==e||!this._eventMap||!this._eventMap[e])return r.apply(this,arguments);if(!this._eventMap[e].has(c))return r.apply(this,arguments);const l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,r.apply(this,[o,l])},Object.defineProperty(s,"on"+e,{get(){return this["_on"+e]},set(o){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),o&&this.addEventListener(e,this["_on"+e]=o)},enumerable:!0,configurable:!0})}function v1(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(Ip=i,i?"adapter.js logging disabled":"adapter.js logging enabled")}function y1(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(Dp=!i,"adapter.js deprecation warnings "+(i?"disabled":"enabled"))}function Md(){if(typeof window=="object"){if(Ip)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function Sd(i,e){Dp&&console.warn(i+" is deprecated, please use "+e+" instead.")}function b1(i){const e={browser:null,version:null};if(typeof i>"u"||!i.navigator||!i.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:t}=i;if(t.userAgentData&&t.userAgentData.brands){const n=t.userAgentData.brands.find(s=>s.brand==="Chromium");if(n){const s=parseInt(n.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(nr(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||i.isSecureContext===!1&&i.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(nr(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(i.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(nr(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=i.RTCRtpTransceiver&&"currentDirection"in i.RTCRtpTransceiver.prototype,e._safariVersion=nr(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function lu(i){return Object.prototype.toString.call(i)==="[object Object]"}function kp(i){return lu(i)?Object.keys(i).reduce(function(e,t){const n=lu(i[t]),s=n?kp(i[t]):i[t],a=n&&!Object.keys(s).length;return s===void 0||a?e:Object.assign(e,{[t]:s})},{}):i}function Ul(i,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(n=>{n.endsWith("Id")?Ul(i,i.get(e[n]),t):n.endsWith("Ids")&&e[n].forEach(s=>{Ul(i,i.get(s),t)})}))}function du(i,e,t){const n=t?"outbound-rtp":"inbound-rtp",s=new Map;if(e===null)return s;const a=[];return i.forEach(r=>{r.type==="track"&&r.trackIdentifier===e.id&&a.push(r)}),a.forEach(r=>{i.forEach(o=>{o.type===n&&o.trackId===r.id&&Ul(i,o,s)})}),s}const hu=Md;function Np(i,e){if(e.version>=64)return;const t=i&&i.navigator;if(!t.mediaDevices)return;const n=function(o){if(typeof o!="object"||o.mandatory||o.optional)return o;const c={};return Object.keys(o).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;const h=typeof o[l]=="object"?o[l]:{ideal:o[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);const d=function(u,p){return u?u+p.charAt(0).toUpperCase()+p.slice(1):p==="deviceId"?"sourceId":p};if(h.ideal!==void 0){c.optional=c.optional||[];let u={};typeof h.ideal=="number"?(u[d("min",l)]=h.ideal,c.optional.push(u),u={},u[d("max",l)]=h.ideal,c.optional.push(u)):(u[d("",l)]=h.ideal,c.optional.push(u))}h.exact!==void 0&&typeof h.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[d("",l)]=h.exact):["min","max"].forEach(u=>{h[u]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[d(u,l)]=h[u])})}),o.advanced&&(c.optional=(c.optional||[]).concat(o.advanced)),c},s=function(o,c){if(e.version>=61)return c(o);if(o=JSON.parse(JSON.stringify(o)),o&&typeof o.audio=="object"){const l=function(h,d,u){d in h&&!(u in h)&&(h[u]=h[d],delete h[d])};o=JSON.parse(JSON.stringify(o)),l(o.audio,"autoGainControl","googAutoGainControl"),l(o.audio,"noiseSuppression","googNoiseSuppression"),o.audio=n(o.audio)}if(o&&typeof o.video=="object"){let l=o.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});const h=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete o.video.facingMode;let d;if(l.exact==="environment"||l.ideal==="environment"?d=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(d=["front"]),d)return t.mediaDevices.enumerateDevices().then(u=>{u=u.filter(g=>g.kind==="videoinput");let p=u.find(g=>d.some(v=>g.label.toLowerCase().includes(v)));return!p&&u.length&&d.includes("back")&&(p=u[u.length-1]),p&&(o.video.deviceId=l.exact?{exact:p.deviceId}:{ideal:p.deviceId}),o.video=n(o.video),hu("chrome: "+JSON.stringify(o)),c(o)})}o.video=n(o.video)}return hu("chrome: "+JSON.stringify(o)),c(o)},a=function(o){return e.version>=64?o:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[o.name]||o.name,message:o.message,constraint:o.constraint||o.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},r=function(o,c,l){s(o,h=>{t.webkitGetUserMedia(h,c,d=>{l&&l(a(d))})})};if(t.getUserMedia=r.bind(t),t.mediaDevices.getUserMedia){const o=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return s(c,l=>o(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(d=>{d.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(a(h))))}}}function Op(i){i.MediaStream=i.MediaStream||i.webkitMediaStream}function Up(i,e){if(!(e.version>102))if(typeof i=="object"&&i.RTCPeerConnection&&!("ontrack"in i.RTCPeerConnection.prototype)){Object.defineProperty(i.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(n){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=n)},enumerable:!0,configurable:!0});const t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",a=>{let r;i.RTCPeerConnection.prototype.getReceivers?r=this.getReceivers().find(c=>c.track&&c.track.id===a.track.id):r={track:a.track};const o=new Event("track");o.track=a.track,o.receiver=r,o.transceiver={receiver:r},o.streams=[s.stream],this.dispatchEvent(o)}),s.stream.getTracks().forEach(a=>{let r;i.RTCPeerConnection.prototype.getReceivers?r=this.getReceivers().find(c=>c.track&&c.track.id===a.id):r={track:a};const o=new Event("track");o.track=a,o.receiver=r,o.transceiver={receiver:r},o.streams=[s.stream],this.dispatchEvent(o)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else Bs(i,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function Fp(i){if(typeof i=="object"&&i.RTCPeerConnection&&!("getSenders"in i.RTCPeerConnection.prototype)&&"createDTMFSender"in i.RTCPeerConnection.prototype){const e=function(s,a){return{track:a,get dtmf(){return this._dtmf===void 0&&(a.kind==="audio"?this._dtmf=s.createDTMFSender(a):this._dtmf=null),this._dtmf},_pc:s}};if(!i.RTCPeerConnection.prototype.getSenders){i.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const s=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(o,c){let l=s.apply(this,arguments);return l||(l=e(this,o),this._senders.push(l)),l};const a=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(o){a.apply(this,arguments);const c=this._senders.indexOf(o);c!==-1&&this._senders.splice(c,1)}}const t=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(a){this._senders=this._senders||[],t.apply(this,[a]),a.getTracks().forEach(r=>{this._senders.push(e(this,r))})};const n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(a){this._senders=this._senders||[],n.apply(this,[a]),a.getTracks().forEach(r=>{const o=this._senders.find(c=>c.track===r);o&&this._senders.splice(this._senders.indexOf(o),1)})}}else if(typeof i=="object"&&i.RTCPeerConnection&&"getSenders"in i.RTCPeerConnection.prototype&&"createDTMFSender"in i.RTCPeerConnection.prototype&&i.RTCRtpSender&&!("dtmf"in i.RTCRtpSender.prototype)){const e=i.RTCPeerConnection.prototype.getSenders;i.RTCPeerConnection.prototype.getSenders=function(){const n=e.apply(this,[]);return n.forEach(s=>s._pc=this),n},Object.defineProperty(i.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Bp(i,e){if(e.version>=67||!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender&&i.RTCRtpReceiver))return;if(!("getStats"in i.RTCRtpSender.prototype)){const n=i.RTCPeerConnection.prototype.getSenders;n&&(i.RTCPeerConnection.prototype.getSenders=function(){const r=n.apply(this,[]);return r.forEach(o=>o._pc=this),r});const s=i.RTCPeerConnection.prototype.addTrack;s&&(i.RTCPeerConnection.prototype.addTrack=function(){const r=s.apply(this,arguments);return r._pc=this,r}),i.RTCRtpSender.prototype.getStats=function(){const r=this;return this._pc.getStats().then(o=>du(o,r.track,!0))}}if(!("getStats"in i.RTCRtpReceiver.prototype)){const n=i.RTCPeerConnection.prototype.getReceivers;n&&(i.RTCPeerConnection.prototype.getReceivers=function(){const a=n.apply(this,[]);return a.forEach(r=>r._pc=this),a}),Bs(i,"track",s=>(s.receiver._pc=s.srcElement,s)),i.RTCRtpReceiver.prototype.getStats=function(){const a=this;return this._pc.getStats().then(r=>du(r,a.track,!1))}}if(!("getStats"in i.RTCRtpSender.prototype&&"getStats"in i.RTCRtpReceiver.prototype))return;const t=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof i.MediaStreamTrack){const s=arguments[0];let a,r,o;return this.getSenders().forEach(c=>{c.track===s&&(a?o=!0:a=c)}),this.getReceivers().forEach(c=>(c.track===s&&(r?o=!0:r=c),c.track===s)),o||a&&r?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):a?a.getStats():r?r.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function $p(i){i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(r=>this._shimmedLocalStreams[r][0])};const e=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(r,o){if(!o)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[o.id]?this._shimmedLocalStreams[o.id].indexOf(c)===-1&&this._shimmedLocalStreams[o.id].push(c):this._shimmedLocalStreams[o.id]=[o,c],c};const t=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(r){this._shimmedLocalStreams=this._shimmedLocalStreams||{},r.getTracks().forEach(l=>{if(this.getSenders().find(d=>d.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});const o=this.getSenders();t.apply(this,arguments);const c=this.getSenders().filter(l=>o.indexOf(l)===-1);this._shimmedLocalStreams[r.id]=[r].concat(c)};const n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(r){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[r.id],n.apply(this,arguments)};const s=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(r){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},r&&Object.keys(this._shimmedLocalStreams).forEach(o=>{const c=this._shimmedLocalStreams[o].indexOf(r);c!==-1&&this._shimmedLocalStreams[o].splice(c,1),this._shimmedLocalStreams[o].length===1&&delete this._shimmedLocalStreams[o]}),s.apply(this,arguments)}}function zp(i,e){if(!i.RTCPeerConnection)return;if(i.RTCPeerConnection.prototype.addTrack&&e.version>=65)return $p(i);const t=i.RTCPeerConnection.prototype.getLocalStreams;i.RTCPeerConnection.prototype.getLocalStreams=function(){const h=t.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(d=>this._reverseStreams[d.id])};const n=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(d=>{if(this.getSenders().find(p=>p.track===d))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){const d=new i.MediaStream(h.getTracks());this._streams[h.id]=d,this._reverseStreams[d.id]=h,h=d}n.apply(this,[h])};const s=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},i.RTCPeerConnection.prototype.addTrack=function(h,d){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const u=[].slice.call(arguments,1);if(u.length!==1||!u[0].getTracks().find(v=>v===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(v=>v.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const g=this._streams[d.id];if(g)g.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const v=new i.MediaStream([h]);this._streams[d.id]=v,this._reverseStreams[v.id]=d,this.addStream(v)}return this.getSenders().find(v=>v.track===h)};function a(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(u=>{const p=l._reverseStreams[u],g=l._streams[p.id];d=d.replace(new RegExp(g.id,"g"),p.id)}),new RTCSessionDescription({type:h.type,sdp:d})}function r(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(u=>{const p=l._reverseStreams[u],g=l._streams[p.id];d=d.replace(new RegExp(p.id,"g"),g.id)}),new RTCSessionDescription({type:h.type,sdp:d})}["createOffer","createAnswer"].forEach(function(l){const h=i.RTCPeerConnection.prototype[l],d={[l](){const u=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[g=>{const v=a(this,g);u[0].apply(null,[v])},g=>{u[1]&&u[1].apply(null,g)},arguments[2]]):h.apply(this,arguments).then(g=>a(this,g))}};i.RTCPeerConnection.prototype[l]=d[l]});const o=i.RTCPeerConnection.prototype.setLocalDescription;i.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?o.apply(this,arguments):(arguments[0]=r(this,arguments[0]),o.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(i.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(i.RTCPeerConnection.prototype,"localDescription",{get(){const l=c.get.apply(this);return l.type===""?l:a(this,l)}}),i.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let u;Object.keys(this._streams).forEach(p=>{this._streams[p].getTracks().find(v=>h.track===v)&&(u=this._streams[p])}),u&&(u.getTracks().length===1?this.removeStream(this._reverseStreams[u.id]):u.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Fl(i,e){!i.RTCPeerConnection&&i.webkitRTCPeerConnection&&(i.RTCPeerConnection=i.webkitRTCPeerConnection),i.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const n=i.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[t]=s[t]})}function Gp(i,e){e.version>102||Bs(i,"negotiationneeded",t=>{const n=t.target;if(!((e.version<72||n.getConfiguration&&n.getConfiguration().sdpSemantics==="plan-b")&&n.signalingState!=="stable"))return t})}const uu=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:Gp,shimAddTrackRemoveTrack:zp,shimAddTrackRemoveTrackWithNative:$p,shimGetSendersWithDtmf:Fp,shimGetUserMedia:Np,shimMediaStream:Op,shimOnTrack:Up,shimPeerConnection:Fl,shimSenderReceiverGetStats:Bp},Symbol.toStringTag,{value:"Module"}));function Hp(i,e){const t=i&&i.navigator;if(!t.mediaDevices)return;const n=i&&i.MediaStreamTrack;if(t.getUserMedia=function(s,a,r){Sd("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(s).then(a,r)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){const s=function(r,o,c){o in r&&!(c in r)&&(r[c]=r[o],delete r[o])},a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(r){return typeof r=="object"&&typeof r.audio=="object"&&(r=JSON.parse(JSON.stringify(r)),s(r.audio,"autoGainControl","mozAutoGainControl"),s(r.audio,"noiseSuppression","mozNoiseSuppression")),a(r)},n&&n.prototype.getSettings){const r=n.prototype.getSettings;n.prototype.getSettings=function(){const o=r.apply(this,arguments);return s(o,"mozAutoGainControl","autoGainControl"),s(o,"mozNoiseSuppression","noiseSuppression"),o}}if(n&&n.prototype.applyConstraints){const r=n.prototype.applyConstraints;n.prototype.applyConstraints=function(o){return this.kind==="audio"&&typeof o=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o,"autoGainControl","mozAutoGainControl"),s(o,"noiseSuppression","mozNoiseSuppression")),r.apply(this,[o])}}}}function _1(i,e){i.navigator.mediaDevices&&(i.navigator.mediaDevices&&"getDisplayMedia"in i.navigator.mediaDevices||(i.navigator.mediaDevices.getDisplayMedia=function(n){if(!(n&&n.video)){const s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return n.video===!0?n.video={mediaSource:e}:n.video.mediaSource=e,i.navigator.mediaDevices.getUserMedia(n)}))}function Vp(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Bl(i,e){typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||(!i.RTCPeerConnection&&i.mozRTCPeerConnection&&(i.RTCPeerConnection=i.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const n=i.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[t]=s[t]}))}function Wp(i,e){if(typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||e.version>=151)return;const t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},n=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){const[a,r,o]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):n.apply(this,[a||null]).then(c=>{if(e.version<53&&!r)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((h,d)=>{c.set(d,Object.assign({},h,{type:t[h.type]||h.type}))})}return c}).then(r,o)}}function Xp(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpSender.prototype)return;const e=i.RTCPeerConnection.prototype.getSenders;e&&(i.RTCPeerConnection.prototype.getSenders=function(){const s=e.apply(this,[]);return s.forEach(a=>a._pc=this),s});const t=i.RTCPeerConnection.prototype.addTrack;t&&(i.RTCPeerConnection.prototype.addTrack=function(){const s=t.apply(this,arguments);return s._pc=this,s}),i.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function qp(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpReceiver.prototype)return;const e=i.RTCPeerConnection.prototype.getReceivers;e&&(i.RTCPeerConnection.prototype.getReceivers=function(){const n=e.apply(this,[]);return n.forEach(s=>s._pc=this),n}),Bs(i,"track",t=>(t.receiver._pc=t.srcElement,t)),i.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function jp(i){!i.RTCPeerConnection||"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(t){Sd("removeStream","removeTrack"),this.getSenders().forEach(n=>{n.track&&t.getTracks().includes(n.track)&&this.removeTrack(n)})})}function Yp(i){i.DataChannel&&!i.RTCDataChannel&&(i.RTCDataChannel=i.DataChannel)}function Kp(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;const t=i.RTCPeerConnection.prototype.addTransceiver;t&&(i.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];const a=s.length>0;a&&s.forEach(o=>{if("rid"in o&&!/^[a-z0-9]{0,16}$/i.test(o.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in o&&!(parseFloat(o.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in o&&!(parseFloat(o.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const r=t.apply(this,arguments);if(a){const{sender:o}=r,c=o.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=s,o.sendEncodings=s,this.setParametersPromises.push(o.setParameters(c).then(()=>{delete o.sendEncodings}).catch(()=>{delete o.sendEncodings})))}return r})}function Jp(i,e){if(!(typeof i=="object"&&i.RTCRtpSender)||e.version>=110)return;const t=i.RTCRtpSender.prototype.getParameters;t&&(i.RTCRtpSender.prototype.getParameters=function(){const s=t.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function Zp(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;const t=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function Qp(i,e){if(!(typeof i=="object"&&i.RTCPeerConnection)||e.version>=110)return;const t=i.RTCPeerConnection.prototype.createAnswer;i.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}const pu=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:Kp,shimCreateAnswer:Qp,shimCreateOffer:Zp,shimGetDisplayMedia:_1,shimGetParameters:Jp,shimGetStats:Wp,shimGetUserMedia:Hp,shimOnTrack:Vp,shimPeerConnection:Bl,shimRTCDataChannel:Yp,shimReceiverGetStats:qp,shimRemoveStream:jp,shimSenderGetStats:Xp},Symbol.toStringTag,{value:"Module"}));function ef(i){if(!(typeof i!="object"||!i.RTCPeerConnection)){if("getLocalStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in i.RTCPeerConnection.prototype)){const e=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addStream=function(n){this._localStreams||(this._localStreams=[]),this._localStreams.includes(n)||this._localStreams.push(n),n.getAudioTracks().forEach(s=>e.call(this,s,n)),n.getVideoTracks().forEach(s=>e.call(this,s,n))},i.RTCPeerConnection.prototype.addTrack=function(n,...s){return s&&s.forEach(a=>{this._localStreams?this._localStreams.includes(a)||this._localStreams.push(a):this._localStreams=[a]}),e.apply(this,arguments)}}"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);const n=this._localStreams.indexOf(t);if(n===-1)return;this._localStreams.splice(n,1);const s=t.getTracks();this.getSenders().forEach(a=>{s.includes(a.track)&&this.removeTrack(a)})})}}function tf(i){if(!(typeof i!="object"||!i.RTCPeerConnection)&&("getRemoteStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in i.RTCPeerConnection.prototype))){Object.defineProperty(i.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=n=>{n.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);const a=new Event("addstream");a.stream=s,this.dispatchEvent(a)})})}});const e=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){const n=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(a=>{if(n._remoteStreams||(n._remoteStreams=[]),n._remoteStreams.indexOf(a)>=0)return;n._remoteStreams.push(a);const r=new Event("addstream");r.stream=a,n.dispatchEvent(r)})}),e.apply(n,arguments)}}}function nf(i){if(typeof i!="object"||!i.RTCPeerConnection)return;const e=i.RTCPeerConnection.prototype,t=e.createOffer,n=e.createAnswer,s=e.setLocalDescription,a=e.setRemoteDescription,r=e.addIceCandidate;e.createOffer=function(l,h){const d=arguments.length>=2?arguments[2]:arguments[0],u=t.apply(this,[d]);return h?(u.then(l,h),Promise.resolve()):u},e.createAnswer=function(l,h){const d=arguments.length>=2?arguments[2]:arguments[0],u=n.apply(this,[d]);return h?(u.then(l,h),Promise.resolve()):u};let o=function(c,l,h){const d=s.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d};e.setLocalDescription=o,o=function(c,l,h){const d=a.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},e.setRemoteDescription=o,o=function(c,l,h){const d=r.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},e.addIceCandidate=o}function sf(i){const e=i&&i.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const t=e.mediaDevices,n=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=s=>n(af(s))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=(function(n,s,a){e.mediaDevices.getUserMedia(n).then(s,a)}).bind(e))}function af(i){return i&&i.video!==void 0?Object.assign({},i,{video:kp(i.video)}):i}function rf(i){if(!i.RTCPeerConnection)return;const e=i.RTCPeerConnection;i.RTCPeerConnection=function(n,s){if(n&&n.iceServers){const a=[];for(let r=0;r<n.iceServers.length;r++){let o=n.iceServers[r];o.urls===void 0&&o.url?(Sd("RTCIceServer.url","RTCIceServer.urls"),o=JSON.parse(JSON.stringify(o)),o.urls=o.url,delete o.url,a.push(o)):a.push(n.iceServers[r])}n.iceServers=a}return new e(n,s)},i.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(i.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function of(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function cf(i){const e=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(n){if(n){typeof n.offerToReceiveAudio<"u"&&(n.offerToReceiveAudio=!!n.offerToReceiveAudio);const s=this.getTransceivers().find(r=>r.receiver.track.kind==="audio");n.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):n.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof n.offerToReceiveVideo<"u"&&(n.offerToReceiveVideo=!!n.offerToReceiveVideo);const a=this.getTransceivers().find(r=>r.receiver.track.kind==="video");n.offerToReceiveVideo===!1&&a?a.direction==="sendrecv"?a.setDirection?a.setDirection("sendonly"):a.direction="sendonly":a.direction==="recvonly"&&(a.setDirection?a.setDirection("inactive"):a.direction="inactive"):n.offerToReceiveVideo===!0&&!a&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function lf(i){typeof i!="object"||i.AudioContext||(i.AudioContext=i.webkitAudioContext)}const fu=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:lf,shimCallbacksAPI:nf,shimConstraints:af,shimCreateOfferLegacy:cf,shimGetUserMedia:sf,shimLocalStreamsAPI:ef,shimRTCIceServerUrls:rf,shimRemoteStreamsAPI:tf,shimTrackEventTransceiver:of},Symbol.toStringTag,{value:"Module"}));function x1(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var df={exports:{}};(function(i){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(t){return t.trim().split(`
`).map(n=>n.trim())},e.splitSections=function(t){return t.split(`
m=`).map((s,a)=>(a>0?"m="+s:s).trim()+`\r
`)},e.getDescription=function(t){const n=e.splitSections(t);return n&&n[0]},e.getMediaSections=function(t){const n=e.splitSections(t);return n.shift(),n},e.matchPrefix=function(t,n){return e.splitLines(t).filter(s=>s.indexOf(n)===0)},e.parseCandidate=function(t){let n;t.indexOf("a=candidate:")===0?n=t.substring(12).split(" "):n=t.substring(10).split(" ");const s={foundation:n[0],component:{1:"rtp",2:"rtcp"}[n[1]]||n[1],protocol:n[2].toLowerCase(),priority:parseInt(n[3],10),ip:n[4],address:n[4],port:parseInt(n[5],10),type:n[7]};for(let a=8;a<n.length;a+=2)switch(n[a]){case"raddr":s.relatedAddress=n[a+1];break;case"rport":s.relatedPort=parseInt(n[a+1],10);break;case"tcptype":s.tcpType=n[a+1];break;case"ufrag":s.ufrag=n[a+1],s.usernameFragment=n[a+1];break;default:s[n[a]]===void 0&&(s[n[a]]=n[a+1]);break}return s},e.writeCandidate=function(t){const n=[];n.push(t.foundation);const s=t.component;s==="rtp"?n.push(1):s==="rtcp"?n.push(2):n.push(s),n.push(t.protocol.toUpperCase()),n.push(t.priority),n.push(t.address||t.ip),n.push(t.port);const a=t.type;return n.push("typ"),n.push(a),a!=="host"&&t.relatedAddress&&t.relatedPort!==void 0&&(n.push("raddr"),n.push(t.relatedAddress),n.push("rport"),n.push(t.relatedPort)),t.tcpType&&t.protocol.toLowerCase()==="tcp"&&(n.push("tcptype"),n.push(t.tcpType)),(t.usernameFragment||t.ufrag)&&(n.push("ufrag"),n.push(t.usernameFragment||t.ufrag)),"candidate:"+n.join(" ")},e.parseIceOptions=function(t){return t.substring(14).split(" ")},e.parseRtpMap=function(t){let n=t.substring(9).split(" ");const s={payloadType:parseInt(n.shift(),10)};return n=n[0].split("/"),s.name=n[0],s.clockRate=parseInt(n[1],10),s.channels=n.length===3?parseInt(n[2],10):1,s.numChannels=s.channels,s},e.writeRtpMap=function(t){let n=t.payloadType;t.preferredPayloadType!==void 0&&(n=t.preferredPayloadType);const s=t.channels||t.numChannels||1;return"a=rtpmap:"+n+" "+t.name+"/"+t.clockRate+(s!==1?"/"+s:"")+`\r
`},e.parseExtmap=function(t){const n=t.substring(9).split(" ");return{id:parseInt(n[0],10),direction:n[0].indexOf("/")>0?n[0].split("/")[1]:"sendrecv",uri:n[1],attributes:n.slice(2).join(" ")}},e.writeExtmap=function(t){return"a=extmap:"+(t.id||t.preferredId)+(t.direction&&t.direction!=="sendrecv"?"/"+t.direction:"")+" "+t.uri+(t.attributes?" "+t.attributes:"")+`\r
`},e.parseFmtp=function(t){const n={},s=t.substring(t.indexOf(" ")+1).split(";");for(let a=0;a<s.length;a++){const[r,...o]=s[a].trim().split("=");n[r.trim()]=o.length?o.join("="):void 0}return n},e.writeFmtp=function(t){let n="",s=t.payloadType;if(t.preferredPayloadType!==void 0&&(s=t.preferredPayloadType),t.parameters&&Object.keys(t.parameters).length){const a=[];Object.keys(t.parameters).forEach(r=>{t.parameters[r]!==void 0?a.push(r+"="+t.parameters[r]):a.push(r)}),n+="a=fmtp:"+s+" "+a.join(";")+`\r
`}return n},e.parseRtcpFb=function(t){const n=t.substring(t.indexOf(" ")+1).split(" ");return{type:n.shift(),parameter:n.join(" ")}},e.writeRtcpFb=function(t){let n="",s=t.payloadType;return t.preferredPayloadType!==void 0&&(s=t.preferredPayloadType),t.rtcpFeedback&&t.rtcpFeedback.length&&t.rtcpFeedback.forEach(a=>{n+="a=rtcp-fb:"+s+" "+a.type+(a.parameter&&a.parameter.length?" "+a.parameter:"")+`\r
`}),n},e.parseSsrcMedia=function(t){const n=t.indexOf(" "),s={ssrc:parseInt(t.substring(7,n),10)},a=t.indexOf(":",n);return a>-1?(s.attribute=t.substring(n+1,a),s.value=t.substring(a+1)):s.attribute=t.substring(n+1),s},e.parseSsrcGroup=function(t){const n=t.substring(13).split(" ");return{semantics:n.shift(),ssrcs:n.map(s=>parseInt(s,10))}},e.getMid=function(t){const n=e.matchPrefix(t,"a=mid:")[0];if(n)return n.substring(6)},e.parseFingerprint=function(t){const n=t.substring(14).split(" ");return{algorithm:n[0].toLowerCase(),value:n[1].toUpperCase()}},e.getDtlsParameters=function(t,n){return{role:"auto",fingerprints:e.matchPrefix(t+n,"a=fingerprint:").map(e.parseFingerprint)}},e.writeDtlsParameters=function(t,n){let s="a=setup:"+n+`\r
`;return t.fingerprints.forEach(a=>{s+="a=fingerprint:"+a.algorithm+" "+a.value+`\r
`}),s},e.parseCryptoLine=function(t){const n=t.substring(9).split(" ");return{tag:parseInt(n[0],10),cryptoSuite:n[1],keyParams:n[2],sessionParams:n.slice(3)}},e.writeCryptoLine=function(t){return"a=crypto:"+t.tag+" "+t.cryptoSuite+" "+(typeof t.keyParams=="object"?e.writeCryptoKeyParams(t.keyParams):t.keyParams)+(t.sessionParams?" "+t.sessionParams.join(" "):"")+`\r
`},e.parseCryptoKeyParams=function(t){if(t.indexOf("inline:")!==0)return null;const n=t.substring(7).split("|");return{keyMethod:"inline",keySalt:n[0],lifeTime:n[1],mkiValue:n[2]?n[2].split(":")[0]:void 0,mkiLength:n[2]?n[2].split(":")[1]:void 0}},e.writeCryptoKeyParams=function(t){return t.keyMethod+":"+t.keySalt+(t.lifeTime?"|"+t.lifeTime:"")+(t.mkiValue&&t.mkiLength?"|"+t.mkiValue+":"+t.mkiLength:"")},e.getCryptoParameters=function(t,n){return e.matchPrefix(t+n,"a=crypto:").map(e.parseCryptoLine)},e.getIceParameters=function(t,n){const s=e.matchPrefix(t+n,"a=ice-ufrag:")[0],a=e.matchPrefix(t+n,"a=ice-pwd:")[0];return s&&a?{usernameFragment:s.substring(12),password:a.substring(10)}:null},e.writeIceParameters=function(t){let n="a=ice-ufrag:"+t.usernameFragment+`\r
a=ice-pwd:`+t.password+`\r
`;return t.iceLite&&(n+=`a=ice-lite\r
`),n},e.parseRtpParameters=function(t){const n={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},a=e.splitLines(t)[0].split(" ");n.profile=a[2];for(let o=3;o<a.length;o++){const c=a[o],l=e.matchPrefix(t,"a=rtpmap:"+c+" ")[0];if(l){const h=e.parseRtpMap(l),d=e.matchPrefix(t,"a=fmtp:"+c+" ");switch(h.parameters=d.length?e.parseFmtp(d[0]):{},h.rtcpFeedback=e.matchPrefix(t,"a=rtcp-fb:"+c+" ").map(e.parseRtcpFb),n.codecs.push(h),h.name.toUpperCase()){case"RED":case"ULPFEC":n.fecMechanisms.push(h.name.toUpperCase());break}}}e.matchPrefix(t,"a=extmap:").forEach(o=>{n.headerExtensions.push(e.parseExtmap(o))});const r=e.matchPrefix(t,"a=rtcp-fb:* ").map(e.parseRtcpFb);return n.codecs.forEach(o=>{r.forEach(c=>{o.rtcpFeedback.find(h=>h.type===c.type&&h.parameter===c.parameter)||o.rtcpFeedback.push(c)})}),n},e.writeRtpDescription=function(t,n){let s="";s+="m="+t+" ",s+=n.codecs.length>0?"9":"0",s+=" "+(n.profile||"UDP/TLS/RTP/SAVPF")+" ",s+=n.codecs.map(r=>r.preferredPayloadType!==void 0?r.preferredPayloadType:r.payloadType).join(" ")+`\r
`,s+=`c=IN IP4 0.0.0.0\r
`,s+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,n.codecs.forEach(r=>{s+=e.writeRtpMap(r),s+=e.writeFmtp(r),s+=e.writeRtcpFb(r)});let a=0;return n.codecs.forEach(r=>{r.maxptime>a&&(a=r.maxptime)}),a>0&&(s+="a=maxptime:"+a+`\r
`),n.headerExtensions&&n.headerExtensions.forEach(r=>{s+=e.writeExtmap(r)}),s},e.parseRtpEncodingParameters=function(t){const n=[],s=e.parseRtpParameters(t),a=s.fecMechanisms.indexOf("RED")!==-1,r=s.fecMechanisms.indexOf("ULPFEC")!==-1,o=e.matchPrefix(t,"a=ssrc:").map(u=>e.parseSsrcMedia(u)).filter(u=>u.attribute==="cname"),c=o.length>0&&o[0].ssrc;let l;const h=e.matchPrefix(t,"a=ssrc-group:FID").map(u=>u.substring(17).split(" ").map(g=>parseInt(g,10)));h.length>0&&h[0].length>1&&h[0][0]===c&&(l=h[0][1]),s.codecs.forEach(u=>{if(u.name.toUpperCase()==="RTX"&&u.parameters.apt){let p={ssrc:c,codecPayloadType:parseInt(u.parameters.apt,10)};c&&l&&(p.rtx={ssrc:l}),n.push(p),a&&(p=JSON.parse(JSON.stringify(p)),p.fec={ssrc:c,mechanism:r?"red+ulpfec":"red"},n.push(p))}}),n.length===0&&c&&n.push({ssrc:c});let d=e.matchPrefix(t,"b=");return d.length&&(d[0].indexOf("b=TIAS:")===0?d=parseInt(d[0].substring(7),10):d[0].indexOf("b=AS:")===0?d=parseInt(d[0].substring(5),10)*1e3*.95-50*40*8:d=void 0,n.forEach(u=>{u.maxBitrate=d})),n},e.parseRtcpParameters=function(t){const n={},s=e.matchPrefix(t,"a=ssrc:").map(o=>e.parseSsrcMedia(o)).filter(o=>o.attribute==="cname")[0];s&&(n.cname=s.value,n.ssrc=s.ssrc);const a=e.matchPrefix(t,"a=rtcp-rsize");n.reducedSize=a.length>0,n.compound=a.length===0;const r=e.matchPrefix(t,"a=rtcp-mux");return n.mux=r.length>0,n},e.writeRtcpParameters=function(t){let n="";return t.reducedSize&&(n+=`a=rtcp-rsize\r
`),t.mux&&(n+=`a=rtcp-mux\r
`),t.ssrc!==void 0&&t.cname&&(n+="a=ssrc:"+t.ssrc+" cname:"+t.cname+`\r
`),n},e.parseMsid=function(t){let n;const s=e.matchPrefix(t,"a=msid:");if(s.length===1)return n=s[0].substring(7).split(" "),{stream:n[0],track:n[1]};const a=e.matchPrefix(t,"a=ssrc:").map(r=>e.parseSsrcMedia(r)).filter(r=>r.attribute==="msid");if(a.length>0)return n=a[0].value.split(" "),{stream:n[0],track:n[1]}},e.parseSctpDescription=function(t){const n=e.parseMLine(t),s=e.matchPrefix(t,"a=max-message-size:");let a;s.length>0&&(a=parseInt(s[0].substring(19),10)),isNaN(a)&&(a=65536);const r=e.matchPrefix(t,"a=sctp-port:");if(r.length>0)return{port:parseInt(r[0].substring(12),10),protocol:n.fmt,maxMessageSize:a};const o=e.matchPrefix(t,"a=sctpmap:");if(o.length>0){const c=o[0].substring(10).split(" ");return{port:parseInt(c[0],10),protocol:c[1],maxMessageSize:a}}},e.writeSctpDescription=function(t,n){let s=[];return t.protocol!=="DTLS/SCTP"?s=["m="+t.kind+" 9 "+t.protocol+" "+n.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+n.port+`\r
`]:s=["m="+t.kind+" 9 "+t.protocol+" "+n.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+n.port+" "+n.protocol+` 65535\r
`],n.maxMessageSize!==void 0&&s.push("a=max-message-size:"+n.maxMessageSize+`\r
`),s.join("")},e.generateSessionId=function(){return Math.random().toString().substr(2,22)},e.writeSessionBoilerplate=function(t,n,s){let a;const r=n!==void 0?n:2;return t?a=t:a=e.generateSessionId(),`v=0\r
o=`+(s||"thisisadapterortc")+" "+a+" "+r+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`},e.getDirection=function(t,n){const s=e.splitLines(t);for(let a=0;a<s.length;a++)switch(s[a]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return s[a].substring(2)}return n?e.getDirection(n):"sendrecv"},e.getKind=function(t){return e.splitLines(t)[0].split(" ")[0].substring(2)},e.isRejected=function(t){return t.split(" ",2)[1]==="0"},e.parseMLine=function(t){const s=e.splitLines(t)[0].substring(2).split(" ");return{kind:s[0],port:parseInt(s[1],10),protocol:s[2],fmt:s.slice(3).join(" ")}},e.parseOLine=function(t){const s=e.matchPrefix(t,"o=")[0].substring(2).split(" ");return{username:s[0],sessionId:s[1],sessionVersion:parseInt(s[2],10),netType:s[3],addressType:s[4],address:s[5]}},e.isValidSDP=function(t){if(typeof t!="string"||t.length===0)return!1;const n=e.splitLines(t);for(let s=0;s<n.length;s++)if(n[s].length<2||n[s].charAt(1)!=="=")return!1;return!0},i.exports=e})(df);var hf=df.exports;const va=x1(hf),M1=xf({__proto__:null,default:va},[hf]);function vo(i){if(!i.RTCIceCandidate||i.RTCIceCandidate&&"foundation"in i.RTCIceCandidate.prototype)return;const e=i.RTCIceCandidate;i.RTCIceCandidate=function(n){if(typeof n=="object"&&n.candidate&&n.candidate.indexOf("a=")===0&&(n=JSON.parse(JSON.stringify(n)),n.candidate=n.candidate.substring(2)),n.candidate&&n.candidate.length){const s=new e(n),a=va.parseCandidate(n.candidate);for(const r in a)r in s||Object.defineProperty(s,r,{value:a[r]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new e(n)},i.RTCIceCandidate.prototype=e.prototype,Bs(i,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new i.RTCIceCandidate(t.candidate),writable:"false"}),t))}function $l(i){!i.RTCIceCandidate||i.RTCIceCandidate&&"relayProtocol"in i.RTCIceCandidate.prototype||Bs(i,"icecandidate",e=>{if(e.candidate){const t=va.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function yo(i,e){if(!i.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in i.RTCPeerConnection.prototype||Object.defineProperty(i.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});const t=function(o){if(!o||!o.sdp)return!1;const c=va.splitSections(o.sdp);return c.shift(),c.some(l=>{const h=va.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},n=function(o){const c=o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const l=parseInt(c[1],10);return l!==l?-1:l},s=function(o){let c=65536;return e.browser==="firefox"&&(e.version<57?o===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},a=function(o,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);const h=va.matchPrefix(o.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},r=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){const c=n(arguments[0]),l=s(c),h=a(arguments[0],c);let d;l===0&&h===0?d=Number.POSITIVE_INFINITY:l===0||h===0?d=Math.max(l,h):d=Math.min(l,h);const u={};Object.defineProperty(u,"maxMessageSize",{get(){return d}}),this._sctp=u}return r.apply(this,arguments)}}function bo(i,e){if(!(i.RTCPeerConnection&&"createDataChannel"in i.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(s,a){const r=s.send;s.send=function(){const c=arguments[0],l=c.length||c.size||c.byteLength;if(s.readyState==="open"&&a.sctp&&l>a.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+a.sctp.maxMessageSize+" bytes)");return r.apply(s,arguments)}}const n=i.RTCPeerConnection.prototype.createDataChannel;i.RTCPeerConnection.prototype.createDataChannel=function(){const a=n.apply(this,arguments);return t(a,this),a},Bs(i,"datachannel",s=>(t(s.channel,s.target),s))}function zl(i){if(!i.RTCPeerConnection||"connectionState"in i.RTCPeerConnection.prototype)return;const e=i.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{const n=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{const a=s.target;if(a._lastConnectionState!==a.connectionState){a._lastConnectionState=a.connectionState;const r=new Event("connectionstatechange",s);a.dispatchEvent(r)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),n.apply(this,arguments)}})}function Gl(i,e){if(!i.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const a=s.sdp.split(`
`).filter(r=>r.trim()!=="a=extmap-allow-mixed").join(`
`);i.RTCSessionDescription&&s instanceof i.RTCSessionDescription?arguments[0]=new i.RTCSessionDescription({type:s.type,sdp:a}):s.sdp=a}return t.apply(this,arguments)}}function _o(i,e){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;const t=i.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(i.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function xo(i,e){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;const t=i.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(i.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return t.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?t.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(r=>t.apply(this,[r]))})}const S1=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:Gl,shimAddIceCandidateNullOrEmpty:_o,shimConnectionState:zl,shimMaxMessageSize:yo,shimParameterlessSetLocalDescription:xo,shimRTCIceCandidate:vo,shimRTCIceCandidateRelayProtocol:$l,shimSendThrowTypeError:bo},Symbol.toStringTag,{value:"Module"}));function w1({window:i}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const t=Md,n=b1(i),s={browserDetails:n,commonShim:S1,extractVersion:nr,disableLog:v1,disableWarnings:y1,sdp:M1};switch(n.browser){case"chrome":if(!uu||!Fl||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),s;if(n.version===null)return t("Chrome shim can not determine version, not shimming."),s;t("adapter.js shimming chrome."),s.browserShim=uu,_o(i,n),xo(i),Np(i,n),Op(i),Fl(i,n),Up(i,n),zp(i,n),Fp(i),Bp(i,n),Gp(i,n),vo(i),$l(i),zl(i),yo(i,n),bo(i,n),Gl(i,n);break;case"firefox":if(!pu||!Bl||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),s;t("adapter.js shimming firefox."),s.browserShim=pu,_o(i,n),xo(i),Hp(i,n),Bl(i,n),Wp(i,n),Vp(i),jp(i),Xp(i),qp(i),Yp(i),Kp(i,n),Jp(i,n),Zp(i,n),Qp(i,n),vo(i),zl(i),yo(i,n),bo(i,n);break;case"safari":if(!fu||!e.shimSafari)return t("Safari shim is not included in this adapter release."),s;t("adapter.js shimming safari."),s.browserShim=fu,_o(i,n),xo(i),rf(i),cf(i),nf(i),ef(i),tf(i),of(i),sf(i),lf(i),vo(i),$l(i),yo(i,n),bo(i,n),Gl(i,n);break;default:t("Unsupported browser!");break}return s}const mu=w1({window:typeof window>"u"?void 0:window});function $s(i,e,t,n){Object.defineProperty(i,e,{get:t,set:n,enumerable:!0,configurable:!0})}class uf{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const t=[],n=e.byteLength,s=Math.ceil(n/this.chunkedMTU);let a=0,r=0;for(;r<n;){const o=Math.min(n,r+this.chunkedMTU),c=e.slice(r,o),l={__peerData:this._dataCount,n:a,data:c,total:s};t.push(l),r=o,a++}return this._dataCount++,t}}}function E1(i){let e=0;for(const s of i)e+=s.byteLength;const t=new Uint8Array(e);let n=0;for(const s of i)t.set(s,n),n+=s.byteLength;return t}const zc=mu.default||mu,Qa=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){const i=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(i)?i==="chrome"?e>=this.minChromeVersion:i==="firefox"?e>=this.minFirefoxVersion:i==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return zc.browserDetails.browser}getVersion(){return zc.browserDetails.version||0}isUnifiedPlanSupported(){const i=this.getBrowser(),e=zc.browserDetails.version||0;if(i==="chrome"&&e<this.minChromeVersion)return!1;if(i==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,n=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),n=!0}catch{}finally{t&&t.close()}return n}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},T1=i=>!i||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(i),pf=()=>Math.random().toString(36).slice(2),gu={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class C1 extends uf{noop(){}blobToArrayBuffer(e,t){const n=new FileReader;return n.onload=function(s){s.target&&t(s.target.result)},n.readAsArrayBuffer(e),n}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=gu,this.browser=Qa.getBrowser(),this.browserVersion=Qa.getVersion(),this.pack=Lp,this.unpack=Pp,this.supports=function(){const t={browser:Qa.isBrowserSupported(),webRTC:Qa.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let n;try{n=new RTCPeerConnection(gu),t.audioVideo=!0;let s;try{s=n.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!s.ordered;try{s.binaryType="blob",t.binaryBlob=!Qa.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{n&&n.close()}return t}(),this.validateId=T1,this.randomToken=pf}}const gn=new C1,A1="PeerJS: ";class R1{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const n=[A1,...t];for(const s in n)n[s]instanceof Error&&(n[s]="("+n[s].name+") "+n[s].message);e>=3?console.log(...n):e>=2?console.warn("WARNING",...n):e>=1&&console.error("ERROR",...n)}constructor(){this._logLevel=0}}var Ce=new R1,wd={},P1=Object.prototype.hasOwnProperty,fn="~";function vr(){}Object.create&&(vr.prototype=Object.create(null),new vr().__proto__||(fn=!1));function L1(i,e,t){this.fn=i,this.context=e,this.once=t||!1}function ff(i,e,t,n,s){if(typeof t!="function")throw new TypeError("The listener must be a function");var a=new L1(t,n||i,s),r=fn?fn+e:e;return i._events[r]?i._events[r].fn?i._events[r]=[i._events[r],a]:i._events[r].push(a):(i._events[r]=a,i._eventsCount++),i}function Mo(i,e){--i._eventsCount===0?i._events=new vr:delete i._events[e]}function on(){this._events=new vr,this._eventsCount=0}on.prototype.eventNames=function(){var e=[],t,n;if(this._eventsCount===0)return e;for(n in t=this._events)P1.call(t,n)&&e.push(fn?n.slice(1):n);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};on.prototype.listeners=function(e){var t=fn?fn+e:e,n=this._events[t];if(!n)return[];if(n.fn)return[n.fn];for(var s=0,a=n.length,r=new Array(a);s<a;s++)r[s]=n[s].fn;return r};on.prototype.listenerCount=function(e){var t=fn?fn+e:e,n=this._events[t];return n?n.fn?1:n.length:0};on.prototype.emit=function(e,t,n,s,a,r){var o=fn?fn+e:e;if(!this._events[o])return!1;var c=this._events[o],l=arguments.length,h,d;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,n),!0;case 4:return c.fn.call(c.context,t,n,s),!0;case 5:return c.fn.call(c.context,t,n,s,a),!0;case 6:return c.fn.call(c.context,t,n,s,a,r),!0}for(d=1,h=new Array(l-1);d<l;d++)h[d-1]=arguments[d];c.fn.apply(c.context,h)}else{var u=c.length,p;for(d=0;d<u;d++)switch(c[d].once&&this.removeListener(e,c[d].fn,void 0,!0),l){case 1:c[d].fn.call(c[d].context);break;case 2:c[d].fn.call(c[d].context,t);break;case 3:c[d].fn.call(c[d].context,t,n);break;case 4:c[d].fn.call(c[d].context,t,n,s);break;default:if(!h)for(p=1,h=new Array(l-1);p<l;p++)h[p-1]=arguments[p];c[d].fn.apply(c[d].context,h)}}return!0};on.prototype.on=function(e,t,n){return ff(this,e,t,n,!1)};on.prototype.once=function(e,t,n){return ff(this,e,t,n,!0)};on.prototype.removeListener=function(e,t,n,s){var a=fn?fn+e:e;if(!this._events[a])return this;if(!t)return Mo(this,a),this;var r=this._events[a];if(r.fn)r.fn===t&&(!s||r.once)&&(!n||r.context===n)&&Mo(this,a);else{for(var o=0,c=[],l=r.length;o<l;o++)(r[o].fn!==t||s&&!r[o].once||n&&r[o].context!==n)&&c.push(r[o]);c.length?this._events[a]=c.length===1?c[0]:c:Mo(this,a)}return this};on.prototype.removeAllListeners=function(e){var t;return e?(t=fn?fn+e:e,this._events[t]&&Mo(this,t)):(this._events=new vr,this._eventsCount=0),this};on.prototype.off=on.prototype.removeListener;on.prototype.addListener=on.prototype.on;on.prefixed=fn;on.EventEmitter=on;wd=on;var zs={};$s(zs,"ConnectionType",()=>Qi);$s(zs,"PeerErrorType",()=>Ot);$s(zs,"BaseConnectionErrorType",()=>Hl);$s(zs,"DataConnectionErrorType",()=>Ed);$s(zs,"SerializationType",()=>Zo);$s(zs,"SocketEventType",()=>ji);$s(zs,"ServerMessageType",()=>tn);var Qi=function(i){return i.Data="data",i.Media="media",i}({}),Ot=function(i){return i.BrowserIncompatible="browser-incompatible",i.Disconnected="disconnected",i.InvalidID="invalid-id",i.InvalidKey="invalid-key",i.Network="network",i.PeerUnavailable="peer-unavailable",i.SslUnavailable="ssl-unavailable",i.ServerError="server-error",i.SocketError="socket-error",i.SocketClosed="socket-closed",i.UnavailableID="unavailable-id",i.WebRTC="webrtc",i}({}),Hl=function(i){return i.NegotiationFailed="negotiation-failed",i.ConnectionClosed="connection-closed",i}({}),Ed=function(i){return i.NotOpenYet="not-open-yet",i.MessageToBig="message-too-big",i}({}),Zo=function(i){return i.Binary="binary",i.BinaryUTF8="binary-utf8",i.JSON="json",i.None="raw",i}({}),ji=function(i){return i.Message="message",i.Disconnected="disconnected",i.Error="error",i.Close="close",i}({}),tn=function(i){return i.Heartbeat="HEARTBEAT",i.Candidate="CANDIDATE",i.Offer="OFFER",i.Answer="ANSWER",i.Open="OPEN",i.Error="ERROR",i.IdTaken="ID-TAKEN",i.InvalidKey="INVALID-KEY",i.Leave="LEAVE",i.Expire="EXPIRE",i}({});const mf="1.5.5";class I1 extends wd.EventEmitter{constructor(e,t,n,s,a,r=5e3){super(),this.pingInterval=r,this._disconnected=!0,this._messagesQueue=[];const o=e?"wss://":"ws://";this._baseUrl=o+t+":"+n+s+"peerjs?key="+a}start(e,t){this._id=e;const n=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(n+"&version="+mf),this._disconnected=!1,this._socket.onmessage=s=>{let a;try{a=JSON.parse(s.data),Ce.log("Server message received:",a)}catch{Ce.log("Invalid server message",s.data);return}this.emit(ji.Message,a)},this._socket.onclose=s=>{this._disconnected||(Ce.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(ji.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),Ce.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){Ce.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:tn.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(ji.Error,"Invalid message");return}if(!this._wsOpen())return;const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class gf{constructor(e){this.connection=e}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===Qi.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){const n=this.connection,s={ordered:!!e.reliable},a=t.createDataChannel(n.label,s);n._initializeDataChannel(a),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){Ce.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,n=this.connection.connectionId,s=this.connection.type,a=this.connection.provider;Ce.log("Listening for ICE candidates."),e.onicecandidate=r=>{!r.candidate||!r.candidate.candidate||(Ce.log(`Received ICE candidates for ${t}:`,r.candidate),a.socket.send({type:tn.Candidate,payload:{candidate:r.candidate,type:s,connectionId:n},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":Ce.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(Hl.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":Ce.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(Hl.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":Ce.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},Ce.log("Listening for data channel"),e.ondatachannel=r=>{Ce.log("Received data channel");const o=r.channel;a.getConnection(t,n)._initializeDataChannel(o)},Ce.log("Listening for remote stream"),e.ontrack=r=>{Ce.log("Received remote stream");const o=r.streams[0],c=a.getConnection(t,n);if(c.type===Qi.Media){const l=c;this._addStreamToMediaConnection(o,l)}}}cleanup(){Ce.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const t=e.signalingState!=="closed";let n=!1;const s=this.connection.dataChannel;s&&(n=!!s.readyState&&s.readyState!=="closed"),(t||n)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const n=await e.createOffer(this.connection.options.constraints);Ce.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),Ce.log("Set localDescription:",n,`for:${this.connection.peer}`);let s={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Qi.Data){const a=this.connection;s={...s,label:a.label,reliable:a.reliable,serialization:a.serialization}}t.socket.send({type:tn.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Ot.WebRTC,s),Ce.log("Failed to setLocalDescription, ",s))}}catch(n){t.emitError(Ot.WebRTC,n),Ce.log("Failed to createOffer, ",n)}}async _makeAnswer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const n=await e.createAnswer();Ce.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),Ce.log("Set localDescription:",n,`for:${this.connection.peer}`),t.socket.send({type:tn.Answer,payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){t.emitError(Ot.WebRTC,s),Ce.log("Failed to setLocalDescription, ",s)}}catch(n){t.emitError(Ot.WebRTC,n),Ce.log("Failed to create answer, ",n)}}async handleSDP(e,t){t=new RTCSessionDescription(t);const n=this.connection.peerConnection,s=this.connection.provider;Ce.log("Setting remote description",t);const a=this;try{await n.setRemoteDescription(t),Ce.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await a._makeAnswer()}catch(r){s.emitError(Ot.WebRTC,r),Ce.log("Failed to setRemoteDescription, ",r)}}async handleCandidate(e){Ce.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),Ce.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Ot.WebRTC,t),Ce.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(Ce.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return Ce.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(n=>{t.addTrack(n,e)})}_addStreamToMediaConnection(e,t){Ce.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}class vf extends wd.EventEmitter{emitError(e,t){Ce.error("Error:",t),this.emit("error",new D1(`${e}`,t))}}class D1 extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}}class yf extends vf{get open(){return this._open}constructor(e,t,n){super(),this.peer=e,this.provider=t,this.options=n,this._open=!1,this.metadata=n.metadata}}var jl;const dr=class dr extends yf{get type(){return Qi.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,n){super(e,t,n),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||dr.ID_PREFIX+gn.randomToken(),this._negotiator=new gf(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Ce.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{Ce.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){Ce.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,n=e.payload;switch(e.type){case tn.Answer:this._negotiator.handleSDP(t,n.sdp),this._open=!0;break;case tn.Candidate:this._negotiator.handleCandidate(n.candidate);break;default:Ce.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){Ce.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const n=this.provider._getMessages(this.connectionId);for(const s of n)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};jl=new WeakMap,$a(dr,jl,dr.ID_PREFIX="mc_");let Oo=dr;class k1{constructor(e){this._options=e}_buildRequest(e){const t=this._options.secure?"https":"http",{host:n,port:s,path:a,key:r}=this._options,o=new URL(`${t}://${n}:${s}${a}${r}/${e}`);return o.searchParams.set("ts",`${Date.now()}${Math.random()}`),o.searchParams.set("version",mf),fetch(o.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){Ce.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==gn.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===gn.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw Ce.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}var Yl,Kl;const _s=class _s extends yf{get type(){return Qi.Data}constructor(e,t,n){super(e,t,n),this.connectionId=this.options.connectionId||_s.ID_PREFIX+pf(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new gf(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Ce.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{Ce.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{Ce.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(Ed.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){const t=e.payload;switch(e.type){case tn.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case tn.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:Ce.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};Yl=new WeakMap,Kl=new WeakMap,$a(_s,Yl,_s.ID_PREFIX="dc_"),$a(_s,Kl,_s.MAX_BUFFERED_AMOUNT=8388608);let Uo=_s;class Td extends Uo{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Uo.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return Ce.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class Gc extends Td{close(e){super.close(e),this._chunkedData={}}constructor(e,t,n){super(e,t,n),this.chunker=new uf,this.serialization=Zo.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const t=Pp(e),n=t.__peerData;if(n){if(n.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){const t=e.__peerData,n=this._chunkedData[t]||{data:[],count:0,total:e.total};if(n.data[e.n]=new Uint8Array(e.data),n.count++,this._chunkedData[t]=n,n.total===n.count){delete this._chunkedData[t];const s=E1(n.data);this._handleDataMessage({data:s})}}_send(e,t){const n=Lp(e);if(n instanceof Promise)return this._send_blob(n);if(!t&&n.byteLength>this.chunker.chunkedMTU){this._sendChunks(n);return}this._bufferedSend(n)}async _send_blob(e){const t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){const t=this.chunker.chunk(e);Ce.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(const n of t)this.send(n,!0)}}class N1 extends Td{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Zo.None}}class O1 extends Td{_handleDataMessage({data:e}){const t=this.parse(this.decoder.decode(e)),n=t.__peerData;if(n&&n.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){const n=this.encoder.encode(this.stringify(e));if(n.byteLength>=gn.chunkedMTU){this.emitError(Ed.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(n)}constructor(...e){super(...e),this.serialization=Zo.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var Jl;const hr=class hr extends vf{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[t,n]of this._connections)e[t]=n;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:N1,json:O1,binary:Gc,"binary-utf8":Gc,default:Gc},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let n;if(e&&e.constructor==Object?t=e:e&&(n=e.toString()),t={debug:0,host:gn.CLOUD_HOST,port:gn.CLOUD_PORT,path:"/",key:hr.DEFAULT_KEY,token:gn.randomToken(),config:gn.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==gn.CLOUD_HOST?this._options.secure=gn.isSecure():this._options.host==gn.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&Ce.setLogFunction(this._options.logFunction),Ce.logLevel=this._options.debug||0,this._api=new k1(t),this._socket=this._createServerConnection(),!gn.supports.audioVideo&&!gn.supports.data){this._delayedAbort(Ot.BrowserIncompatible,"The current browser does not support WebRTC");return}if(n&&!gn.validateId(n)){this._delayedAbort(Ot.InvalidID,`ID "${n}" is invalid`);return}n?this._initialize(n):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(Ot.ServerError,s))}_createServerConnection(){const e=new I1(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(ji.Message,t=>{this._handleMessage(t)}),e.on(ji.Error,t=>{this._abort(Ot.SocketError,t)}),e.on(ji.Disconnected,()=>{this.disconnected||(this.emitError(Ot.Network,"Lost connection to server."),this.disconnect())}),e.on(ji.Close,()=>{this.disconnected||this._abort(Ot.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const t=e.type,n=e.payload,s=e.src;switch(t){case tn.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case tn.Error:this._abort(Ot.ServerError,n.msg);break;case tn.IdTaken:this._abort(Ot.UnavailableID,`ID "${this.id}" is taken`);break;case tn.InvalidKey:this._abort(Ot.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case tn.Leave:Ce.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case tn.Expire:this.emitError(Ot.PeerUnavailable,`Could not connect to peer ${s}`);break;case tn.Offer:{const a=n.connectionId;let r=this.getConnection(s,a);if(r&&(r.close(),Ce.warn(`Offer received for existing Connection ID:${a}`)),n.type===Qi.Media){const c=new Oo(s,this,{connectionId:a,_payload:n,metadata:n.metadata});r=c,this._addConnection(s,r),this.emit("call",c)}else if(n.type===Qi.Data){const c=new this._serializers[n.serialization](s,this,{connectionId:a,_payload:n,metadata:n.metadata,label:n.label,serialization:n.serialization,reliable:n.reliable});r=c,this._addConnection(s,r),this.emit("connection",c)}else{Ce.warn(`Received malformed connection type:${n.type}`);return}const o=this._getMessages(a);for(const c of o)r.handleMessage(c);break}default:{if(!n){Ce.warn(`You received a malformed message from ${s} of type ${t}`);return}const a=n.connectionId,r=this.getConnection(s,a);r&&r.peerConnection?r.handleMessage(e):a?this._storeMessage(a,e):Ce.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){Ce.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Ot.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const n=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,n),n}call(e,t,n={}){if(this.disconnected){Ce.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Ot.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){Ce.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const s=new Oo(e,this,{...n,_stream:t});return this._addConnection(e,s),s}_addConnection(e,t){Ce.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const n=t.indexOf(e);n!==-1&&t.splice(n,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const n=this._connections.get(e);if(!n)return null;for(const s of n)if(s.connectionId===t)return s;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){Ce.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(Ce.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(const n of t)n.close()}disconnect(){if(this.disconnected)return;const e=this.id;Ce.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)Ce.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)Ce.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Ot.ServerError,t))}};Jl=new WeakMap,$a(hr,Jl,hr.DEFAULT_KEY="peerjs");let Vl=hr;var Hc=Vl;const vu="tgboxing-v1",oo="tgboxing-v1-open",U1={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:global.stun.twilio.com:3478"}]},yu="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function F1(i=6){let e="";const t=new Uint8Array(i);crypto.getRandomValues(t);for(const n of t)e+=yu[n%yu.length];return e}function ni(i=""){return String(i).toUpperCase().replace(/[^A-Z0-9-]/g,"").slice(0,12)}function bf(i=""){return/^OPEN-\d+$/.test(ni(i))}function bu(i){const e=new URL(location.href);return e.search="",e.searchParams.set("room",i),e.toString()}function B1(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0).toString(16).padStart(8,"0")}function $1({matchId:i,p1:e,p2:t,wager:n,result:s}){const a=`${i}|${e}|${t}|${n}|${s==null?void 0:s.winnerId}|${s==null?void 0:s.method}|${s==null?void 0:s.round}`;return B1(a)}class z1{constructor({onEvent:e}={}){this.onEvent=e||(()=>{}),this.role=null,this.peer=null,this.conn=null,this.code=null,this.hostPeerId=null,this.connected=!1,this.destroyed=!1,this.localInfo=null,this.remoteInfo=null,this.public=!1,this.reconnectAttempts=0,this.lastMessageAt=0,this.heartbeat=null,this.everConnected=!1,this.reconnectTimer=null}emit(e,t={}){try{this.onEvent(e,t)}catch(n){console.warn("net event",e,n)}}_peerOptions(){return{debug:0,config:U1}}async hostPrivate({code:e,localInfo:t}){return this.role="host",this.public=!1,this.code=ni(e),this.localInfo=t,this._hostWithId(`${vu}-p-${this.code}`)}async hostPublic({localInfo:e,slots:t=8}){this.role="host",this.public=!0,this.localInfo=e;const n=Array.from({length:t},(s,a)=>a).sort(()=>Math.random()-.5);for(const s of n)try{const a=`${oo}-${s}`;return await this._hostWithId(a),this.code=`OPEN-${s}`,this.public=!0,this.emit("room",{code:this.code,public:!0,peerId:a}),{code:this.code,public:!0}}catch(a){if(this.destroyed)throw a}throw new Error("Não há salas públicas livres agora. Crie uma sala privada.")}_hostWithId(e){return new Promise((t,n)=>{if(this.peer)try{this.peer.destroy()}catch{}const s=new Hc(e,this._peerOptions());this.peer=s;let a=!1;const r=c=>{if(!a){a=!0,clearTimeout(o);try{s.destroy()}catch{}n(c instanceof Error?c:new Error((c==null?void 0:c.message)||"Falha ao criar sala"))}},o=setTimeout(()=>r(new Error("Tempo esgotado ao conectar ao servidor de salas.")),15e3);s.on("open",c=>{a||(a=!0,clearTimeout(o),this.hostPeerId=c,this.emit("room",{code:this.code,public:this.public,peerId:c}),t(c))}),s.on("connection",c=>this._bindConnection(c)),s.on("error",c=>{a?this._handlePeerError(c):r(c)}),s.on("disconnected",()=>{this.destroyed||(this.emit("status",{state:"reconnecting",label:"Reconectando ao servidor..."}),setTimeout(()=>{var c;if(!this.destroyed)try{(c=this.peer)==null||c.reconnect()}catch{}},1400))}),s.on("close",()=>this.emit("closed",{}))})}async joinPrivate({code:e,localInfo:t}){return this.role="guest",this.public=!1,this.code=ni(e),this.localInfo=t,this.hostPeerId=`${vu}-p-${this.code}`,await this._createGuestPeer(),await this._connectToHost(1e4),this.emit("room",{code:this.code,public:!1,hostPeerId:this.hostPeerId}),{code:this.code}}async joinPublicSlot({code:e,localInfo:t}){const n=ni(e),s=/^OPEN-(\d+)$/.exec(n);if(!s)throw new Error("Código de sala pública inválido.");const a=Number(s[1]);this.role="guest",this.public=!0,this.localInfo=t,this.emit("status",{state:"searching",label:`Entrando na sala pública ${n}...`});const r=await this._probePublicSlot(a);return this.peer=r.peer,this.code=n,this.hostPeerId=`${oo}-${a}`,this._attachPeerEvents(),this._bindConnection(r.conn),this.emit("room",{code:this.code,public:!0,hostPeerId:this.hostPeerId}),{code:this.code,slot:a}}async joinByCode({code:e,localInfo:t}){return bf(e)?this.joinPublicSlot({code:e,localInfo:t}):this.joinPrivate({code:e,localInfo:t})}async joinPublic({localInfo:e,slots:t=8}){this.role="guest",this.public=!0,this.localInfo=e,this.emit("status",{state:"searching",label:"Procurando salas públicas..."});const n=[];for(let a=0;a<t;a++)n.push(this._probePublicSlot(a));const s=await new Promise((a,r)=>{let o=n.length,c=!1;n.forEach(l=>l.then(h=>{if(c){try{h.peer.destroy()}catch{}return}c=!0,a(h)}).catch(()=>{o--,o===0&&!c&&r(new Error("Nenhuma sala pública encontrada. Crie uma sala e convide um amigo."))}))});return this.peer=s.peer,this.code=`OPEN-${s.slot}`,this.hostPeerId=`${oo}-${s.slot}`,this._attachPeerEvents(),this._bindConnection(s.conn),this.emit("room",{code:this.code,public:!0,hostPeerId:this.hostPeerId}),{code:this.code,slot:s.slot}}_probePublicSlot(e){return new Promise((t,n)=>{const s=new Hc(this._peerOptions());let a=!1;const r=setTimeout(()=>{if(!a){a=!0;try{s.destroy()}catch{}n(new Error("timeout"))}},3400);s.on("open",()=>{if(a)return;const o=s.connect(`${oo}-${e}`,{reliable:!0,serialization:"json"});o.on("open",()=>{if(a){try{o.close(),s.destroy()}catch{}return}a=!0,clearTimeout(r),t({peer:s,conn:o,slot:e})}),o.on("error",()=>{if(!a){a=!0,clearTimeout(r);try{s.destroy()}catch{}n(new Error("slot busy"))}})}),s.on("error",()=>{if(!a){a=!0,clearTimeout(r);try{s.destroy()}catch{}n(new Error("slot unavailable"))}})})}async _createGuestPeer(){return new Promise((e,t)=>{const n=new Hc(this._peerOptions());this.peer=n,this._attachPeerEvents();let s=!1;const a=setTimeout(()=>{if(!s){s=!0;try{n.destroy()}catch{}t(new Error("Tempo esgotado ao conectar ao servidor de salas."))}},15e3);n.on("open",()=>{s||(s=!0,clearTimeout(a),e(n))}),n.on("error",r=>{s?this._handlePeerError(r):(s=!0,clearTimeout(a),t(r instanceof Error?r:new Error((r==null?void 0:r.type)||"Falha de conexão")))})})}_attachPeerEvents(){this.peer&&(this.peer.on("disconnected",()=>{this.destroyed||(this.emit("status",{state:"reconnecting",label:"Reconectando..."}),setTimeout(()=>{var e;if(!this.destroyed){try{(e=this.peer)==null||e.reconnect()}catch{}this.role==="guest"&&this._scheduleReconnect()}},1200))}),this.peer.on("error",e=>this._handlePeerError(e)),this.peer.on("close",()=>this.emit("closed",{})))}_connectToHost(e=8e3){return new Promise((t,n)=>{if(!this.peer)return n(new Error("Sem conexão de sinalização."));let s=!1;const a=setTimeout(()=>{s||(s=!0,n(new Error("O anfitrião não respondeu. Verifique o código e tente novamente.")))},e),r=this.peer.connect(this.hostPeerId,{reliable:!0,serialization:"json"});r.on("open",()=>{s||(s=!0,clearTimeout(a),this._bindConnection(r),t(r))}),r.on("error",o=>{s||(s=!0,clearTimeout(a),n(new Error("Não foi possível entrar na sala. O código expirou?")))})})}_bindConnection(e){if(this.conn&&this.conn!==e&&this.role==="host"){if(this.connected){try{e.close()}catch{}this.emit("notice",{message:"Uma segunda conexão tentou entrar. Sala já ocupada."});return}try{this.conn.close()}catch{}}this.conn=e;const t=()=>{if(this.conn!==e)return;const n=this.everConnected;this.connected=!0,this.everConnected=!0,this.lastMessageAt=Date.now(),this.reconnectAttempts=0,this.reconnectTimer&&(clearTimeout(this.reconnectTimer),this.reconnectTimer=null),this._startHeartbeat(),this.emit("connected",{role:this.role,resumed:n}),this.role==="guest"&&this.localInfo&&this.send({t:"hello",...this.localInfo,resume:n})};e.on("open",t),e.open&&queueMicrotask(t),e.on("data",n=>this._onData(n)),e.on("close",()=>{this.conn===e&&(this.connected=!1,this._stopHeartbeat(),this.emit("disconnected",{role:this.role}),this.role==="guest"&&!this.destroyed&&this._scheduleReconnect())}),e.on("error",()=>{this.emit("status",{state:"error",label:"Erro na conexão P2P."})})}_scheduleReconnect(){if(this.destroyed||this.role!=="guest"||this.reconnectTimer)return;if(this.reconnectAttempts>=6){this.emit("status",{state:"offline",label:"Conexão perdida. Volte ao lobby."});return}this.reconnectAttempts++;const e=this.reconnectAttempts;this.emit("status",{state:"reconnecting",label:`Reconectando... tentativa ${e}/6`}),this.reconnectTimer=setTimeout(async()=>{var t;if(this.reconnectTimer=null,!(this.destroyed||this.connected))try{(t=this.peer)!=null&&t.disconnected&&this.peer.reconnect(),await this._connectToHost(6e3),this.emit("reconnected",{attempts:e})}catch{this._scheduleReconnect()}},900+e*500)}_onData(e){if(!(!e||typeof e!="object")){if(this.lastMessageAt=Date.now(),e.t==="hello"&&this.role==="host"){this.remoteInfo=e,this.emit("hello",e);return}if(e.t==="welcome"&&this.role==="guest"){this.remoteInfo=e.host||e,this.emit("welcome",e);return}this.emit("message",e),e.t&&this.emit(e.t,e)}}send(e){var t;if(!((t=this.conn)!=null&&t.open))return!1;try{return this.conn.send(e),!0}catch(n){return console.warn("send failed",n),!1}}_startHeartbeat(){this._stopHeartbeat(),this.heartbeat=setInterval(()=>{this.connected&&(this.role==="guest"?(this.send({t:"ping",ts:Date.now()}),Date.now()-this.lastMessageAt>12e3&&this.emit("status",{state:"reconnecting",label:"Conexão instável..."})):this.send({t:"ping",ts:Date.now(),host:!0}))},2500)}_stopHeartbeat(){this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null}_handlePeerError(e){const t=(e==null?void 0:e.type)||"";let n=(e==null?void 0:e.message)||"Erro de conexão.";t==="unavailable-id"?n="Este código de sala já está em uso. Gere outro.":t==="peer-unavailable"?n="Sala não encontrada. Confira o código ou o link.":t==="network"?n="Falha de rede no servidor de salas. Verifique sua internet.":t==="server-error"?n="Servidor de sinalização indisponível. Tente novamente.":t==="browser-incompatible"&&(n="Seu navegador não suporta WebRTC."),this.emit("error",{type:t,message:n})}destroy(){var e,t;this.destroyed=!0,this._stopHeartbeat();try{(e=this.conn)==null||e.close()}catch{}try{(t=this.peer)==null||t.destroy()}catch{}this.conn=null,this.peer=null,this.connected=!1}}function G1(i){var p;const e=i.save,t=i.universe,n=e==null?void 0:e.career,s=e==null?void 0:e.profile,a=e&&t?xd(e,t):null,r=(p=n==null?void 0:n.news)==null?void 0:p[0],o=(r==null?void 0:r.title)||"TG BOXING — a nova temporada mundial começa agora. 15 arenas. 11 divisões. Um trono.",c=s?_n(s.attributes):null,l=n==null?void 0:n.activeOffer,h=[{id:e?"career":"create",label:e?"Continuar Carreira":"Criar Carreira",icon:"play",sub:e?`${It(n.record)} · ${Et(s.division)}${a?` · #${a}`:""}`:"Escolha seu nome, estilo e visual",primary:!0},{id:e?"editor":"create",label:"Editor de Lutador",icon:"person",sub:"Rosto, cabelo, roupas e corpo"},{id:"rankings",label:"Rankings & Cinturões",icon:"chart",sub:"TOP 100 · 3 organizações"},{id:"news",label:"TG News",icon:"news",sub:"Notícias geradas pelo universo"},{id:"shop",label:"Loja TG",icon:"shop",sub:"Equipamentos, coaches e cosméticos"},{id:"gym",label:"Academia",icon:"gym",sub:"Treinos, sparring e recuperação",locked:!e},{id:"multiplayer",label:"Multiplayer Online",icon:"wifi",sub:"Convide um amigo · sala real via WebRTC"},{id:"stats",label:"Estatísticas & Prêmios",icon:"stats",sub:"Recordes, histórico, troféus",locked:!e},{id:"settings",label:"Configurações",icon:"settings",sub:"Áudio, controles e acessibilidade"}],d=document.createElement("div");d.className="main-menu",d.innerHTML=`
    <div class="menu-left">
      <div class="logo-block">
        <div class="logo-eyebrow"><span class="line"></span><span>The Glory of Champions</span></div>
        <div class="main-logo"><span class="tg">TG</span><span class="box">BOXING</span></div>
        <div class="logo-sub">Boxe 3D · Carreira · Online</div>
      </div>
      <div class="menu-list">
        ${h.map((g,v)=>`
          <button class="menu-btn ${g.primary?"primary":""} ${g.locked?"locked":""}" data-menu="${g.id}">
            <span class="idx">${String(v+1).padStart(2,"0")}</span>
            ${J(g.icon,20)}
            <b>${g.label}</b>
            <small>${g.sub}</small>
            ${J("arrow",14,"go")}
          </button>
        `).join("")}
      </div>
      <div class="menu-bottom">
        <span class="chip gold">${J("coin",13)} TG COIN é virtual</span>
        <span class="chip green">${J("wifi",13)} MULTIPLAYER ONLINE</span>
        <span class="chip">${J("globe",13)} 1.100 lutadores</span>
      </div>
    </div>
    <div class="menu-corner">
      ${e?`<span class="chip gold">${J("coin",13)} ${nt(n.coins)} TG</span>
      <span class="chip">${J("coin",13)} C$ ${nt(n.money)}</span>`:`<span class="chip">${J("flag",13)} Nova carreira</span>`}
    </div>
    <div class="menu-ticker">
      <span class="ticker-label">TG NEWS</span>
      <div class="ticker-track"><span>${V(o)} &nbsp;·&nbsp; ${V(n!=null&&n.activeOffer?`PRÓXIMA LUTA: ${s.name} vs ${n.activeOffer.opponent.name} em ${n.activeOffer.arenaName}`:"Escolha uma oferta na carreira e escreva sua história.")}</span></div>
    </div>
    <div class="hero-badge">
      ${e?`<div class="name">${V(s.name)}</div><div class="meta">${It(n.record)} · OVERALL ${c} ${a?`· RANKING #${a}`:""}</div>`:'<div class="name">Sua história começa aqui</div><div class="meta">Crie um lutador e conquiste o mundo</div>'}
    </div>
    <div class="version-stamp">v1.0 · TG BOXING · ${new Date().getFullYear()}</div>
  `;const u=(g,v)=>{if(v){i.toast("Crie sua carreira para acessar esta área.","error","lock");return}if(g==="editor"&&!e){i.navigate("create");return}if(g==="create"){i.draft=null,i.navigate("create");return}i.navigate(g)};if(d.querySelectorAll("[data-menu]").forEach(g=>{g.addEventListener("click",()=>{i.app.audio.unlock(),i.app.audio.ui();const v=h.find(m=>m.id===g.dataset.menu);u(g.dataset.menu,(v==null?void 0:v.locked)&&!e)})}),e&&!l){const g=d.querySelector('[data-menu="career"]');g==null||g.addEventListener("mouseenter",()=>i.app.audio.ui())}return d}const or=42,cr=[["strength","Força","fist"],["speed","Velocidade","bolt"],["stamina","Resistência","lungs"],["precision","Precisão","target"],["defense","Defesa","shield"],["reflexes","Reflexos","eye"],["mobility","Mobilidade","feet"],["recovery","Recuperação","heart"],["conditioning","Condicionamento","flame"]],Fo=["Kaito","Diego","Malik","Rafael","Kenji","Tyson","Miguel","Dmitri","Liam","Amari","Hiroshi","Thiago"],Bo=["Moreira","Silva","Takahashi","Carter","Volkov","Garcia","Okafor","Nakamura","Costa","Brennan"];function H1(){const i=Fo[Math.floor(Math.random()*Fo.length)],e=Bo[Math.floor(Math.random()*Bo.length)],t=i+e+Date.now();return{name:`${i} ${e}`,nickname:"",nationality:"BRA",division:"middle",style:"technical",age:22,appearance:Aa(t),attributes:Object.fromEntries(cr.map(([n])=>[n,or])),points:12,seed:t}}function V1(i){i.draft||(i.draft=H1());const e=i.draft;e.appearance||(e.appearance=Aa("create-"+Date.now())),e.attributes||(e.attributes=Object.fromEntries(cr.map(([a])=>[a,or])));const t=Bt(`<div class="screen create-screen plain">
    <div class="create-shell">
      <div class="create-card panel">
        <div class="panel-body">
          <div class="kicker">Nova carreira</div>
          <h1 class="screen-title" style="font-size:46px;margin:4px 0 2px">Crie sua lenda</h1>
          <p class="screen-sub" style="margin-bottom:18px">Escolha identidade, divisão e estilo. Você tem <b class="gold" data-points>${e.points}</b> pontos para distribuir.</p>

          <div class="form-grid two">
            <div class="field"><label>Nome completo</label><input class="input" data-field="name" maxlength="26" value="${V(e.name)}"></div>
            <div class="field"><label>Apelido</label><input class="input" data-field="nickname" maxlength="24" placeholder="The Rising Sun" value="${V(e.nickname)}"></div>
          </div>
          <div class="form-grid two">
            <div class="field"><label>Nacionalidade</label><select class="input" data-field="nationality">${Zi.map(a=>`<option value="${a.code}" ${e.nationality===a.code?"selected":""}>${a.name} (${a.code})</option>`).join("")}</select></div>
            <div class="field"><label>Idade <b data-age>${e.age}</b></label><input type="range" min="18" max="36" value="${e.age}" data-field="age"></div>
          </div>
          <div class="field"><label>Divisão de peso</label><select class="input" data-field="division">${pn.map(a=>`<option value="${a.id}" ${e.division===a.id?"selected":""}>${a.name} — ${a.min}–${a.max} kg</option>`).join("")}</select></div>

          <div class="field"><label>Estilo de luta</label><div class="style-grid">${Si.map(a=>`<button class="style-pill ${e.style===a.id?"active":""}" data-style="${a.id}" style="--sc:${a.color}"><b>${a.name}</b><span>${a.desc}</span></button>`).join("")}</div></div>

          <div class="section-title" style="margin-top:18px"><h2 style="font-size:20px">Atributos iniciais</h2><span class="tiny">Mín. ${or} · máx. 99</span></div>
          <div class="alloc-grid" data-allocation>${_u(e)}</div>

          <div class="row between" style="margin-top:20px">
            <div class="row">
              <button class="btn btn-sm" data-action="randomize">${J("swap",15)} Aleatório</button>
              <button class="btn btn-sm btn-gold-outline" data-action="appearance">${J("person",15)} Aparência</button>
            </div>
            <div class="row">
              <button class="btn btn-ghost" data-nav="menu">Voltar</button>
              <button class="btn btn-primary" data-action="start">${J("crown",16)} Iniciar Carreira</button>
            </div>
          </div>
        </div>
      </div>
      <div class="create-preview-note">
        <span class="kicker">Prévia 3D</span>
        <p>Arraste para girar. Personalize mais de 700 opções no editor.</p>
      </div>
    </div>
  </div>`),n=()=>{t.querySelector("[data-allocation]").innerHTML=_u(e),t.querySelector("[data-points]").textContent=e.points,s()},s=()=>{t.querySelectorAll("[data-attr]").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.attr,o=Number(a.dataset.dir);o>0&&e.points<=0||o<0&&e.attributes[r]<=or||(e.attributes[r]+=o,e.points-=o,i.app.audio.ui(),n())})})};return s(),t.querySelectorAll("[data-field]").forEach(a=>{const r=a.dataset.field,o=()=>{r==="age"?(e.age=Number(a.value),t.querySelector("[data-age]").textContent=e.age):e[r]=a.value};a.addEventListener("input",o),a.addEventListener("change",o)}),t.querySelectorAll("[data-style]").forEach(a=>{a.addEventListener("click",()=>{e.style=a.dataset.style,t.querySelectorAll("[data-style]").forEach(r=>r.classList.toggle("active",r===a)),i.app.audio.ui()})}),t.querySelector('[data-action="randomize"]').addEventListener("click",()=>{const a=Fo[Math.floor(Math.random()*Fo.length)],r=Bo[Math.floor(Math.random()*Bo.length)];if(e.name=`${a} ${r}`,e.nickname="",e.appearance=Aa(a+r+Date.now()),e.nationality=Zi[Math.floor(Math.random()*Zi.length)].code,e.style=Si[Math.floor(Math.random()*Si.length)].id,e.division=pn[Math.floor(Math.random()*pn.length)].id,e.points>0){let o=200;for(;e.points>0&&o-- >0;){const c=cr[Math.floor(Math.random()*cr.length)][0];e.attributes[c]<72&&(e.attributes[c]+=1,e.points-=1)}}i.navigate("create")}),t.querySelector('[data-action="appearance"]').addEventListener("click",()=>{i.draft=e,i.navigate("editor",{mode:"create"})}),t.querySelector('[data-action="start"]').addEventListener("click",()=>{var c;const a=(e.name||"").trim();if(a.length<3){i.toast("Digite um nome com pelo menos 3 letras.","error","person");return}if(e.points>0){i.toast(`Distribua os ${e.points} pontos restantes antes de começar.`,"error","star");return}const r=v_({name:a,nickname:(e.nickname||"").trim()||"The Rising Sun",nationality:e.nationality,division:e.division,style:e.style,appearance:{...mr,...e.appearance},attributes:{...e.attributes},age:e.age}),o=xn[r.profile.division];Un(r,{cat:"upcoming",tag:"NOVO CONTRATO",title:`${r.profile.name} assina contrato profissional e mira o topo dos ${o.name.toLowerCase()}s`,subtitle:`Novo rosto na divisão. ${r.profile.age} anos, estilo ${(c=Si.find(l=>l.id===r.profile.style))==null?void 0:c.name.toLowerCase()}.`,body:`A TG BOXING anunciou a contratação de ${r.profile.name}, conhecido como "${r.profile.nickname}". O lutador de ${wi(r.profile.nationality)} inicia a carreira profissional com cartel 0-0-0 e muita ambição. "Não vim para participar. Vim para dominar", declarou em sua primeira entrevista.

A promoter já prepara três ofertas para as próximas semanas. O sonho do cinturão mundial começa agora.`,division:r.profile.division,hero:{name:r.profile.name,nick:r.profile.nickname,nationality:r.profile.nationality},imageSeed:4,featured:!0}),_d(r,i.universe,3),i.save=r,i.app.save=r,i.app.audio.setSettings(r.settings),Mt(r,!0),i.draft=null,i.toast("Carreira criada. Bem-vindo ao TG BOXING!","success","crown"),i.navigate("career")}),setTimeout(()=>{var r;const a=(r=i.app.background)==null?void 0:r.boxer;a&&(a.root.position.x=window.innerWidth>900?.75:0,a.root.position.y=.14)},60),t}function _u(i){return cr.map(([e,t,n])=>`
    <div class="alloc-pill">
      <span class="ic">${J(n,14)}</span>
      <span class="lbl">${t}</span>
      <b>${i.attributes[e]}</b>
      <span class="alloc-btns">
        <button data-attr="${e}" data-dir="-1" ${i.attributes[e]<=or?"disabled":""}>−</button>
        <button data-attr="${e}" data-dir="1" ${i.points<=0||i.attributes[e]>=99?"disabled":""}>+</button>
      </span>
    </div>`).join("")}const Vc=[{id:"profile",name:"Perfil",icon:"person"},{id:"hair",name:"Cabelo & Barba",icon:"spark"},{id:"face",name:"Rosto",icon:"eye"},{id:"skin",name:"Pele",icon:"globe"},{id:"body",name:"Corpo",icon:"people"},{id:"shorts",name:"Shorts",icon:"robe"},{id:"top",name:"Camisa",icon:"robe"},{id:"glove",name:"Luvas",icon:"glove"},{id:"shoe",name:"Sapatos",icon:"feet"},{id:"robe",name:"Roupão",icon:"robe"},{id:"colorway",name:"Cores",icon:"grid"}];function W1(i,e={}){var G;const t=e.mode==="create"||!i.save;if(t&&!i.draft)return Bt('<div class="screen plain"><div class="empty-state"><b>Crie seu lutador primeiro</b><p>Use a tela de criação para começar.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>');const n=t?null:i.save.profile,s=t?i.draft.appearance:{...n.appearance},a=t?{name:i.draft.name,nickname:i.draft.nickname,nationality:i.draft.nationality,division:i.draft.division,style:i.draft.style,age:i.draft.age,height:s.height,reach:s.reach}:{...n,height:s.height,reach:s.reach};let r=["hair","face","skin","body","shorts","glove","colorway"].includes(e.cat)?e.cat:"profile",o="";const c=Bt(`<div class="editor">
    <div class="editor-left">
      <button class="cat-btn" data-nav="${t?"create":"career"}">${J("back",16)} <span class="lbl">Voltar</span></button>
      ${Vc.map(F=>`<button class="cat-btn ${F.id===r?"active":""}" data-cat="${F.id}">${J(F.icon,16)} <span class="lbl">${F.name}</span></button>`).join("")}
      <button class="cat-btn done" data-action="save">${J("check",16)} <span class="lbl">${t?"Confirmar":"Salvar"}</span></button>
    </div>
    <div class="editor-center">
      <div class="hint">Arraste para girar · ${t?"prévia de criação":"editor do lutador"}</div>
      <div class="editor-stats">
        <div class="editor-stat"><b data-stat-height>${Math.round(162+s.height*42)}</b><span>Altura cm</span></div>
        <div class="editor-stat"><b data-stat-reach>${Math.round(168+s.reach*30)}</b><span>Alcance cm</span></div>
        <div class="editor-stat"><b data-stat-overall>${_n(t?i.draft.attributes:n.attributes)}</b><span>Overall</span></div>
        <div class="editor-stat"><b>${X1()}</b><span>Opções</span></div>
      </div>
    </div>
    <div class="editor-right">
      <div class="editor-head">
        <h2 data-head-title>${((G=Vc.find(F=>F.id===r))==null?void 0:G.name)||"Perfil"}</h2>
        <div class="sub">${t?"CRIAÇÃO DE LUTADOR":"PERSONALIZAÇÃO"}</div>
      </div>
      <div class="editor-scroll" data-editor-scroll></div>
      <div class="editor-footer">
        <button class="btn btn-sm" data-action="random">${J("swap",14)} Aleatório</button>
        <span class="spacer"></span>
        <button class="btn btn-sm btn-primary" data-action="save">${t?"Confirmar":"Salvar"}</button>
      </div>
    </div>
  </div>`),l=c.querySelector("[data-editor-scroll]"),h=c.querySelector("[data-head-title]"),d=G_(()=>{var F;((F=i.app.background)==null?void 0:F.kind)==="studio"&&i.app.background.boxer&&(i.app.showEditor(s),u())},90);i.onCleanup(()=>{var F;return(F=d.cancel)==null?void 0:F.call(d)});const u=()=>{var R;const F=(R=i.app.background)==null?void 0:R.boxer;F&&(F.root.position.x=window.innerWidth>980?-.15:0,F.root.position.y=.14)};setTimeout(u,60);const p=()=>{c.querySelector("[data-stat-height]").textContent=Math.round(162+s.height*42),c.querySelector("[data-stat-reach]").textContent=Math.round(168+s.reach*30)},g=(F,R)=>{s[F]=R,t&&(i.draft.appearance=s),d(),p()},v=()=>{var F;h.textContent=((F=Vc.find(R=>R.id===r))==null?void 0:F.name)||"Perfil",c.querySelectorAll("[data-cat]").forEach(R=>R.classList.toggle("active",R.dataset.cat===r)),r==="profile"?l.innerHTML=m():r==="body"?l.innerHTML=f():l.innerHTML=b(),w()},m=()=>{var F;return t?`<div class="editor-group">
        <h3>Identidade</h3>
        <div class="field"><label>Nome</label><input class="input" data-meta="name" maxlength="26" value="${V(a.name)}"></div>
        <div class="field"><label>Apelido</label><input class="input" data-meta="nickname" maxlength="24" value="${V(a.nickname||"")}"></div>
        <div class="field"><label>Nacionalidade</label><select class="input" data-meta="nationality">${Zi.map(R=>`<option value="${R.code}" ${a.nationality===R.code?"selected":""}>${R.name}</option>`).join("")}</select></div>
        <div class="field"><label>Divisão</label><select class="input" data-meta="division">${pn.map(R=>`<option value="${R.id}" ${a.division===R.id?"selected":""}>${R.name}</option>`).join("")}</select></div>
      </div>
      <div class="notice">As roupas, cabelos e cores ficam salvos no seu perfil. Use as categorias à esquerda para explorar mais de 700 combinações.</div>
      <button class="btn btn-block" style="margin-top:12px" data-action="back-create">${J("back",15)} Voltar à criação (atributos)</button>`:`<div class="editor-group">
      <h3>Identidade</h3>
      <div class="field"><label>Nome</label><input class="input" data-meta="name" maxlength="26" value="${V(a.name)}"></div>
      <div class="field"><label>Apelido</label><input class="input" data-meta="nickname" maxlength="24" value="${V(a.nickname||"")}"></div>
      <div class="field"><label>Nacionalidade</label><select class="input" data-meta="nationality">${Zi.map(R=>`<option value="${R.code}" ${a.nationality===R.code?"selected":""}>${R.name}</option>`).join("")}</select></div>
      <div class="field"><label>Divisão</label><input class="input" value="${Et(a.division)}" disabled></div>
      <div class="field"><label>Estilo</label><input class="input" value="${((F=Si.find(R=>R.id===a.style))==null?void 0:F.name)||"—"}" disabled></div>
    </div>
    <div class="editor-group"><h3>Carreira</h3>
      <div class="row" style="gap:7px;flex-wrap:wrap">
        <span class="chip">${Et(a.division)}</span><span class="chip">${wi(a.nationality)}</span><span class="chip">Overall ${_n(n.attributes)}</span>
      </div>
      <p class="tiny" style="margin-top:10px">A divisão não pode ser alterada durante a carreira. Atributos evoluem na Academia.</p>
    </div>`},f=()=>`<div class="editor-group">
    <h3>Estrutura <span>afeta a prévia 3D</span></h3>
    ${_("height","Altura",s.height)}
    ${_("reach","Alcance",s.reach)}
    ${_("muscle","Massa muscular",s.muscle)}
    ${_("width","Largura de ombros",s.width)}
  </div>
  <div class="notice">A estrutura é visual e não altera seus atributos de combate. O alcance exibido é estimado.</div>`,_=(F,R,W)=>`<div class="slider-row"><span>${R}</span><input type="range" min="0" max="1" step="0.01" value="${W}" data-body="${F}"><b data-body-val="${F}">${Math.round(W*100)}</b></div>`,b=()=>{if(r==="hair")return M("Cabelo — 100 cortes",Ci,"hair",D=>`
        <div class="option ${s.hair===D.id?"active":""}" data-slot="hair" data-id="${D.id}" title="${V(D.name)}">
          <span class="swatch" style="background:radial-gradient(circle at 40% 35%, ${D.color}, #141014 80%)"></span><span class="lbl">${V(D.short)}</span>
        </div>`)+M("Barba — 26 estilos",As,"beard",I("beard"));if(r==="face")return M("Formato do rosto",Ps,"face",I("face"))+M("Olhos",Ls,"eyes",I("eyes"))+M("Sobrancelhas",Rs,"brow",I("brow"))+M("Nariz",Is,"nose",I("nose"))+M("Boca",Ds,"mouth",I("mouth"))+M("Cicatrizes",ks,"scar",I("scar"));if(r==="skin")return M(`Tom de pele — ${ns.length} opções`,ns,"skin",D=>`
        <div class="option color-only ${s.skin===D.id?"active":""}" data-slot="skin" data-id="${D.id}" title="${V(D.name)}">
          <span class="swatch" style="background:${D.color}"></span><span class="lbl">${V(D.name)}</span>
        </div>`);const R={shorts:Ai,top:Ta,glove:Li,shoe:Ri,robe:Pi,colorway:qn}[r]||[],W=r==="colorway"?"colorway":r,Y=o?R.filter(D=>D.name.toLowerCase().includes(o.toLowerCase())):R,ie=r==="colorway"?D=>`<span class="swatch" style="background:linear-gradient(135deg, ${D.colors[0]} 0 38%, ${D.colors[1]} 38% 68%, ${D.colors[2]} 68% 100%)"></span>`:D=>`<span class="swatch" style="background:linear-gradient(135deg, ${D.colors[0]} 0 52%, ${D.colors[1]} 52% 78%, ${D.colors[2]} 78% 100%)"></span>`;return`<div class="ed-search-row"><input class="input" data-search placeholder="Buscar ${R.length} opções..." value="${V(o)}"><span class="tiny">${Y.length}/${R.length}</span></div>
      <div class="option-grid" data-option-grid>${Y.map(D=>`
        <div class="option ${s[W]===D.id?"active":""}" data-slot="${W}" data-id="${D.id}" title="${V(D.name)}">
          ${ie(D)}<span class="lbl">${V(D.name.replace(/^[A-Za-zÀ-ú]+ /,""))}</span>
        </div>`).join("")}</div>`},M=(F,R,W,Y)=>`<div class="editor-group"><h3>${F} <span>${R.length}</span></h3><div class="option-grid">${R.map(Y).join("")}</div></div>`,I=F=>R=>`<div class="option ${s[F]===R.id?"active":""}" data-slot="${F}" data-id="${R.id}" title="${V(R.name)}"><span class="lbl">${V(R.name)}</span></div>`,w=()=>{l.querySelectorAll("[data-slot]").forEach(R=>{R.addEventListener("click",()=>{if(g(R.dataset.slot,R.dataset.id),R.dataset.slot==="hair"){const W=Ci.find(Y=>Y.id===R.dataset.id);W!=null&&W.color&&g("hairColor",W.color)}l.querySelectorAll(`[data-slot="${R.dataset.slot}"]`).forEach(W=>W.classList.toggle("active",W===R)),i.app.audio.ui()})}),l.querySelectorAll("[data-body]").forEach(R=>{R.addEventListener("input",()=>{g(R.dataset.body,Number(R.value));const W=l.querySelector(`[data-body-val="${R.dataset.body}"]`);W&&(W.textContent=Math.round(Number(R.value)*100))})}),l.querySelectorAll("[data-meta]").forEach(R=>{R.addEventListener("input",()=>{const W=R.dataset.meta;t?i.draft[W]=R.value:(W==="name"||W==="nickname"||W==="nationality")&&(i.save.profile[W]=R.value)}),R.addEventListener("change",()=>{const W=R.dataset.meta;t&&(i.draft[W]=R.value)})});const F=l.querySelector("[data-search]");F&&F.addEventListener("input",()=>{o=F.value;const R=l.querySelector("[data-option-grid]");if(!R)return;const Y={shorts:Ai,top:Ta,glove:Li,shoe:Ri,robe:Pi,colorway:qn}[r]||[],ie=o?Y.filter(D=>D.name.toLowerCase().includes(o.toLowerCase())):Y;R.innerHTML=ie.map(D=>`<div class="option ${s[r]===D.id?"active":""}" data-slot="${r}" data-id="${D.id}" title="${V(D.name)}"><span class="swatch" style="background:linear-gradient(135deg, ${D.colors[0]} 0 52%, ${D.colors[1]} 52% 78%, ${D.colors[2]} 78% 100%)"></span><span class="lbl">${V(D.name.replace(/^[A-Za-zÀ-ú]+ /,""))}</span></div>`).join(""),w()})};c.querySelectorAll("[data-cat]").forEach(F=>{F.addEventListener("click",()=>{r=F.dataset.cat,o="",v(),i.app.audio.ui()})});const E=()=>{if(t){i.navigate("create");return}if((i.save.profile.name||"").trim().length<3){i.toast("Nome muito curto.","error","person");return}i.save.profile.appearance={...s},Mt(i.save,!0),i.toast("Aparência salva.","success","check"),i.lastBackground=null,i.navigate("career")},C=()=>{const F=Aa((t?i.draft.name:i.save.profile.name)+Date.now());Object.assign(s,F),t&&(i.draft.appearance=s),v(),d(),i.toast("Novo visual gerado.","info","swap")};c.querySelectorAll('[data-action="save"]').forEach(F=>F.addEventListener("click",E)),c.querySelector('[data-action="random"]').addEventListener("click",C),c.addEventListener("click",F=>{F.target.closest('[data-action="back-create"]')&&i.navigate("create")});let U=!1,y=0,x=0;c.querySelector(".editor-center").addEventListener("pointerdown",F=>{U=!0,y=F.clientX,F.preventDefault()}),window.addEventListener("pointermove",F=>{var R,W;U&&(x+=(F.clientX-y)*.012,y=F.clientX,(W=(R=i.app.background)==null?void 0:R.setRotation)==null||W.call(R,x))});const O=()=>{U=!1};return window.addEventListener("pointerup",O),i.onCleanup(()=>window.removeEventListener("pointerup",O)),v(),c}function X1(){return 800}function q1(i){var u,p,g,v,m;const e=i.save;if(!e)return Bt(`<div class="screen plain">${i.topbar("career")}<div class="empty-state">${J("crown",46)}<b>Nenhuma carreira ativa</b><p>Crie seu lutador para começar a jornada rumo ao cinturão mundial.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>`);const t=e.career,n=e.profile;_d(e,i.universe,3);const s=xd(e,i.universe),a=xn[n.division]||xn.middle,r=Ft.map(f=>{const _=t.belts.find(b=>b.org===f.id&&b.division===n.division);return{org:f,fighter:Os(i.universe,n.division,f.id),playerBelt:_}}),o=t.activeOffer,c=t.news.slice(0,5),l=_n(n.attributes),h=t.record.w+t.record.l+t.record.d>0?Math.round(t.record.w/(t.record.w+t.record.l+t.record.d)*100):0,d=Bt(`<div class="screen">
    ${i.topbar("career",`<button class="btn btn-sm btn-gold-outline" data-action="rest">${J("clock",14)} Descansar 7 dias</button>`)}
    ${jn({kicker:"Modo carreira",title:"O caminho do campeão",sub:`Temporada ${t.season.year} · ${Et(n.division)} · ${Vt(t.date)}`,actions:`<button class="btn btn-sm" data-nav="gym">${J("gym",15)} Academia</button>
        <button class="btn btn-sm" data-nav="rankings">${J("chart",15)} Rankings</button>
        <button class="btn btn-sm btn-gold-outline" data-action="edit">${J("person",15)} Editar Lutador</button>`})}

    <div class="career-top">
      <div class="career-hero">
        <div class="avatar-lg" style="width:96px;height:96px;font-size:38px">${Fn(n.name)}</div>
        <div style="flex:1;min-width:0">
          <div class="fighter-card">
            <div>
              <div class="name">${V(n.name)}</div>
              <div class="nick">${V(n.nickname||"Sem apelido")} · ${wi(n.nationality)}</div>
              <div class="row" style="margin-top:8px;gap:6px">
                <span class="chip gold">${J("crown",12)} RANKING #${s}</span>
                <span class="chip">${J("star",12)} OVERALL ${l}</span>
                <span class="chip">${((u=Bn[n.style])==null?void 0:u.name)||"Técnico"}</span>
              </div>
            </div>
          </div>
          <div class="profile-stats">
            <div><b>${It(t.record)}</b><span>Cartel</span></div>
            <div><b>${t.record.ko}</b><span>Nocautes</span></div>
            <div><b>${t.reputation}</b><span>Reputação</span></div>
            <div><b>${h}%</b><span>Vitórias</span></div>
            <div><b>${t.belts.length}</b><span>Cinturões</span></div>
          </div>
        </div>
      </div>
      <div class="career-side">
        ${o?`
          <div class="next-fight-card">
            <div class="kicker">Contrato assinado · ${V(o.eventName)}</div>
            <h3>${V(n.name)} <span class="muted" style="font-family:var(--font-cond);font-size:14px">VS</span> ${V(o.opponent.name)}</h3>
            <div class="meta">${J("calendar",11)} ${Vt(o.date)} · ${V(o.arenaName)}, ${V(o.city)} · ${o.rounds} rounds</div>
            <div class="row between" style="margin-top:12px">
              <div class="row" style="gap:6px">
                <span class="chip gold">${J("coin",12)} C$ ${nt(o.purse)}</span>
                <span class="chip">${J("coin",12)} ${o.coinReward} TG</span>
                ${o.title?`<span class="chip red">${J("belt",12)} TÍTULO</span>`:""}
              </div>
              <button class="btn btn-primary btn-sm" data-action="fight">${J("play",14)} Iniciar Luta</button>
            </div>
          </div>
        `:`
          <div class="next-fight-card">
            <div class="kicker">Próximo passo</div>
            <h3>Assine um contrato</h3>
            <div class="meta">Escolha uma das ofertas abaixo e prepare o campo de treino.</div>
            <div class="row" style="margin-top:12px;gap:6px">
              <span class="chip">${J("calendar",11)} ${t.offers.length} ofertas</span>
              <span class="chip gold">${J("coin",11)} C$ ${nt(t.money)}</span>
            </div>
          </div>
        `}
        <div class="stat-tile accent"><div class="label">TG COIN</div><div class="value">${nt(t.coins)}</div><div class="sub">Moeda virtual</div></div>
        <div class="stat-tile"><div class="label">Sessões de treino</div><div class="value">${t.training.sessionsLeft}<span style="font-size:14px;color:var(--muted)">/4</span></div><div class="sub">Fadiga ${t.training.fatigue}%</div></div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="stack">
        <div class="panel">
          <div class="panel-head"><h3>${o?"Contrato ativo":"Ofertas de luta"}</h3><span class="tiny">${o?"1 contrato":`${t.offers.length} disponíveis`}</span></div>
          <div class="panel-body">
            ${o?Y1(o):j1(t.offers,n.division)}
            ${o?"":`<div class="notice" style="margin-top:12px">${J("shield",13)} Negocie a bolsa uma vez por oferta. Contratos de título exigem ranking e histórico.</div>`}
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Treino & preparação</h3><button class="btn btn-sm btn-ghost" data-nav="gym">Abrir academia ${J("arrow",13)}</button></div>
          <div class="panel-body">
            <div class="row between" style="margin-bottom:6px"><span class="tiny">Fadiga</span><span class="tiny">${t.training.fatigue}%</span></div>
            <div class="progress" style="margin-bottom:14px"><i style="width:${t.training.fatigue}%;background:linear-gradient(90deg,#34d399,#f2c14e,#e11d48)"></i></div>
            <div class="training-row"><div class="ico">${J("gym",17)}</div><div style="flex:1"><b>${t.training.sessionsLeft} sessões restantes</b><span>Total de ${t.training.totalSessions} sessões concluídas</span></div><span class="chip ${t.training.sessionsLeft>0?"green":""}">${t.training.sessionsLeft>0?"Pronto":"Descansar"}</span></div>
            <div class="training-row"><div class="ico">${J("coach",17)}</div><div style="flex:1"><b>${V(t.gym.coach==="Basico"?"Coach Básico":t.gym.coach)}</b><span>${t.gym.equipment.length} equipamentos comprados</span></div><span class="chip">Nível ${t.gym.level}</span></div>
            <div class="training-row"><div class="ico">${J("sponsor",17)}</div><div style="flex:1"><b>${t.sponsor?"Patrocínio ativo":"Sem patrocínio"}</b><span>${t.sponsor?"Bônus por vitória garantido":"Visite a Loja TG para fechar um contrato"}</span></div><button class="btn btn-sm btn-ghost" data-nav="shop">Loja</button></div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Galeria de cinturões</h3><span class="tiny">${t.belts.length} títulos</span></div>
          <div class="panel-body">
            ${t.belts.length?`<div class="belts-strip">${t.belts.map(f=>`<div class="belt-card">${K1(f)}<div><b>${ai(f.tier)}</b><span>${On(f.org).short} · ${Et(f.division)}</span><div class="tiny">${f.defenses||0} defesas · conquistado em ${Vt(f.wonAt)}</div></div></div>`).join("")}</div>`:`<div class="empty-state" style="padding:24px">${J("belt",32)}<b>Nenhum cinturão ainda</b><p>Vença lutas, suba no ranking e dispute um título mundial.</p></div>`}
          </div>
        </div>
      </div>

      <div class="stack">
        <div class="panel">
          <div class="panel-head"><h3>Campeões da divisão</h3><span class="tiny">${a.name}</span></div>
          <div class="panel-body" style="display:flex;flex-direction:column;gap:10px">
            ${r.map(({org:f,fighter:_,playerBelt:b})=>`
              <div class="champ-row">
                <span class="org-dot" style="background:${f.color}"></span>
                <div style="flex:1;min-width:0">
                  <div class="tiny" style="color:${f.color}">${f.short}</div>
                  <b>${V(b?n.name:(_==null?void 0:_.name)||"Vacante")}</b>
                </div>
                ${b?'<span class="tag gold">VOCÊ</span>':`<span class="tiny">${_?It(_.record):"—"}</span>`}
              </div>`).join("")}
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>TG News</h3><button class="btn btn-sm btn-ghost" data-nav="news">Ver tudo ${J("arrow",13)}</button></div>
          <div class="panel-body news-mini">
            ${c.map(f=>`<div class="item" data-news="${V(f.id)}"><span class="dot"></span><div style="flex:1"><div class="t">${V(f.title)}</div><div class="d">${Vt(f.date)} · ${V(f.tag||"NOTÍCIA")}</div></div></div>`).join("")||'<p class="tiny">Nenhuma notícia ainda. Simule uma semana para movimentar o mundo.</p>'}
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Metas da temporada</h3><span class="tiny">${t.season.wins}/${t.season.fights} vitórias</span></div>
          <div class="panel-body">
            <div class="bars">
              <div class="bar-row"><span>Top 10</span><span class="bar-track"><i class="bar-fill" style="width:${Math.max(4,100-Math.min(100,s))}%"></i></span><span class="attr-value">#${s}</span></div>
              <div class="bar-row"><span>Reputação</span><span class="bar-track"><i class="bar-fill" style="width:${t.reputation}%"></i></span><span class="attr-value">${t.reputation}</span></div>
              <div class="bar-row"><span>Nocautes</span><span class="bar-track"><i class="bar-fill red" style="width:${Math.min(100,t.record.ko*10)}%"></i></span><span class="attr-value">${t.record.ko}</span></div>
              <div class="bar-row"><span>Defesas</span><span class="bar-track"><i class="bar-fill green" style="width:${Math.min(100,t.season.defenses*25)}%"></i></span><span class="attr-value">${t.season.defenses}</span></div>
            </div>
            <div class="divider" style="margin:14px 0"></div>
            <div class="row between"><span class="tiny">Bolsas acumuladas</span><b class="gold">${$_(t.totalPurse)}</b></div>
            <div class="row between" style="margin-top:6px"><span class="tiny">Melhor vitória</span><b style="font-size:12px">${V(t.season.bestWin||"—")}</b></div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Próximos eventos</h3></div>
          <div class="panel-body" style="display:flex;flex-direction:column;gap:8px">
            ${(t.offers||[]).slice(0,3).map(f=>{var _;return`<div class="quick-row" data-news-offer="${V(f.id)}"><span class="dot" style="background:${((_=xn[f.opponent.division||n.division])==null?void 0:_.color)||"#f2c14e"}"></span><div><b>${V(f.eventName)}</b><div class="tiny">${Vt(f.date)} · ${V(f.arenaName)}</div></div><span class="tiny">${f.rounds}R</span></div>`}).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>`);return d.querySelectorAll("[data-offer]").forEach(f=>{f.addEventListener("click",_=>{_.target.closest("[data-offer-action]")||(d.querySelectorAll("[data-offer]").forEach(b=>b.classList.toggle("selected",b===f)),d.querySelectorAll("[data-offer-actions]").forEach(b=>{b.style.display="none"}),f.querySelector("[data-offer-actions]").style.display="flex")})}),d.querySelectorAll("[data-offer-action]").forEach(f=>{f.addEventListener("click",_=>{_.stopPropagation();const b=t.offers.find(I=>I.id===f.dataset.offerId);if(!b)return;const M=f.dataset.offerAction;if(M==="accept")i.confirm({title:"Assinar contrato?",message:`Você enfrentará <b>${V(b.opponent.name)}</b> em ${Vt(b.date)} na ${V(b.arenaName)}. Bolsa: <b>C$ ${nt(b.purse)}</b> + ${b.coinReward} TG COIN.${b.title?'<br><br><b class="gold">Esta luta vale o '+ai(b.title.tier)+"!</b>":""}`,confirmLabel:"Assinar e preparar",onConfirm:()=>{const I=s1(e,b);if(!I.ok){i.toast(I.message,"error","lock");return}Mt(e,!0),i.toast("Contrato assinado! Prepare-se na academia.","success","check"),i.refresh({scroll:"keep"})}});else if(M==="negotiate"){const I=Z_(b);i.toast(I.message,I.ok?"success":"error",I.ok?"coin":"lock"),I.ok&&Mt(e,!0),i.refresh({scroll:"keep"})}else M==="decline"&&i.confirm({title:"Recusar oferta?",message:`A oferta contra ${V(b.opponent.name)} será removida.`,danger:!0,confirmLabel:"Recusar",onConfirm:()=>{r1(e,i.universe,b.id),Mt(e,!0),i.refresh({scroll:"keep"})}})})}),(p=d.querySelector('[data-action="fight"]'))==null||p.addEventListener("click",()=>{i.navigate("fight",{mode:"career",offer:t.activeOffer,arenaId:t.activeOffer.arenaId,rounds:t.activeOffer.rounds,division:n.division})}),(g=d.querySelector('[data-action="cancel-contract"]'))==null||g.addEventListener("click",()=>{i.confirm({title:"Cancelar contrato?",message:"Cancelar pode reduzir sua reputação e gerar uma notícia negativa.",danger:!0,confirmLabel:"Cancelar luta",onConfirm:()=>{a1(e),t.reputation=Math.max(0,t.reputation-2),Mt(e,!0),i.refresh({scroll:"keep"})}})}),(v=d.querySelector('[data-action="edit"]'))==null||v.addEventListener("click",()=>i.navigate("editor",{mode:"edit"})),(m=d.querySelector('[data-action="rest"]'))==null||m.addEventListener("click",()=>{Rp(e,i.universe,7),Mt(e,!0),i.toast("Uma semana se passou. Sessões restauradas e rankings movimentados.","success","clock"),i.refresh({scroll:"keep"})}),d.querySelectorAll("[data-news]").forEach(f=>f.addEventListener("click",()=>i.navigate("news",{id:f.dataset.news}))),d.querySelectorAll("[data-news-offer]").forEach(f=>f.addEventListener("click",()=>{const _=d.querySelector(`[data-offer="${f.dataset.newsOffer}"]`);_==null||_.scrollIntoView({behavior:"smooth",block:"center"}),_==null||_.click()})),d}function j1(i,e){return i!=null&&i.length?`<div class="offer-list">${i.map(t=>`
    <div class="offer-card" data-offer="${V(t.id)}">
      <div class="avatar-lg" style="width:46px;height:46px;font-size:16px">${Fn(t.opponent.name)}</div>
      <div class="opp">
        <b>${V(t.opponent.name)}</b>
        <span>${V(t.opponent.nick||"")} ${t.opponent.nick?"·":""} ${It(t.opponent.record)} · Overall ${t.opponent.overall} · ${V(t.styleName||"")}</span>
        <div class="row" style="gap:5px;margin-top:5px">
          ${t.title?`<span class="tag gold">${V(ai(t.title.tier))}</span>`:""}
          <span class="tag ${t.hype>70?"red":"blue"}">HYPE ${t.hype}</span>
          <span class="tag">${t.rounds} ROUNDS</span>
          ${t.negotiated?'<span class="tag green">NEGOCIADO</span>':""}
        </div>
      </div>
      <div class="purse"><b>${nt(t.purse)}</b><span>C$ · ${t.coinReward} TG</span><span>${Vt(t.date)}</span></div>
      <div class="offer-actions" data-offer-actions style="display:none">
        <button class="btn btn-sm btn-primary" data-offer-action="accept" data-offer-id="${V(t.id)}">Aceitar</button>
        <button class="btn btn-sm" data-offer-action="negotiate" data-offer-id="${V(t.id)}" ${t.negotiated?"disabled":""}>Negociar</button>
        <button class="btn btn-sm btn-ghost" data-offer-action="decline" data-offer-id="${V(t.id)}">Recusar</button>
      </div>
    </div>`).join("")}</div>`:'<p class="tiny">Nenhuma oferta no momento. Descanse alguns dias para receber novas propostas.</p>'}function Y1(i){var e;return`<div class="active-contract">
    <div class="row between" style="align-items:flex-start">
      <div>
        <div class="kicker">${V(i.eventName)}</div>
        <h2 style="font-family:var(--font-display);font-size:38px;margin:2px 0 0;line-height:0.9">${V(i.opponent.name)}</h2>
        <div class="tiny" style="margin-top:6px">${It(i.opponent.record)} · Overall ${i.opponent.overall} · ${V(i.styleName)} · ${i.opponent.age} anos</div>
        <div class="row" style="gap:6px;margin-top:10px">
          <span class="chip gold">${J("calendar",11)} ${Vt(i.date)}</span>
          <span class="chip">${J("flag",11)} ${V(i.arenaName)}</span>
          <span class="chip">${J("coin",11)} ${nt(i.purse)} C$ + ${i.coinReward} TG</span>
          ${i.title?`<span class="chip red">${J("belt",11)} ${V(ai(i.title.tier))}</span>`:""}
        </div>
        <p class="tiny" style="margin-top:12px;max-width:520px">"${V(i.callout||((e=Bn[i.opponent.style])==null?void 0:e.desc)||"Vamos ver quem é o melhor.")}"</p>
      </div>
      <div style="text-align:center;flex:none">
        <div class="avatar-lg" style="width:76px;height:76px;font-size:26px">${Fn(i.opponent.name)}</div>
        <div class="tiny" style="margin-top:4px">${V(i.opponent.nationality||"")}</div>
      </div>
    </div>
    <div class="row" style="margin-top:16px;gap:8px">
      <button class="btn btn-primary" data-action="fight">${J("play",15)} Iniciar Luta</button>
      <button class="btn btn-ghost" data-action="cancel-contract">Cancelar contrato</button>
    </div>
  </div>`}function K1(i){const e=On(i.org);return`<div class="belt-art" style="background:radial-gradient(circle at 40% 35%, #fff3c4, ${e.color} 48%, #3a2405)">${e.short}</div>`}function J1(i,e={}){var u;const t=i.save;let n=e.division||((u=t==null?void 0:t.profile)==null?void 0:u.division)||"middle",s=e.org||null;pn.find(p=>p.id===n)||(n="middle");const a=Bt(`<div class="screen">
    ${i.topbar("rankings")}
    ${jn({kicker:"Organizações & cinturões",title:"Rankings mundiais",sub:"100 lutadores por divisão. Três organizações. Sete níveis de cinturão. O topo não é para todos.",actions:t?`<span class="chip gold">${J("crown",13)} Você: #${xd(t,i.universe)}</span>`:""})}
    <div class="division-tabs" data-divisions>
      ${pn.map(p=>`<button data-div="${p.id}" class="${p.id===n?"active":""}" style="--dc:${p.color}"><span style="color:${p.color}">●</span> ${p.name}</button>`).join("")}
    </div>
    <div class="row between" style="margin-bottom:14px">
      <div class="org-tabs" data-orgs>
        <button data-org="" class="${s?"":"active"}">GERAL</button>
        ${Ft.map(p=>`<button data-org="${p.id}" class="${s===p.id?"active":""}">${p.short}</button>`).join("")}
      </div>
      <span class="tiny" data-count></span>
    </div>
    <div class="rank-layout">
      <div class="panel"><div class="rank-list" data-ranklist></div></div>
      <div class="stack" data-side></div>
    </div>
  </div>`),r=a.querySelector("[data-ranklist]"),o=a.querySelector("[data-side]"),c=a.querySelector("[data-count]"),l=()=>{var I,w,E;const p=t?Ns(t):null,g=Ep(i.universe,n,p,s);c.textContent=`${g.length} lutadores · ${Et(n)}${s?" · "+On(s).short:""}`,r.innerHTML=g.map((C,U)=>{var O;const y=U+1,x=C.isPlayer||C.id==="player",N=C.belts||[];return`<div class="rank-row ${x?"me":""}" data-fighter="${V(C.id)}" data-player="${x?"1":""}">
        <div class="num ${y<=3?"top":""}">${y}</div>
        <div class="who">
          <b>${V(C.name)} ${N.length?`<span class="gold">${J("belt",12)}</span>`:""} ${x?'<span class="tag gold">VOCÊ</span>':""}</b>
          <span>${V(C.nick||"Sem apelido")} · ${wi(C.nationality)} · ${((O=Bn[C.style])==null?void 0:O.name)||"Estilo"} · ${C.age||"—"} anos</span>
        </div>
        <div class="rec">${It(C.record)}<br><span class="tiny">${(C.belts||[]).length?(C.belts||[]).map(G=>On(G.org).short).join(" "):"&nbsp;"}</span></div>
        <div class="pts">${nt(C.points||0)}<br><span class="tiny" style="font-family:var(--font-cond);font-size:8px;color:var(--muted2)">PTS</span></div>
      </div>`}).join("")||'<div class="empty-state"><b>Ranking vazio</b><p>Simule o universo para gerar resultados.</p></div>';const v=p?xr(i.universe,n,p.points):null,m=(w=(I=t==null?void 0:t.career)==null?void 0:I.belts)==null?void 0:w.find(C=>C.division===n&&(!s||C.org===s)),f=s?Os(i.universe,n,s):g[0],_=(f==null?void 0:f.belts)||[],b=g.slice(0,3),M=((E=t==null?void 0:t.profile)==null?void 0:E.division)===n;o.innerHTML=`
      <div class="champ-card">
        <div class="belt-ico">${J("belt",36)}</div>
        <div class="nick">${s?"CAMPEÃO "+On(s).short:"LÍDER DA DIVISÃO"}</div>
        <div class="name">${V(m&&t?t.profile.name:(f==null?void 0:f.name)||"Vacante")}</div>
        <div class="nick">${m&&t?"SEU CINTURÃO":V((f==null?void 0:f.nick)||"Aguardando novo campeão")}</div>
        <div class="row" style="margin-top:10px;gap:6px">
          <span class="chip gold">${It(m&&t?t.career.record:f==null?void 0:f.record)}</span>
          <span class="chip">${_.length} cinturões</span>
          <span class="chip">${Et(n)}</span>
        </div>
        ${f?`<button class="btn btn-sm btn-block" style="margin-top:12px" data-fighter="${V(m&&t?"player":f.id)}">${J("eye",14)} Ver dossiê</button>`:""}
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Top 3 da divisão</h3></div>
        <div class="panel-body" style="display:flex;flex-direction:column;gap:9px">
          ${b.map((C,U)=>`<div class="top3-row"><span class="num">${U+1}</span><div style="flex:1;min-width:0"><b>${V(C.name)}</b><div class="tiny">${It(C.record)} · ${wi(C.nationality)}</div></div><span class="gold tiny">${nt(C.points)} pts</span></div>`).join("")}
        </div>
      </div>
      ${t?`<div class="panel">
        <div class="panel-head"><h3>Sua posição</h3></div>
        <div class="panel-body">
          <div class="row between"><div><div class="tiny">Ranking ${Et(n)}</div><div class="rank-big">#${M?v:"—"}</div></div><div style="text-align:right"><div class="tiny">Pontos</div><div class="rank-big">${nt(t.career.points)}</div></div></div>
          <div class="divider" style="margin:14px 0"></div>
          <div class="row between"><span class="tiny">Cinturões na divisão</span><b>${t.career.belts.filter(C=>C.division===n).length}</b></div>
          <div class="row between" style="margin-top:7px"><span class="tiny">Recorde</span><b>${It(t.career.record)}</b></div>
          <div class="row between" style="margin-top:7px"><span class="tiny">Reputação</span><b>${t.career.reputation}</b></div>
          ${M&&v<=2&&!m?`<div class="notice" style="margin-top:12px">${J("crown",13)} Você está no TOP 2. Uma vitória pode valer uma disputa mundial.</div>`:""}
        </div>
      </div>`:""}
      <div class="panel">
        <div class="panel-head"><h3>Cinturões em jogo</h3><span class="tiny">${s?On(s).short:"TODAS"}</span></div>
        <div class="panel-body" style="display:flex;flex-direction:column;gap:8px">
          ${Da.map(C=>`<div class="row between"><span class="tiny">${C.name}</span><span class="tag ${C.prestige>=5?"gold":""}">${C.short}</span></div>`).join("")}
        </div>
      </div>
    `,h()},h=()=>{a.querySelectorAll("[data-fighter]").forEach(p=>{p.addEventListener("click",()=>d(p.dataset.fighter))})},d=p=>{var _,b;let g=(_=i.universe)==null?void 0:_.fighters.find(M=>M.id===p),v=p==="player";if(v&&t&&(g=Ns(t),g.belts=t.career.belts,g.points=t.career.points,g.isPlayer=!0),!g)return;const m=g.belts||[],f=g.attributes||{};i.modal({wide:!0,title:V(g.name),body:`<div class="dossier">
        <div class="dossier-head">
          <div class="avatar-lg">${Fn(g.name)}</div>
          <div style="flex:1">
            <div class="kicker">${V(g.nick||"Sem apelido")}</div>
            <div class="row" style="gap:6px;margin-top:6px;flex-wrap:wrap">
              <span class="chip">${wi(g.nationality)}</span>
              <span class="chip">${((b=Bn[g.style])==null?void 0:b.name)||"Estilo"}</span>
              <span class="chip gold">${It(g.record)}</span>
              <span class="chip">${g.age||"—"} anos</span>
              <span class="chip">Overall ${g.overall||_n(f)}</span>
            </div>
          </div>
        </div>
        <div class="dossier-body">
          <div>${vd(f)}</div>
          <div>
            <div class="tiny" style="margin-bottom:6px">CINTURÕES</div>
            ${m.length?m.map(M=>`<div class="mini-belt"><span>${J("belt",16)}</span><div><b>${ai(M.tier)}</b><div class="tiny">${On(M.org).short} · ${Et(M.division||n)} · ${M.defenses||0} defesas</div></div></div>`).join(""):'<p class="tiny">Nenhum cinturão conquistado.</p>'}
            <div class="divider" style="margin:12px 0"></div>
            <div class="row between"><span class="tiny">Pontos de ranking</span><b class="gold">${nt(g.points||0)}</b></div>
            <div class="row between" style="margin-top:6px"><span class="tiny">Nacionalidade</span><b>${wi(g.nationality)}</b></div>
            <div class="row between" style="margin-top:6px"><span class="tiny">Divisão</span><b>${Et(g.division||n)}</b></div>
          </div>
        </div>
      </div>`,actions:[{label:"Fechar",cls:"btn-ghost"},{label:v?"Ir para carreira":"Ver ranking",cls:"btn-primary",onClick:()=>{v&&i.navigate("career")}}]})};return a.querySelectorAll("[data-div]").forEach(p=>{p.addEventListener("click",()=>{n=p.dataset.div,a.querySelectorAll("[data-div]").forEach(g=>g.classList.toggle("active",g===p)),l()})}),a.querySelectorAll("[data-org]").forEach(p=>{p.addEventListener("click",()=>{s=p.dataset.org||null,a.querySelectorAll("[data-org]").forEach(g=>g.classList.toggle("active",g===p)),l()})}),l(),a}function Z1(i,e={}){const t=i.save;t&&(!t.career.news||t.career.news.length===0)&&(Ap(t,i.universe,14),Mt(t,!0));let n=e.cat||"latest",s=e.id||null;const a=Bt(`<div class="screen">
    ${i.topbar("news")}
    ${jn({kicker:"TG News · cobertura mundial",title:"Notícias do ringue",sub:"Resultados, contratos, rivalidades e campeões gerados a partir dos dados reais da sua carreira e do universo.",actions:`<button class="btn btn-sm" data-action="simulate">${J("swap",14)} Atualizar mundo</button>`})}
    <div class="news-filter" data-filters>
      ${eu.map(h=>`<button data-cat="${h.id}" class="${h.id===n?"active":""}">${h.name}</button>`).join("")}
    </div>
    <div data-news-layout></div>
  </div>`),r=a.querySelector("[data-news-layout]"),o=()=>{var u,p;if(t)return t.career.news;const h=[];let d=0;for(const g of pn.slice(0,6))for(const v of Ft){const m=Os(i.universe,g.id,v.id);m&&h.push({id:"u"+d++,date:new Date().toISOString(),cat:"title",tag:"CAMPEÃO",title:`${m.name} segue no topo dos ${g.name.toLowerCase()}s pelo ${v.short}`,subtitle:`${m.record.w}-${m.record.l}-${m.record.d} · ${m.record.ko} nocautes · ${((p=(u=m.belts)==null?void 0:u[0])==null?void 0:p.defenses)||0} defesas.`,body:`${m.name}, ${m.age} anos, é o atual campeão ${v.short} dos ${g.name.toLowerCase()}s. Com cartel de ${m.record.w}-${m.record.l}-${m.record.d} e ${m.record.ko} nocautes, ele é considerado um dos lutadores mais perigosos do circuito.

Crie uma carreira para acompanhar as notícias da sua própria história, contratos e disputas de cinturão.`,division:g.id,hero:{name:m.name,nick:m.nick,color:g.color},featured:d===1})}return h},c=()=>{var v;const h=o().slice().sort((m,f)=>new Date(f.date)-new Date(m.date)),d=n==="latest"?h:h.filter(m=>m.cat===n),u=d.find(m=>m.id===s)||d.find(m=>m.featured)||d[0],p=d.filter(m=>m!==u);u&&(s=u.id);const g=((v=xn[u==null?void 0:u.division])==null?void 0:v.color)||"#f2c14e";r.innerHTML=u?`
      <div class="news-layout">
        <div>
          <div class="news-feature" data-article="${V(u.id)}">
            <div class="news-art" style="background:
              radial-gradient(circle at 72% 18%, ${g}55, transparent 42%),
              radial-gradient(circle at 22% 70%, rgba(225,29,72,.28), transparent 55%),
              linear-gradient(135deg, #17111a, #0a0a0e 70%)"></div>
            <div class="content">
              <div class="row" style="gap:6px"><span class="tag gold">${V(u.tag||"NOTÍCIA")}</span><span class="tiny">${Vt(u.date)}</span></div>
              <h2>${V(u.title)}</h2>
              <p>${V(u.subtitle||"")}</p>
              <div class="row" style="margin-top:14px;gap:8px">
                <span class="chip">${J("globe",12)} ${Et(u.division)}</span>
                <span class="chip">${J("news",12)} Ler matéria completa</span>
              </div>
            </div>
          </div>
          <div class="panel" style="margin-top:16px">
            <div class="panel-head"><h3>Mais notícias</h3><span class="tiny">${d.length} matérias</span></div>
            <div class="panel-body" style="padding-top:6px">
              ${p.length?p.map(m=>{var f,_;return`<div class="news-item-card" data-article="${V(m.id)}">
                <div class="thumb" style="background:radial-gradient(circle at 60% 30%, ${((f=xn[m.division])==null?void 0:f.color)||"#f2c14e"}66, #13131a 62%)"><span>${Fn(((_=m.hero)==null?void 0:_.name)||m.title)}</span></div>
                <div style="flex:1;min-width:0"><div class="t">${V(m.title)}</div><div class="meta">${Vt(m.date)} · ${V(m.tag||"NOTÍCIA")} · ${Et(m.division)}</div></div>
                ${J("arrow",15)}
              </div>`}).join(""):'<div class="empty-state" style="padding:30px"><b>Nada nesta categoria</b><p>Tente outra editoria ou atualize o mundo.</p></div>'}
            </div>
          </div>
        </div>
        <div class="stack">
          <div class="panel">
            <div class="panel-head"><h3>Editorias</h3></div>
            <div class="panel-body" style="display:flex;flex-direction:column;gap:2px">
              ${eu.map(m=>`<button class="news-cat-row ${n===m.id?"active":""}" data-cat="${m.id}"><span>${m.name}</span><b>${m.id==="latest"?h.length:h.filter(f=>f.cat===m.id).length}</b></button>`).join("")}
            </div>
          </div>
          <div class="panel">
            <div class="panel-head"><h3>Radar de campeões</h3></div>
            <div class="panel-body" style="display:flex;flex-direction:column;gap:10px">
              ${Ft.map(m=>{var _;const f=Os(i.universe,((_=t==null?void 0:t.profile)==null?void 0:_.division)||"middle",m.id);return`<div class="champ-row"><span class="org-dot" style="background:${m.color}"></span><div style="flex:1"><div class="tiny" style="color:${m.color}">${m.short}</div><b>${V((f==null?void 0:f.name)||"Vacante")}</b></div><span class="tiny">${f?`${f.record.w}-${f.record.l}`:"—"}</span></div>`}).join("")}
            </div>
          </div>
          <div class="notice">${J("news",13)} As manchetes são geradas a partir de resultados simulados, rankings, contratos e títulos do seu save. Nada é estático.</div>
        </div>
      </div>
    `:`<div class="empty-state">${J("news",40)}<b>Sem notícias nesta editoria</b><p>Atualize o mundo para gerar novos resultados.</p><button class="btn btn-primary" data-action="simulate">Atualizar mundo</button></div>`,r.querySelectorAll("[data-article]").forEach(m=>{m.addEventListener("click",()=>l(m.dataset.article))}),r.querySelectorAll("[data-cat]").forEach(m=>{m.addEventListener("click",()=>{n=m.dataset.cat,s=null,a.querySelectorAll("[data-cat]").forEach(f=>f.classList.toggle("active",f.dataset.cat===n)),c()})})},l=h=>{var p,g;const d=o().find(v=>v.id===h);if(!d)return;const u=((p=xn[d.division])==null?void 0:p.color)||"#f2c14e";i.modal({wide:!0,title:V(d.title),body:`<div class="article-meta"><span class="tag gold">${V(d.tag||"NOTÍCIA")}</span><span class="tiny">${Vt(d.date)} · ${Et(d.division)}</span></div>
        <div class="article-hero" style="background:radial-gradient(circle at 70% 20%, ${u}66, transparent 50%), linear-gradient(135deg, #18111c, #0a0a0e)"><span>${Fn(((g=d.hero)==null?void 0:g.name)||"TG")}</span></div>
        <p class="article-body">${V(d.subtitle||"")}

${V(d.body||"")}</p>`,actions:[{label:"Fechar",cls:"btn-ghost"},{label:"Voltar às notícias",cls:"btn-primary"}]})};return a.querySelector('[data-action="simulate"]').addEventListener("click",()=>{if(!t){i.toast("Crie uma carreira para simular e salvar notícias.","error","lock");return}if(Jo(i.universe,t,3),Math.random()<.7){const h=bd(i.universe,t,t.profile.division);h&&Un(t,h)}Mt(t,!0),i.toast("O universo se movimentou. Novas notícias publicadas.","success","news"),c()}),c(),a}const Q1=[{id:"all",name:"Todos"},{id:"gym",name:"Academia"},{id:"training",name:"Treino"},{id:"staff",name:"Treinadores"},{id:"sponsor",name:"Patrocínio"},{id:"cosmetic",name:"Cosméticos"}];function ex(i){const e=i.save;if(!e)return Bt(`<div class="screen plain">${i.topbar("shop")}${jn({kicker:"Economia",title:"Loja TG",sub:"Crie uma carreira para comprar equipamentos."})}<div class="empty-state">${J("shop",40)}<b>Loja bloqueada</b><p>Você precisa de uma carreira ativa para gastar TG COIN.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>`);const t=e.career;let n="all";const s=Bt(`<div class="screen">
    ${i.topbar("shop")}
    ${jn({kicker:"Economia virtual",title:"Loja TG",sub:"Equipamentos reais da academia, treinadores, patrocínios e itens cosméticos. TG COIN é uma moeda 100% virtual, sem valor em dinheiro real.",actions:`<span class="chip gold">${J("coin",13)} ${nt(t.coins)} TG</span>
        <span class="chip">${J("coin",13)} C$ ${nt(t.money)}</span>
        <button class="btn btn-sm btn-gold-outline" data-action="daily">${J("calendar",14)} Bônus diário</button>`})}
    <div class="row between" style="margin-bottom:14px">
      <div class="tabs" style="margin:0;border:none">${Q1.map(d=>`<button data-cat="${d.id}" class="${d.id===n?"active":""}">${d.name}</button>`).join("")}</div>
      <span class="tiny" data-count></span>
    </div>
    <div class="grid grid-auto" data-grid></div>
    <div class="divider"></div>
    <div class="grid grid-2">
      <div class="notice">${J("shield",14)} <b>Proteção de economia:</b> compras são validadas no seu save local, TG COIN não pode ser convertido em dinheiro real e não há compra de moeda com dinheiro real. Itens de treino são fictícios e não representam substâncias reais.</div>
      <div class="notice green">${J("coin",14)} <b>Ganhe TG:</b> vitórias, títulos, contratos, conquistas, patrocínios e o bônus diário. Cada luta rende TG COIN de acordo com a bolsa e o hype.</div>
    </div>
  </div>`),a=s.querySelector("[data-grid]"),r=s.querySelector("[data-count]"),o=d=>(t.gym.equipment||[]).includes(d.id)||d.type==="sponsor"&&t.sponsor===d.id,c=()=>{const d=qi.filter(u=>n==="all"||u.type===n);r.textContent=`${d.length} itens`,a.innerHTML=d.map(u=>{var v;const p=o(u),g=u.type==="training"&&((v=t.boosters)==null?void 0:v[u.id])||0;return`<div class="shop-card ${p?"owned":""}">
        <div class="ico-big">${J(u.icon,34)}</div>
        <div class="row between"><span class="tag ${u.type==="cosmetic"?"blue":u.type==="sponsor"?"green":"gold"}">${tx(u.type)}</span>${p?`<span class="tag green">${J("check",10)} COMPRADO</span>`:""}</div>
        <h4>${V(u.name)}</h4>
        <p>${V(u.desc)}</p>
        ${u.type==="training"?`<span class="tiny">Estoque: ${g} · uso único por sessão</span>`:""}
        <div class="price-row">
          <div class="price">${nt(u.price)} <small>C$</small>${u.coins?`<span class="tiny gold"> + ${u.coins} TG</span>`:""}</div>
          <button class="btn btn-sm ${p&&u.type!=="training"?"":"btn-primary"}" data-buy="${u.id}" ${p&&u.type!=="training"?"disabled":""}>
            ${u.type==="training"?g?"Comprar outro":"Comprar":p?"Adquirido":"Comprar"}
          </button>
        </div>
      </div>`}).join(""),a.querySelectorAll("[data-buy]").forEach(u=>u.addEventListener("click",()=>l(u.dataset.buy)))},l=d=>{const u=qi.find(p=>p.id===d);if(u){if(o(u)&&u.type!=="training"){i.toast("Você já possui este item.","error","check");return}if(t.money<u.price){i.toast("Carteira insuficiente. Vença lutas para ganhar C$.","error","coin");return}if(u.coins&&t.coins<u.coins){i.toast(`TG COIN insuficiente. Faltam ${u.coins-t.coins} TG.`,"error","coin");return}if(u.type==="sponsor"&&t.sponsor&&t.sponsor!==u.id){const p=qi.find(g=>g.id===t.sponsor);i.confirm({title:"Trocar patrocínio?",message:`Seu patrocínio atual é <b>${V((p==null?void 0:p.name)||"outro")}</b>. Deseja substituí-lo por <b>${V(u.name)}</b>?`,confirmLabel:"Trocar",onConfirm:()=>h(u)});return}h(u)}},h=d=>{if(Mp(e,-d.price),d.coins&&ko(e,-d.coins,"Compra na loja"),d.type==="training")t.boosters[d.id]=(t.boosters[d.id]||0)+1;else{t.gym.equipment.includes(d.id)||t.gym.equipment.push(d.id),d.type==="staff"&&(t.gym.coach=d.name),d.type==="sponsor"&&(t.sponsor=d.id),d.id==="cosmetic_gold"&&(e.profile.appearance.glove="glove96"),d.id==="cosmetic_medal"&&(e.profile.appearance.medal=yp[1]),d.id==="robe_champ"&&(e.profile.appearance.robe="robe95");const u=t.gym.equipment.filter(p=>{var g;return((g=qi.find(v=>v.id===p))==null?void 0:g.type)==="gym"}).length;t.gym.level=Math.min(10,1+Math.floor(u*.75))}Mt(e,!0),i.app.audio.coin(),i.toast(`${d.name} adquirido!`,"success",d.icon),i.refresh({scroll:"keep"})};return s.querySelectorAll("[data-cat]").forEach(d=>{d.addEventListener("click",()=>{n=d.dataset.cat,s.querySelectorAll("[data-cat]").forEach(u=>u.classList.toggle("active",u===d)),c()})}),s.querySelector('[data-action="daily"]').addEventListener("click",()=>{const d=new Date().toISOString().slice(0,10);if(t.lastDaily===d){i.toast("Bônus diário já resgatado hoje. Volte amanhã!","error","calendar");return}t.lastDaily=d,ko(e,75,"Bônus diário"),Mt(e,!0),i.app.audio.coin(),i.toast("+75 TG COIN de bônus diário!","success","coin"),i.refresh({scroll:"keep"})}),c(),s}function tx(i){return{gym:"ACADEMIA",training:"TREINO FICTÍCIO",staff:"EQUIPE",sponsor:"PATROCÍNIO",cosmetic:"COSMÉTICO"}[i]||"ITEM"}function nx(i){var I,w,E;const e=i.save;if(!e)return Bt(`<div class="screen plain">${i.topbar("gym")}${jn({kicker:"Preparação",title:"Academia",sub:"Crie uma carreira para treinar."})}<div class="empty-state">${J("gym",40)}<b>Academia fechada</b><p>Seu lutador ainda não existe. Crie uma carreira para começar o treinamento.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>`);const t=e.career,n=e.profile,s=t.training;let a=s.lastDrill||"power",r=!0,o=.5,c=1,l=!1;const h=t.gym.coach==="Basico"?"Coach Básico":t.gym.coach,d=Qh.idle[Math.floor(Math.random()*Qh.idle.length)],u=u1(e),p=Bt(`<div class="screen gym-screen">
    ${i.topbar("gym")}
    ${jn({kicker:"Campo de treino",title:"Academia TG",sub:`${V(n.name)} · ${It(t.record)} · Overall ${_n(n.attributes)}. Cada sessão gasta 1 dia e aumenta a fadiga.`,actions:`<span class="chip ${s.sessionsLeft?"green":"red"}">${J("bolt",13)} ${s.sessionsLeft}/4 sessões</span>
        <span class="chip">${J("heart",13)} Fadiga ${s.fatigue}%</span>
        <button class="btn btn-sm btn-gold-outline" data-action="rest">${J("clock",14)} Descansar 7 dias</button>`})}
    <div class="gym-layout">
      <div class="stack">
        <div class="gym-hero panel" style="border:none;background:linear-gradient(0deg,rgba(6,6,8,.92),rgba(6,6,8,.2))">
          <div>
            <div class="kicker">${V(h)}</div>
            <h2>Pronto para suar?</h2>
            <p>"${V(d)}"</p>
            <div class="row" style="gap:6px">
              <span class="chip gold">Nível da academia ${t.gym.level}</span>
              <span class="chip">${t.gym.equipment.length} equipamentos</span>
              ${u.length?`<span class="chip green">${u.reduce((C,U)=>C+U.count,0)} boosters</span>`:""}
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Escolha o treino</h3><span class="tiny">Clique em um drill e acerte o tempo</span></div>
          <div class="panel-body">
            <div class="drill-grid" data-drills>
              ${tr.map(C=>`<div class="drill-card ${a===C.id?"active":""}" data-drill="${C.id}">
                <div class="row" style="gap:8px"><span class="ico">${J(C.icon,18)}</span><div><b>${C.name}</b><div class="tiny">${C.attrs.map(U=>U[0].toUpperCase()+U.slice(1)).join(" + ")}</div></div></div>
                <p class="tiny" style="margin:7px 0 0;line-height:1.4">${C.desc}</p>
              </div>`).join("")}
            </div>

            <div class="timing-panel" data-timing>
              <div class="row between"><span class="tiny">Janela de impacto</span><span class="tiny" data-preview>${(I=tr.find(C=>C.id===a))==null?void 0:I.name}</span></div>
              <div class="timing-game">
                <div class="timing-zone" style="left:36%;width:28%"></div>
                <div class="timing-marker" data-marker style="left:50%"></div>
              </div>
              <div class="row between">
                <span class="tiny">${s.sessionsLeft>0?"Acerte o centro para ganho máximo.":"Sem sessões. Descanse para recuperar."}</span>
                <button class="btn btn-primary" data-action="train" ${s.sessionsLeft<=0?"disabled":""}>${J("fist",15)} Golpear!</button>
              </div>
              <div class="timing-result" data-result></div>
            </div>
          </div>
        </div>
      </div>

      <div class="stack">
        <div class="panel">
          <div class="panel-head"><h3>Atributos</h3><span class="tiny">Overall ${_n(n.attributes)}</span></div>
          <div class="panel-body">${vd(n.attributes)}
            <div class="divider" style="margin:12px 0"></div>
            <div class="row between"><span class="tiny">Fadiga atual</span><b>${s.fatigue}%</b></div>
            <div class="progress" style="margin-top:6px"><i style="width:${s.fatigue}%;background:linear-gradient(90deg,#34d399,#f2c14e,#e11d48)"></i></div>
            <div class="row between" style="margin-top:12px"><span class="tiny">Sessões totais</span><b>${s.totalSessions}</b></div>
            <div class="row between" style="margin-top:6px"><span class="tiny">Último treino</span><b>${V(((w=tr.find(C=>C.id===s.lastDrill))==null?void 0:w.name)||"—")}</b></div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Equipamentos</h3><button class="btn btn-sm btn-ghost" data-nav="shop">Loja ${J("arrow",12)}</button></div>
          <div class="panel-body">
            ${t.gym.equipment.length?t.gym.equipment.map(C=>{const U=qi.find(y=>y.id===C);return U?`<div class="training-row"><div class="ico">${J(U.icon,16)}</div><div style="flex:1"><b>${V(U.name)}</b><span>${V(U.desc)}</span></div><span class="tag green">ATIVO</span></div>`:""}).join(""):`<div class="empty-state" style="padding:20px">${J("bag",30)}<b>Academia vazia</b><p>Compre saco de pancada, ringue e kits para acelerar o treino.</p><button class="btn btn-sm btn-primary" data-nav="shop">Abrir loja</button></div>`}
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Boosters fictícios</h3></div>
          <div class="panel-body">
            ${u.length?u.map(({item:C,count:U})=>`<div class="row between" style="padding:7px 0;border-bottom:1px solid var(--line)"><div><b style="font-family:var(--font-cond);font-size:13px">${V(C.name)}</b><div class="tiny">${V(C.desc)}</div></div><span class="chip gold">x${U}</span></div>`).join(""):'<p class="tiny">Nenhum booster. Eles são itens de treino fictícios e não representam substâncias reais.</p>'}
            <div class="notice" style="margin-top:12px">${J("shield",13)} Boosters são consumidos automaticamente no próximo treino e buffam o ganho em +8%.</div>
          </div>
        </div>

        ${t.activeOffer?`<div class="next-fight-card"><div class="kicker">Luta marcada</div><h3>${V(t.activeOffer.opponent.name)}</h3><div class="meta">${V(t.activeOffer.eventName)} · ${V(t.activeOffer.arenaName)}</div><button class="btn btn-primary btn-sm btn-block" style="margin-top:10px" data-action="fight">${J("play",13)} Iniciar luta</button></div>`:""}
      </div>
    </div>
  </div>`),g=p.querySelector("[data-marker]"),v=p.querySelector("[data-preview]"),m=p.querySelector("[data-result]"),f=()=>{g.style.left=`${o*100}%`},_=ci.on("frame",C=>{!r||l||(o+=c*C*.78,o>1&&(o=1,c=-1),o<0&&(o=0,c=1),f())});i.onCleanup(_),p.querySelectorAll("[data-drill]").forEach(C=>{C.addEventListener("click",()=>{var U;a=C.dataset.drill,p.querySelectorAll("[data-drill]").forEach(y=>y.classList.toggle("active",y===C)),v.textContent=(U=tr.find(y=>y.id===a))==null?void 0:U.name,l=!1,r=!0,o=.5,m.innerHTML="",i.app.audio.ui()})});const b=()=>{if(l||s.sessionsLeft<=0)return;l=!0,r=!1;const C=Math.abs(o-.5),U=Math.max(0,Math.min(1,1-C/.5)),y=C<.07?"PERFEITO":C<.16?"ÓTIMO":C<.28?"BOM":"FRACO";m.innerHTML=`<div class="timing-hit" style="left:50%;transform:translate(-50%,-50%);color:${C<.16?"var(--green)":C<.3?"var(--gold)":"#ff7c91"}">${y}</div>`;const x=o1(e,i.universe,a,U);if(!x.ok){i.toast(x.message,"error","bolt"),r=!0,l=!1;return}const N=Object.entries(x.gains).map(([O,G])=>`+${G} ${O[0].toUpperCase()+O.slice(1)}`).join(" · ");Mt(e,!0),i.app.audio.punch(.7),m.innerHTML=`<div class="training-gain"><span class="tag ${C<.16?"green":"gold"}">${y}</span> ${V(N)} <span class="tiny">Fadiga ${x.fatigue}%</span></div>`,i.toast(`Treino concluído: ${N}`,"success","gym"),setTimeout(()=>i.refresh({scroll:"keep"}),1100)};p.querySelector('[data-action="train"]').addEventListener("click",b),p.querySelector('[data-action="rest"]').addEventListener("click",()=>{Rp(e,i.universe,7),Mt(e,!0),i.toast("Descanso concluído: sessões restauradas e fadiga reduzida.","success","heart"),i.refresh({scroll:"keep"})}),(E=p.querySelector('[data-action="fight"]'))==null||E.addEventListener("click",()=>i.navigate("fight",{mode:"career",offer:t.activeOffer,arenaId:t.activeOffer.arenaId,rounds:t.activeOffer.rounds,division:n.division}));const M=C=>{C.code==="Space"&&!C.repeat&&!C.target.closest("input,select,textarea,button")&&(C.preventDefault(),b())};return window.addEventListener("keydown",M),i.onCleanup(()=>window.removeEventListener("keydown",M)),p}const ix=[{id:"overview",name:"Visão geral"},{id:"history",name:"Histórico de lutas"},{id:"belts",name:"Cinturões & troféus"},{id:"records",name:"Livro de recordes"},{id:"awards",name:"Prêmios"},{id:"achievements",name:"Conquistas"}];function sx(i,e={}){const t=i.save;if(!t)return Bt(`<div class="screen plain">${i.topbar("stats")}${jn({kicker:"Legado",title:"Estatísticas",sub:"Crie uma carreira para acompanhar seu legado."})}<div class="empty-state">${J("stats",40)}<b>Sem dados</b><p>Seu legado começa com a primeira luta.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>`);const n=t.career,s=t.profile;Ns(t);const a=xr(i.universe,s.division,n.points);let r=e.tab||"overview";const o=n.record.w+n.record.l+n.record.d?Math.round(n.record.w/(n.record.w+n.record.l+n.record.d)*100):0,c=n.belts||[],l=Bt(`<div class="screen">
    ${i.topbar("stats")}
    ${jn({kicker:"Legado & história",title:"Estatísticas & Prêmios",sub:`${V(s.name)} · ${Et(s.division)} · Temporada ${n.season.year} · Ranking #${a}`,actions:`<span class="chip gold">${J("crown",13)} Overall ${_n(s.attributes)}</span><span class="chip">${J("belt",13)} ${c.length} títulos</span>`})}
    <div class="tabs" data-tabs>${ix.map(w=>`<button data-tab="${w.id}" class="${w.id===r?"active":""}">${w.name}</button>`).join("")}</div>
    <div data-body></div>
  </div>`),h=l.querySelector("[data-body]"),d=()=>{r==="overview"?h.innerHTML=u():r==="history"?h.innerHTML=g():r==="belts"?h.innerHTML=m():r==="records"?h.innerHTML=f():r==="awards"?h.innerHTML=_():h.innerHTML=b(),M()},u=()=>{const w=n.history.slice(0,5),E=[...n.rankHistory];(!E.length||E[E.length-1].rank!==a)&&E.push({date:n.date,rank:a});const C=E.slice(-30).map(y=>y.rank),U=ax(C);return`
      <div class="grid grid-4" style="margin-bottom:16px">
        ${Hi("Cartel",It(n.record),`${n.record.ko} nocautes`,!0)}
        ${Hi("Taxa de vitória",`${o}%`,`${n.record.w}V · ${n.record.l}D · ${n.record.d}E`)}
        ${Hi("Ranking",`#${a}`,Et(s.division))}
        ${Hi("Bolsas",`C$ ${nt(n.totalPurse)}`,`${n.history.length} lutas registradas`)}
      </div>
      <div class="dashboard-grid">
        <div class="stack">
          <div class="panel"><div class="panel-head"><h3>Atributos atuais</h3><span class="tiny">Overall ${_n(s.attributes)} / 99</span></div><div class="panel-body">${vd(s.attributes)}</div></div>
          <div class="panel"><div class="panel-head"><h3>Últimas lutas</h3><button class="btn btn-sm btn-ghost" data-action="tab-history">Ver histórico ${J("arrow",12)}</button></div><div class="panel-body">${w.length?w.map(y=>p(y)).join(""):'<p class="tiny">Nenhuma luta disputada ainda.</p>'}</div></div>
        </div>
        <div class="stack">
          <div class="panel"><div class="panel-head"><h3>Evolução no ranking</h3><span class="tiny">Últimas ${C.length} atualizações</span></div><div class="panel-body">
            <div class="rank-spark">${U}</div>
            <div class="row between" style="margin-top:8px"><span class="tiny">#100</span><span class="tiny">Posição atual: #${a}</span><span class="tiny">#1</span></div>
          </div></div>
          <div class="panel"><div class="panel-head"><h3>Resumo da carreira</h3></div><div class="panel-body">
            <div class="row between"><span class="tiny">Reputação</span><b>${n.reputation}/100</b></div>
            <div class="progress" style="margin:6px 0 12px"><i style="width:${n.reputation}%"></i></div>
            <div class="row between"><span class="tiny">Melhor sequência</span><b>${n.bestStreak} vitórias</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Arenas visitadas</span><b>${new Set(n.foughtArenas).size}/15</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Títulos mundiais</span><b>${c.filter(y=>["world","undisputed","supreme"].includes(y.tier)).length}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">TG COIN</span><b class="gold">${nt(n.coins)}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Carteira</span><b>C$ ${nt(n.money)}</b></div>
          </div></div>
          <div class="panel"><div class="panel-head"><h3>Temporada ${n.season.year}</h3></div><div class="panel-body">
            <div class="row between"><span class="tiny">Lutas</span><b>${n.season.fights}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Vitórias</span><b>${n.season.wins}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Nocautes</span><b>${n.season.kos}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Defesas de título</span><b>${n.season.defenses}</b></div>
          </div></div>
        </div>
      </div>`},p=w=>`<div class="history-row" data-history="${V(w.id)}">
    <span class="result-badge ${w.result==="V"?"win":w.result==="D"?"loss":"draw"}">${w.result}</span>
    <div style="flex:1;min-width:0"><b>${V(w.opponentName)}</b><div class="tiny">${Vt(w.date)} · ${V(w.arena)} · ${V(w.method)}${w.round?" R"+w.round:""}</div></div>
    <div style="text-align:right"><b class="gold" style="font-family:var(--font-display);font-size:16px">C$ ${nt(w.purse)}</b><div class="tiny">${w.coins||0} TG</div></div>
  </div>`,g=()=>`<div class="grid grid-2">
    <div class="panel"><div class="panel-head"><h3>Todas as lutas</h3><span class="tiny">${n.history.length} registros</span></div><div class="panel-body">${n.history.length?n.history.map(w=>p(w)).join(""):'<p class="tiny">Nenhuma luta registrada.</p>'}</div></div>
    <div class="stack">
      <div class="panel"><div class="panel-head"><h3>Resumo</h3></div><div class="panel-body">
        <div class="grid grid-2">
          ${Hi("Vitórias",n.record.w,"por decisão e nocaute")}
          ${Hi("Nocautes",n.record.ko,"vitórias antes do limite")}
          ${Hi("Derrotas",n.record.l,"lições da carreira")}
          ${Hi("Empates",n.record.d,"decisões divididas")}
        </div>
      </div></div>
      <div class="panel"><div class="panel-head"><h3>Métodos de vitória</h3></div><div class="panel-body">
        ${v(n.history)}
      </div></div>
    </div>
  </div>`,v=w=>{const E={};for(const U of w.filter(y=>y.result==="V"))E[U.method]=(E[U.method]||0)+1;const C=Object.entries(E).sort((U,y)=>y[1]-U[1]);return C.length?C.map(([U,y])=>`<div class="bar-row" style="grid-template-columns:70px 1fr 30px"><span>${V(U)}</span><span class="bar-track"><i class="bar-fill" style="width:${y/n.record.w*100}%"></i></span><span class="attr-value">${y}</span></div>`).join(""):'<p class="tiny">Sem vitórias ainda.</p>'},m=()=>`
    <div class="stack">
      <div class="panel"><div class="panel-head"><h3>Cinturões conquistados</h3><span class="tiny">${c.length} títulos</span></div><div class="panel-body">
        ${c.length?`<div class="trophy-grid">${c.map(w=>`<div class="trophy" style="border-color:rgba(242,193,78,.35)"><div class="gold-ic">${J("belt",34)}</div><b>${V(ai(w.tier))}</b><small>${On(w.org).short} · ${Et(w.division)}</small><small>${w.defenses||0} defesas</small><small>${Vt(w.wonAt)}</small></div>`).join("")}</div>`:'<div class="empty-state">'+J("belt",36)+"<b>Nenhum cinturão</b><p>Chegue ao TOP 2 da sua divisão e vença uma disputa de título.</p></div>"}
      </div></div>
      <div class="panel"><div class="panel-head"><h3>Trofeus & marcos</h3><span class="tiny">${n.trophies.length} itens</span></div><div class="panel-body">
        ${n.trophies.length?`<div class="trophy-grid">${n.trophies.map(w=>`<div class="trophy"><div class="gold-ic">${J("trophy",30)}</div><b>${V(w.name)}</b><small>${On(w.org).short} · ${Vt(w.date)}</small></div>`).join("")}</div>`:'<p class="tiny">Troféus são adicionados ao conquistar cinturões e prêmios.</p>'}
      </div></div>
      <div class="panel"><div class="panel-head"><h3>Linha do tempo dos cinturões</h3></div><div class="panel-body">
        ${n.beltHistory.length?`<div class="timeline">${n.beltHistory.slice().reverse().map(w=>`<div class="timeline-item"><span class="dot ${w.event==="lost"?"red":""}"></span><div><b>${w.event==="lost"?"Perdeu":"Conquistou"} ${V(ai(w.tier))}</b><div class="tiny">${On(w.org).short} · ${Et(w.division)} · ${Vt(w.date)}${w.opponent?" · vs "+V(w.opponent):""}</div></div></div>`).join("")}</div>`:'<p class="tiny">A história dos seus cinturões aparecerá aqui.</p>'}
      </div></div>
    </div>`,f=()=>{const w=n1(i.universe,t);return`<div class="records-grid">${[["mostWins","Mais vitórias"],["mostKos","Mais nocautes"],["longestStreak","Maior sequência"],["mostDefenses","Mais defesas"],["mostTitles","Mais cinturões"]].map(([C,U])=>`<div class="panel"><div class="panel-head"><h3>${U}</h3></div><div class="panel-body" style="padding-top:6px"><div class="record-list">${(w[C]||[]).map((y,x)=>`<div class="record-row ${y.isPlayer?"me":""}"><span class="pos">${x+1}</span><b style="flex:1;font-weight:${y.isPlayer?600:400};color:${y.isPlayer?"var(--gold)":"inherit"}">${V(y.name)}${y.isPlayer?" (você)":""}</b><span class="val">${C==="mostKos"?y.record.ko:C==="longestStreak"?y.bestStreak||y.streak:C==="mostDefenses"?(y.belts||[]).reduce((N,O)=>N+(O.defenses||0),0):C==="mostTitles"?(y.belts||[]).length:y.record.w}</span></div>`).join("")}</div></div></div>`).join("")}</div>`},_=()=>{const w=h1(t,i.universe);return`<div class="stack">
      <div class="notice">${J("star",13)} Prêmios calculados com os dados atuais do universo e da sua carreira. A temporada ${n.season.year} está em andamento.</div>
      <div class="grid grid-auto">${w.map(E=>{var C,U,y,x;return`<div class="award-card ${(C=E.winner)!=null&&C.isPlayer?"mine":""}">
        <div class="ic">${J(E.icon,30)}</div>
        <b>${V(E.name)}</b>
        <span>${V(((U=E.winner)==null?void 0:U.name)||"—")}</span>
        <small>${V(((y=E.winner)==null?void 0:y.nick)||"")} ${(x=E.winner)!=null&&x.isPlayer?"· VOCÊ":""}</small>
      </div>`}).join("")}</div>
      <div class="panel"><div class="panel-head"><h3>Histórico de premiações</h3></div><div class="panel-body">${n.awards.length?n.awards.map(E=>{var C;return`<div class="row between" style="padding:8px 0;border-bottom:1px solid var(--line)"><span>${V(E.name)} · ${E.year}</span><b class="gold">${V(((C=E.winner)==null?void 0:C.name)||"—")}</b></div>`}).join(""):'<p class="tiny">As premiações anuais serão registradas aqui ao final de cada temporada.</p>'}</div></div>
    </div>`},b=()=>{const w=new Set(n.achievements||[]);return`<div class="grid grid-auto">${bp.map(E=>{const C=w.has(E.id);return`<div class="achievement-card ${C?"unlocked":""}">
        <div class="ic">${J(C?E.icon:"lock",30)}</div>
        <div style="flex:1"><b>${V(E.name)}</b><p class="tiny">${V(E.desc)}</p><span class="chip ${C?"green":""}">${C?"DESBLOQUEADA":"+"+E.coins+" TG"}</span></div>
      </div>`}).join("")}</div>`},M=()=>{var w;h.querySelectorAll("[data-history]").forEach(E=>{E.addEventListener("click",()=>{const C=n.history.find(U=>U.id===E.dataset.history);C&&I(C)})}),(w=h.querySelector('[data-action="tab-history"]'))==null||w.addEventListener("click",()=>{r="history",l.querySelectorAll("[data-tab]").forEach(E=>E.classList.toggle("active",E.dataset.tab===r)),d()})},I=w=>{var y;const E=w.stats||{},C=E.p1||{},U=E.p2||{};i.modal({wide:!0,title:`${w.result==="V"?"Vitória":w.result==="D"?"Derrota":"Empate"} contra ${V(w.opponentName)}`,body:`<div class="row" style="gap:8px;margin-bottom:14px"><span class="result-badge ${w.result==="V"?"win":w.result==="D"?"loss":"draw"}">${w.result}</span><span class="chip">${V(w.method)}${w.round?" · Round "+w.round:""}</span><span class="chip">${Vt(w.date)}</span><span class="chip">${V(w.arena)}</span></div>
        <div class="result-stats" style="margin-bottom:14px">
          <div class="result-side"><div class="result-stat"><span>Golpes</span><b>${C.thrown||0}</b></div><div class="result-stat"><span>Acertos</span><b>${C.landed||0}</b></div><div class="result-stat"><span>Dano</span><b>${Math.round(C.damage||0)}</b></div><div class="result-stat"><span>Combos</span><b>${C.maxCombo||0}</b></div></div>
          <div class="vs-small">VS</div>
          <div class="result-side right"><div class="result-stat"><span>Golpes</span><b>${U.thrown||0}</b></div><div class="result-stat"><span>Acertos</span><b>${U.landed||0}</b></div><div class="result-stat"><span>Dano</span><b>${Math.round(U.damage||0)}</b></div><div class="result-stat"><span>Combos</span><b>${U.maxCombo||0}</b></div></div>
        </div>
        ${(y=w.scorecards)!=null&&y.length?`<div class="scorecards">${w.scorecards.map(x=>`<div class="scorecard">${V(x.judge)}<b>${x.p1} — ${x.p2}</b></div>`).join("")}</div>`:""}
        <div class="result-purse">Bolsa recebida <b>C$ ${nt(w.purse)}</b> · ${w.coins||0} TG COIN</div>`,actions:[{label:"Fechar",cls:"btn-ghost"}]})};return l.querySelectorAll("[data-tab]").forEach(w=>{w.addEventListener("click",()=>{r=w.dataset.tab,l.querySelectorAll("[data-tab]").forEach(E=>E.classList.toggle("active",E===w)),d()})}),d(),l}function ax(i){i.length||(i=[100]);const e=300,t=90,n=i.map((s,a)=>{const r=i.length===1?e/2:a/(i.length-1)*e,o=(s-1)/99*(t-10)+5;return`${r.toFixed(1)},${o.toFixed(1)}`}).join(" ");return`<svg viewBox="0 0 ${e} ${t}" width="100%" height="100" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2c14e" stop-opacity=".35"/><stop offset="1" stop-color="#f2c14e" stop-opacity="0"/></linearGradient></defs>
    <polyline points="${n}" fill="none" stroke="#f2c14e" stroke-width="2" stroke-linejoin="round"/>
    <polygon points="0,${t} ${n} ${e},${t}" fill="url(#spark)"/>
  </svg>`}function rx(i){var M,I,w;const e=i.save,t=(e==null?void 0:e.settings)||{};let n="audio";const s=(E,C,U)=>`<button data-section="${E}" class="${E===n?"active":""}">${J(U,15)} ${C}</button>`,a=Bt(`<div class="screen">
    ${i.topbar("settings")}
    ${jn({kicker:"Preferências",title:"Configurações",sub:"Áudio, gráficos, acessibilidade, controles touch e gerenciamento do save.",actions:e?`<button class="btn btn-sm btn-primary" data-action="save-now">${J("check",14)} Salvar agora</button>`:""})}
    <div class="settings-layout">
      <div class="settings-nav" data-navlist>
        ${s("audio","Áudio","volume")}
        ${s("game","Jogo & gráficos","settings")}
        ${s("controls","Controles touch","grid")}
        ${s("access","Acessibilidade","eye")}
        ${s("data","Dados & save","download")}
        ${s("about","Sobre o jogo","book")}
      </div>
      <div data-panel></div>
    </div>
  </div>`),r=a.querySelector("[data-panel]"),o=()=>{a.querySelectorAll("[data-navlist] button").forEach(E=>E.classList.toggle("active",E.dataset.section===n)),n==="audio"?r.innerHTML=c():n==="game"?r.innerHTML=l():n==="controls"?r.innerHTML=h():n==="access"?r.innerHTML=d():n==="data"?r.innerHTML=u():r.innerHTML=p(),v()},c=()=>`<div class="panel"><div class="panel-head"><h3>Mixagem de áudio</h3><span class="tiny">Procedural · WebAudio</span></div><div class="panel-body">
    ${g("sfx","Efeitos",t.sfx??.85)}
    ${g("music","Música",t.music??.4)}
    ${g("crowd","Torcida",t.crowd??.75)}
    <div class="divider"></div>
    <label class="toggle">Silenciar tudo <input type="checkbox" data-setting="muted" ${t.muted?"checked":""}></label>
    <div class="notice" style="margin-top:12px">${J("music",13)} Todo o áudio é sintetizado em tempo real no navegador. Nenhum arquivo de áudio externo é usado.</div>
  </div></div>`,l=()=>`<div class="panel"><div class="panel-head"><h3>Experiência de jogo</h3></div><div class="panel-body">
    <div class="field"><label>Dificuldade da IA</label><select class="input" data-setting="difficulty">${f_.map(E=>`<option value="${E.id}" ${(t.difficulty||"pro")===E.id?"selected":""}>${E.name} — ${E.desc}</option>`).join("")}</select></div>
    <div class="field"><label>Qualidade gráfica</label><select class="input" data-setting="quality">${[["auto","Automática"],["high","Alta"],["medium","Média"],["low","Baixa (60 FPS)"]].map(([E,C])=>`<option value="${E}" ${(t.quality||"auto")===E?"selected":""}>${C}</option>`).join("")}</select></div>
    <label class="toggle">Salvamento automático <input type="checkbox" data-setting="autoSave" ${t.autoSave!==!1?"checked":""}></label>
    <label class="toggle">Tremor de câmera nos impactos <input type="checkbox" data-setting="cameraShake" ${t.cameraShake!==!1?"checked":""}></label>
    <div class="notice" style="margin-top:12px">${J("bolt",13)} Em dispositivos móveis a qualidade é reduzida automaticamente para buscar 60 FPS. A resolução máxima também é limitada pelo devicePixelRatio.</div>
  </div></div>`,h=()=>{var E,C,U,y,x,N,O,G,F,R,W,Y,ie,D,P,te;return`<div class="panel"><div class="panel-head"><h3>Controles touch</h3><span class="tiny">Tamanho, opacidade e posição</span></div><div class="panel-body">
    ${g("joystick","Joystick (px)",((E=t.controls)==null?void 0:E.joystick)??128,80,190,1)}
    ${g("buttons","Botões (px)",((C=t.controls)==null?void 0:C.buttons)??132,100,180,1)}
    ${g("opacity","Opacidade",((U=t.controls)==null?void 0:U.opacity)??.8,.3,1,.05)}
    <div class="field"><label>Lado do controle direcional</label><div class="wager-row"><button data-side="left" class="${(((y=t.controls)==null?void 0:y.side)||"right")==="left"?"active":""}">Esquerda</button><button data-side="right" class="${(((x=t.controls)==null?void 0:x.side)||"right")==="right"?"active":""}">Direita</button></div></div>
    <label class="toggle">Vibração (haptic) <input type="checkbox" data-control="haptic" ${((N=t.controls)==null?void 0:N.haptic)!==!1?"checked":""}></label>
    <div class="control-customizer" data-preview>
      <div class="cc-stick" data-stick style="width:${(((O=t.controls)==null?void 0:O.joystick)??128)*.6}px;height:${(((G=t.controls)==null?void 0:G.joystick)??128)*.6}px;left:${(((F=t.controls)==null?void 0:F.side)||"right")==="left"?"18px":"auto"};right:${(((R=t.controls)==null?void 0:R.side)||"right")==="right"?"18px":"auto"};bottom:18px">JOY</div>
      <div class="cc-btn" data-btn style="width:${(((W=t.controls)==null?void 0:W.buttons)??132)*.42}px;height:${(((Y=t.controls)==null?void 0:Y.buttons)??132)*.42}px;left:${(((ie=t.controls)==null?void 0:ie.side)||"right")==="right"?"18px":"auto"};right:${(((D=t.controls)==null?void 0:D.side)||"right")==="left"?"18px":"auto"};bottom:26px">JAB</div>
      <div class="cc-btn" style="width:${(((P=t.controls)==null?void 0:P.buttons)??132)*.42}px;height:${(((te=t.controls)==null?void 0:te.buttons)??132)*.42}px;right:68px;bottom:70px">DIR</div>
    </div>
    <div class="notice" style="margin-top:12px">${J("grid",13)} Os controles touch aparecem automaticamente em dispositivos com tela sensível ao toque. No desktop use teclado e mouse.</div>
  </div></div>`},d=()=>`<div class="panel"><div class="panel-head"><h3>Acessibilidade</h3></div><div class="panel-body">
    <label class="toggle">Reduzir movimento e animações <input type="checkbox" data-setting="reducedMotion" ${t.reducedMotion?"checked":""}></label>
    <label class="toggle">Mostrar dicas de teclado durante a luta <input type="checkbox" data-setting="showHints" ${t.showHints!==!1?"checked":""}></label>
    <label class="toggle">Alto contraste nos medidores de vida <input type="checkbox" data-setting="highContrast" ${t.highContrast?"checked":""}></label>
    <div class="divider"></div>
    <div class="notice">${J("eye",13)} O jogo usa legendas e feedback visual para todos os eventos importantes (nocautes, rounds, decisões). A interface é em português do Brasil.</div>
  </div></div>`,u=()=>`<div class="stack">
    <div class="panel"><div class="panel-head"><h3>Backup do save</h3><span class="tiny">${e?"Carreira ativa":"Sem carreira"}</span></div><div class="panel-body">
      <p class="tiny">Exporte um arquivo JSON com carreira e universo (1.100 lutadores). O multiplayer online não depende do save, mas o progresso sim.</p>
      <div class="row" style="margin-top:12px;gap:8px">
        <button class="btn btn-sm" data-action="export" ${e?"":"disabled"}>${J("download",14)} Exportar save</button>
        <button class="btn btn-sm" data-action="import">${J("upload",14)} Importar save</button>
        <input type="file" accept="application/json" data-file hidden>
      </div>
    </div></div>
    <div class="panel panel-red"><div class="panel-head"><h3>Zona de risco</h3></div><div class="panel-body">
      <p class="tiny">Apagar o save remove carreira, cinturões e o universo. Não pode ser desfeito.</p>
      <div class="row" style="margin-top:12px;gap:8px">
        <button class="btn btn-sm btn-red" data-action="reset">${J("trash",14)} Apagar carreira</button>
        <button class="btn btn-sm btn-ghost" data-action="clear">${J("trash",14)} Limpar tudo</button>
      </div>
    </div></div>
  </div>`,p=()=>`<div class="panel"><div class="panel-head"><h3>TG BOXING — The Glory of Champions</h3><span class="tiny">v1.0</span></div><div class="panel-body">
    <p>Um jogo de boxe 3D com carreira completa, universo vivo de 1.100 lutadores, rankings TOP 100 em 11 divisões, três organizações e sete níveis de cinturão.</p>
    <div class="divider"></div>
    <div class="row between"><span class="tiny">Engine 3D</span><b>Three.js · procedural</b></div>
    <div class="row between" style="margin-top:7px"><span class="tiny">Multiplayer</span><b>WebRTC · PeerJS</b></div>
    <div class="row between" style="margin-top:7px"><span class="tiny">Áudio</span><b>WebAudio sintetizado</b></div>
    <div class="row between" style="margin-top:7px"><span class="tiny">Persistência</span><b>localStorage</b></div>
    <div class="row between" style="margin-top:7px"><span class="tiny">Idioma</span><b>Português (BR)</b></div>
    <div class="divider"></div>
    <div class="notice">${J("shield",13)} TG COIN é uma moeda exclusivamente virtual, sem valor monetário real e sem conversão para dinheiro. Itens de treino e boosters são fictícios. Personagens, organizações, arenas e marcas são originais e fictícios.</div>
  </div></div>`,g=(E,C,U,y=0,x=1,N=.05)=>`
    <div class="slider-row"><span>${C}</span><input type="range" min="${y}" max="${x}" step="${N}" value="${U}" data-setting="${E}"><b data-val="${E}">${N<1?Math.round(U*100)+"%":Math.round(U)}</b></div>`,v=()=>{var E,C,U,y,x;r.querySelectorAll('input[type="range"][data-setting]').forEach(N=>{N.addEventListener("input",()=>{const O=N.dataset.setting,G=Number(N.value);if(O==="joystick"||O==="buttons"||O==="opacity"){t.controls={...t.controls||{},[O]:G};const F=r.querySelector(`[data-val="${O}"]`);F&&(F.textContent=O==="opacity"?Math.round(G*100)+"%":Math.round(G));const R=r.querySelector("[data-stick]"),W=r.querySelector("[data-btn]");R&&(R.style.width=`${(t.controls.joystick??128)*.6}px`,R.style.height=`${(t.controls.joystick??128)*.6}px`),W&&(W.style.width=`${(t.controls.buttons??132)*.42}px`,W.style.height=`${(t.controls.buttons??132)*.42}px`)}else{t[O]=G;const F=r.querySelector(`[data-val="${O}"]`);F&&(F.textContent=Math.round(G*100)+"%"),f()}m()})}),r.querySelectorAll('input[type="checkbox"][data-setting]').forEach(N=>{N.addEventListener("change",()=>{t[N.dataset.setting]=N.checked,N.dataset.setting==="reducedMotion"&&document.body.classList.toggle("reduce-motion",N.checked),N.dataset.setting==="highContrast"&&document.body.classList.toggle("high-contrast",N.checked),N.dataset.setting==="muted"&&f(),m()})}),r.querySelectorAll("select[data-setting]").forEach(N=>{N.addEventListener("change",()=>{t[N.dataset.setting]=N.value,N.dataset.setting==="quality"&&i.app.setQuality(N.value),m()})}),r.querySelectorAll("[data-side]").forEach(N=>{N.addEventListener("click",()=>{t.controls={...t.controls||{},side:N.dataset.side},r.querySelectorAll("[data-side]").forEach(F=>F.classList.toggle("active",F===N));const O=r.querySelector("[data-stick]"),G=r.querySelector("[data-btn]");O&&(O.style.left=N.dataset.side==="left"?"18px":"auto",O.style.right=N.dataset.side==="right"?"18px":"auto"),G&&(G.style.left=N.dataset.side==="right"?"18px":"auto",G.style.right=N.dataset.side==="left"?"18px":"auto"),m()})}),(E=r.querySelector('[data-action="export"]'))==null||E.addEventListener("click",_),(C=r.querySelector('[data-action="import"]'))==null||C.addEventListener("click",()=>{var N;return(N=r.querySelector("[data-file]"))==null?void 0:N.click()}),(U=r.querySelector("[data-file]"))==null||U.addEventListener("change",b),(y=r.querySelector('[data-action="reset"]'))==null||y.addEventListener("click",()=>{i.confirm({title:"Apagar carreira?",message:"Todo o progresso, cinturões, TG COIN e histórico serão apagados. Esta ação é permanente.",danger:!0,confirmLabel:"Apagar tudo",onConfirm:()=>{su(),location.reload()}})}),(x=r.querySelector('[data-action="clear"]'))==null||x.addEventListener("click",()=>{i.confirm({title:"Limpar todos os dados?",message:"Carreira, universo, configurações e preferências serão removidos.",danger:!0,confirmLabel:"Limpar tudo",onConfirm:()=>{su(),localStorage.clear(),location.reload()}})})},m=()=>{e&&Mt(e,!1)},f=()=>{e&&(i.app.audio.setSettings({...e.settings}),i.app.audio.master&&(i.app.audio.master.gain.value=e.settings.muted?0:.9),i.app.audio.ui())},_=()=>{const E={game:"TG BOXING",version:1,exportedAt:new Date().toISOString(),save:i.save,universe:i.universe},C=new Blob([JSON.stringify(E,null,2)],{type:"application/json"}),U=document.createElement("a");U.href=URL.createObjectURL(C),U.download=`tgboxing-save-${new Date().toISOString().slice(0,10)}.json`,U.click(),setTimeout(()=>URL.revokeObjectURL(U.href),2e3),i.toast("Save exportado.","success","download")},b=E=>{var y;const C=(y=E.target.files)==null?void 0:y[0];if(!C)return;const U=new FileReader;U.onload=()=>{var x;try{const N=JSON.parse(U.result);if(!((x=N.save)!=null&&x.profile))throw new Error("Arquivo inválido");kl(N.save,{universe:N.universe}),i.toast("Save importado. Recarregando...","success","upload"),setTimeout(()=>location.reload(),700)}catch(N){i.toast("Falha ao importar: "+N.message,"error","close")}},U.readAsText(C)};return(M=e==null?void 0:e.settings)!=null&&M.reducedMotion&&document.body.classList.add("reduce-motion"),(I=e==null?void 0:e.settings)!=null&&I.highContrast&&document.body.classList.add("high-contrast"),a.querySelectorAll("[data-navlist] button").forEach(E=>E.addEventListener("click",()=>{n=E.dataset.section,o()})),(w=a.querySelector('[data-action="save-now"]'))==null||w.addEventListener("click",()=>i.saveNow()),o(),a}const xu=[0,50,100,250,500],Mu=[3,4,6];function ox(i){var t,n,s,a;if((t=i==null?void 0:i.profile)!=null&&t.created){const r=i.profile;return{id:"player",name:r.name,nick:r.nickname||"",nationality:r.nationality,division:r.division,style:r.style,age:r.age,attributes:{...r.attributes||{}},appearance:{...mr,...r.appearance||{}},record:{...((n=i.career)==null?void 0:n.record)||{w:0,l:0,d:0,ko:0}},overall:gr(r.attributes),points:((s=i.career)==null?void 0:s.points)||0,belts:(((a=i.career)==null?void 0:a.belts)||[]).map(o=>({...o}))}}const e={...xp()};for(const r of Object.keys(e))e[r]=58;return{id:"guest",name:"Desafiante TG",nick:"The Challenger",nationality:"BRA",division:"middle",style:"technical",age:24,attributes:e,appearance:{...mr,...Aa("tg-online-challenger")},record:{w:0,l:0,d:0,ko:0},overall:gr(e),points:0,belts:[]}}function Vi(i={}){var n,s,a,r,o;const e=i.attributes||{},t={};for(const c of["strength","speed","stamina","precision","defense","reflexes","mobility","recovery","conditioning"])t[c]=Math.max(20,Math.min(99,Number(e[c])||50));return{id:String(i.id||"guest").slice(0,30),name:String(i.name||"Lutador Online").slice(0,26),nick:String(i.nick||"").slice(0,24),nationality:String(i.nationality||"BRA").slice(0,3).toUpperCase(),division:xn[i.division]?i.division:"middle",style:((n=Si.find(c=>c.id===i.style))==null?void 0:n.id)||"technical",age:Math.max(16,Math.min(60,Number(i.age)||24)),attributes:t,appearance:{...mr,...i.appearance&&typeof i.appearance=="object"?i.appearance:{}},record:{w:Math.max(0,Number((s=i.record)==null?void 0:s.w)||0),l:Math.max(0,Number((a=i.record)==null?void 0:a.l)||0),d:Math.max(0,Number((r=i.record)==null?void 0:r.d)||0),ko:Math.max(0,Number((o=i.record)==null?void 0:o.ko)||0)},overall:Math.max(20,Math.min(99,Number(i.overall)||gr(t))),points:Math.max(0,Number(i.points)||0),belts:Array.isArray(i.belts)?i.belts.slice(0,12):[]}}function cx(i){return i.mp||null}function vn(i,e){var t,n;return((n=(t=i.mp)==null?void 0:t.session)==null?void 0:n.send(e))||!1}function Wl(i,e){return i.mp?(i.mp.listeners.add(e),()=>{var t;return(t=i.mp)==null?void 0:t.listeners.delete(e)}):()=>{}}function Xl(i){var t,n;const e=i.mp;if(e){try{(t=e.session)==null||t.destroy()}catch{}(n=e.listeners)==null||n.clear(),i.mp=null}}function Su(i,e){return{...Vi(i),id:e,isPlayer:e==="p1"}}function lx(i,e={}){var Y,ie;const t=i.mp,n=!!(t!=null&&t.session&&!t.session.destroyed),s=n?t.role:null,a={phase:n?"lobby":"menu",code:n?t.code:"",public:n?!!t.public:!1,role:s,status:n?{state:"online",label:"Conectado"}:{state:"idle",label:"Pronto para conectar"},localInfo:Vi(n?t.localInfo:ox(i.save)),remoteInfo:n?t.remoteInfo:null,hostReady:n?!!t.hostReady:!1,guestReady:n?!!t.guestReady:!1,hostWager:n&&t.hostWager||0,guestWager:n&&t.guestWager||0,wager:n&&t.wager||0,rounds:n&&t.rounds||3,arenaId:n&&t.arenaId||"national",messages:n?t.messages||[]:[],chatText:"",error:"",joining:!1,busy:!1,starting:!1};((ie=(Y=i.save)==null?void 0:Y.career)==null?void 0:ie.coins)!=null&&(a.localCoins=i.save.career.coins);let r,o,c=()=>{};const l=()=>{const D=i.mp;D&&(D.role=a.role,D.code=a.code,D.public=a.public,D.localInfo=a.localInfo,D.remoteInfo=a.remoteInfo,D.hostReady=a.hostReady,D.guestReady=a.guestReady,D.hostWager=a.hostWager,D.guestWager=a.guestWager,D.wager=a.wager,D.rounds=a.rounds,D.arenaId=a.arenaId,D.messages=a.messages,D.status=a.status)},h=D=>{const P={role:D,localInfo:a.localInfo,remoteInfo:null,code:a.code,public:!1,hostReady:!1,guestReady:!1,hostWager:0,guestWager:0,wager:0,rounds:a.rounds,arenaId:a.arenaId,messages:[],listeners:new Set,match:null};return P.session=new z1({onEvent:(te,ae)=>{if(te!=="message")for(const $ of P.listeners)try{$(te,ae||{})}catch(Q){console.warn("mp listener",te,Q)}}}),i.mp=P,c=Wl(i,p),P},d=(D,P)=>{a.status={state:D,label:P}},u=(D="")=>{Xl(i),c(),c=()=>{},a.phase="menu",a.error=D,a.role=null,a.remoteInfo=null,a.joining=!1,a.busy=!1,a.code="",d("idle","Desconectado"),g()},p=(D,P={})=>{var te,ae,$;switch(D){case"room":{P.code&&(a.code=P.code),P.public!=null&&(a.public=!!P.public),a.phase!=="lobby"&&(a.phase="lobby"),l(),g();break}case"connected":{d("online","Conectado · P2P"),i.mp&&(i.mp.connected=!0),g();break}case"status":{d(P.state||"info",P.label||""),g();break}case"error":{a.error=P.message||"Falha na conexão.",a.joining=!1,a.busy=!1,d("offline",a.error),i.toast(a.error,"error","wifiOff"),a.phase==="menu"||!((te=i.mp)!=null&&te.connected)?u(a.error):g();break}case"notice":{P.message&&i.toast(P.message,"info","wifi");break}case"disconnected":{d("offline","Conexão perdida. Tentando reconectar..."),l(),g();break}case"reconnected":{d("online","Reconectado"),i.toast("Reconectado ao adversário.","success","wifi"),g();break}case"hello":{if(a.role!=="host")break;a.remoteInfo=Vi(P),i.mp&&(i.mp.remoteInfo=a.remoteInfo),typeof P.ready=="boolean"&&(a.guestReady=P.ready),Number.isFinite(Number(P.wager))&&(a.guestWager=Number(P.wager)),vn(i,{t:"welcome",host:a.localInfo,code:a.code,ready:a.hostReady,wager:a.hostWager,rounds:a.rounds,arenaId:a.arenaId,match:((ae=i.mp)==null?void 0:ae.match)||null}),d("online",P.resume?"Adversário reconectado":"Adversário conectado"),l(),P.resume&&i.toast("Adversário reconectado.","success","wifi"),g();break}case"welcome":{if(a.role!=="guest")break;a.remoteInfo=Vi(P.host||P),i.mp&&(i.mp.remoteInfo=a.remoteInfo),typeof P.ready=="boolean"&&(a.hostReady=P.ready),Number.isFinite(Number(P.wager))&&(a.hostWager=Number(P.wager)),Number.isFinite(Number(P.rounds))&&(a.rounds=Number(P.rounds)),Ss[P.arenaId]&&(a.arenaId=P.arenaId),P.match&&(i.mp.match=P.match),d("online","Conectado ao anfitrião"),l(),g();break}case"settings":{if(a.role!=="guest")break;Mu.includes(Number(P.rounds))&&(a.rounds=Number(P.rounds)),Ss[P.arenaId]&&(a.arenaId=P.arenaId),g();break}case"ready":{a.role==="host"?(a.guestReady=!!P.ready,Number.isFinite(Number(P.wager))&&(a.guestWager=Number(P.wager)),P.info&&(a.remoteInfo=Vi(P.info))):(a.hostReady=!!P.ready,Number.isFinite(Number(P.wager))&&(a.hostWager=Number(P.wager)),P.info&&(a.remoteInfo=Vi(P.info))),l(),g();break}case"chat":{const Q=String(P.text||"").slice(0,180).trim();if(!Q)break;a.messages.push({from:(($=a.remoteInfo)==null?void 0:$.name)||"Adversário",text:Q,mine:!1}),a.messages.length>40&&a.messages.shift(),l(),g({keepChat:!0});break}case"match":{if(!P.match||a.role!=="guest")break;i.mp&&(i.mp.match=P.match),a.starting=!0,l(),W();break}case"closed":{a.phase==="lobby"&&(d("offline","Sala encerrada pelo anfitrião."),i.toast("A sala foi encerrada.","error","wifiOff"),u("Sala encerrada."));break}}},g=({keepChat:D=!1}={})=>{if(o&&(o.innerHTML=a.phase==="lobby"?M():f(),I(),D)){const P=o.querySelector("[data-chat-feed]");P&&(P.scrollTop=P.scrollHeight)}},v=()=>{const D=a.localInfo;return`<div class="mp-identity">
      <div class="avatar-lg">${Fn(D.name)}</div>
      <div style="flex:1;min-width:0">
        <div class="kicker">Seu lutador</div>
        <b class="mp-name">${V(D.name)}</b>
        <div class="tiny">${It(D.record)} · ${Et(D.division)} · Overall ${D.overall} · ${V(D.nationality)}</div>
      </div>
      <span class="chip gold">${J("coin",12)} ${nt(a.localCoins??300)} TG</span>
    </div>`},m=()=>{var te,ae;const D=((te=a.status)==null?void 0:te.state)||"idle";return`<span class="connection-pill ${D==="online"?"online":D==="offline"||D==="error"?"offline":""}"><i class="dot"></i>${V(((ae=a.status)==null?void 0:ae.label)||"Aguardando")}</span>`},f=()=>{var D;return`
    ${a.error?`<div class="notice red" style="margin-bottom:14px">${J("wifiOff",14)} ${V(a.error)}</div>`:""}
    <div class="mp-layout">
      <div class="stack">
        <div class="panel lobby-card">
          <div class="panel-head"><h3>Sala privada</h3><span class="tiny">Link de convite</span></div>
          <div class="panel-body">
            <p class="tiny" style="margin-top:0;line-height:1.6">Crie uma sala real via WebRTC, copie o link e envie para um amigo. Cada jogador luta no próprio dispositivo — não é simulação local.</p>
            <button class="btn btn-primary btn-block" data-action="create-private" ${a.busy?"disabled":""}>${J("link",15)} Criar sala privada</button>
            <div class="divider"></div>
            <div class="field" style="margin-bottom:8px"><label>Entrar com código</label></div>
            <div class="join-row">
              <input class="input" data-code maxlength="12" placeholder="Ex.: 7KQ2M9" value="${V(a.code||ni(e.join||""))}" autocomplete="off" spellcheck="false">
              <button class="btn btn-gold-outline" data-action="join-code" ${a.busy?"disabled":""}>${J("arrow",14)} Entrar</button>
            </div>
            <p class="tiny" style="margin:8px 0 0">Aceita códigos privados e códigos públicos OPEN-0 a OPEN-7.</p>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Partida rápida</h3><span class="tiny">WebRTC</span></div>
          <div class="panel-body">
            <div class="mp-actions">
              <button class="btn btn-sm" data-action="create-public" ${a.busy?"disabled":""}>${J("wifi",14)} Abrir sala pública</button>
              <button class="btn btn-sm btn-primary" data-action="quick-match" ${a.busy?"disabled":""}>${J("people",14)} Procurar adversário</button>
            </div>
            <p class="tiny" style="margin:10px 0 0">Salas públicas ocupam um dos 8 slots globais. Se todos estiverem ocupados, crie uma sala privada.</p>
          </div>
        </div>

        ${a.joining?`<div class="panel mp-status">
          <div class="spinner"></div>
          <div class="big">Conectando…</div>
          <p class="tiny">${V(((D=a.status)==null?void 0:D.label)||"Negociando conexão PeerJS / WebRTC")}</p>
          <button class="btn btn-sm btn-ghost" data-action="cancel">Cancelar</button>
        </div>`:""}
      </div>

      <div class="stack">
        <div class="panel">
          <div class="panel-head"><h3>Sua identidade</h3><span class="tiny">${a.localInfo.overall} OVR</span></div>
          <div class="panel-body">${v()}</div>
        </div>
        <div class="panel">
          <div class="panel-head"><h3>Como funciona</h3></div>
          <div class="panel-body mp-rules">
            <div><b>1.</b> O anfitrião cria a sala e envia o link.</div>
            <div><b>2.</b> O convidado entra no mesmo link/código.</div>
            <div><b>3.</b> Ambos marcam “Pronto”. O anfitrião inicia.</div>
            <div><b>4.</b> O anfitrião simula a luta; entradas e resultados são sincronizados em tempo real.</div>
            <div><b>5.</b> Quedas de conexão pausam a luta e tentam reconectar automaticamente.</div>
          </div>
        </div>
        <div class="notice">${J("shield",13)} TG COIN é 100% virtual. Apostas online são apenas em moeda virtual, limitadas e sem conversão para dinheiro real.</div>
      </div>
    </div>`},_=D=>{const P=D==="host",te=P?a.role==="host"?a.localInfo:a.remoteInfo:a.role==="guest"?a.localInfo:a.remoteInfo,ae=P?a.hostReady:a.guestReady,$=P?"ANFITRIÃO · P1":"CONVIDADO · P2";return te?`<div class="player-slot ${ae?"ready":""}">
      <div class="avatar">${Fn(te.name)}</div>
      <span class="tag ${P?"gold":"red"}">${$}</span>
      <b>${V(te.name)}</b>
      <span>${It(te.record)} · ${Et(te.division)} · OVR ${te.overall}</span>
      <span class="tiny">${V(te.nick||"Sem apelido")} · ${V(te.nationality)}</span>
      <span class="chat-status ${ae?"ok":""}">${ae?"PRONTO":"NÃO PRONTO"}</span>
    </div>`:`<div class="player-slot empty">
      <div class="avatar">?</div>
      <b>Aguardando</b>
      <span>${P?"Host":"Compartilhe o link de convite"}</span>
    </div>`},b=()=>{const D=a.role==="host"?a.hostWager:a.guestWager,P=a.role==="host"?a.guestWager:a.hostWager,te=a.localCoins??0;return`<div class="wager-box">
      <div class="row between"><span class="tiny">Aposta TG COIN (virtual)</span><span class="tiny">Seu saldo: ${nt(te)}</span></div>
      <div class="wager-row">
        ${xu.map(ae=>`<button data-wager="${ae}" class="${D===ae?"active":""}" ${ae>te?"disabled":""}>${ae===0?"Sem aposta":nt(ae)+" TG"}</button>`).join("")}
      </div>
      <div class="tiny" style="margin-top:7px">Aposta efetiva: <b class="gold">${nt(Math.min(a.hostWager||0,a.guestWager||0))} TG</b> · mínimo entre os dois · limite 500 · adversário escolheu ${nt(P||0)} TG</div>
    </div>`},M=()=>{var $;const D=a.role==="host",P=D?a.hostReady:a.guestReady,te=a.hostReady&&a.guestReady,ae=a.public?"":`<div class="invite-box">
      <input readonly value="${V(bu(a.code))}" data-invite aria-label="Link de convite">
      <button class="btn btn-sm btn-gold-outline" data-action="copy">${J("copy",13)} Copiar</button>
    </div>`;return`
      <div class="lobby-head">
        <div>
          <div class="kicker">${a.public?"Sala pública":"Sala privada"}</div>
          <div class="room-code">${V(a.code||"····")}</div>
          <div class="row" style="justify-content:center;gap:8px">
            ${m()}
            <span class="chip">${J("wifi",11)} WebRTC P2P</span>
            <span class="chip">${J("people",11)} ${a.remoteInfo?"2/2":"1/2"}</span>
          </div>
        </div>
        <button class="btn btn-sm btn-ghost leave-btn" data-action="leave">${J("close",13)} Sair da sala</button>
      </div>
      ${ae}
      <div class="player-slots">
        ${_("host")}
        <div class="vs-small">VS</div>
        ${_("guest")}
      </div>
      ${b()}
      ${D?`<div class="host-settings">
        <div class="field"><label>Rounds</label><select class="input" data-rounds>${Mu.map(Q=>`<option value="${Q}" ${a.rounds===Q?"selected":""}>${Q} rounds</option>`).join("")}</select></div>
        <div class="field"><label>Arena</label><select class="input" data-arena>${Do.map(Q=>`<option value="${Q.id}" ${a.arenaId===Q.id?"selected":""}>${Q.name} · ${Q.city}</option>`).join("")}</select></div>
      </div>`:`<div class="notice" style="margin-bottom:12px">${J("ring",13)} Arena: <b>${V((($=Ss[a.arenaId])==null?void 0:$.name)||"Arena Nacional")}</b> · ${a.rounds} rounds</div>`}
      <div class="row between" style="gap:10px;flex-wrap:wrap">
        <button class="btn ${P?"btn-gold-outline":"btn-primary"}" data-action="ready">${J(P?"check":"fist",15)} ${P?"Pronto — aguardando":"Estou pronto"}</button>
        ${D?`<button class="btn btn-red" data-action="start" ${te&&a.remoteInfo?"":"disabled"}>${J("play",15)} Iniciar luta</button>`:`<span class="tiny">${te?"Aguardando o anfitrião iniciar…":"Marque pronto para o anfitrião liberar a luta."}</span>`}
      </div>
      ${a.remoteInfo?"":`<div class="notice" style="margin-top:12px">${J("link",13)} ${a.public?"Aguardando um desafiante entrar na sala pública…":"Compartilhe o link acima. A luta começa quando o convidado marcar pronto."}</div>`}
      <div class="chat-panel">
        <div class="panel-head"><h3>Chat da sala</h3><span class="tiny">${a.messages.length} mensagens</span></div>
        <div class="chat-feed" data-chat-feed>${a.messages.map(Q=>`<div class="msg ${Q.mine?"mine":""}"><b>${Q.mine?"Você":V(Q.from)}:</b> ${V(Q.text)}</div>`).join("")||'<div class="msg">Envie uma mensagem para combinar a luta.</div>'}</div>
        <div class="chat-input-row">
          <input class="input" data-chat-input maxlength="180" placeholder="Mensagem..." value="${V(a.chatText)}">
          <button class="btn btn-sm" data-action="chat">${J("arrow",13)} Enviar</button>
        </div>
      </div>
      <div class="mp-footnote">${J("shield",12)} O anfitrião simula a luta e envia snapshots ~15x/s; o convidado envia entradas. Sem servidor de jogo, sem simulação local de dois personagens. TG COIN é virtual.</div>`},I=()=>{var D,P,te,ae,$,Q;o.querySelectorAll("[data-action]").forEach(de=>{de.addEventListener("click",()=>E(de.dataset.action))}),o.querySelectorAll("[data-wager]").forEach(de=>{de.addEventListener("click",()=>w(Number(de.dataset.wager)))}),(D=o.querySelector("[data-code]"))==null||D.addEventListener("input",de=>{a.code=ni(de.target.value)}),(P=o.querySelector("[data-code]"))==null||P.addEventListener("keydown",de=>{de.key==="Enter"&&E("join-code")}),(te=o.querySelector("[data-chat-input]"))==null||te.addEventListener("input",de=>{a.chatText=de.target.value}),(ae=o.querySelector("[data-chat-input]"))==null||ae.addEventListener("keydown",de=>{de.key==="Enter"&&(de.preventDefault(),E("chat"))}),($=o.querySelector("[data-rounds]"))==null||$.addEventListener("change",de=>{a.rounds=Number(de.target.value)||3,vn(i,{t:"settings",rounds:a.rounds,arenaId:a.arenaId})}),(Q=o.querySelector("[data-arena]"))==null||Q.addEventListener("change",de=>{Ss[de.target.value]&&(a.arenaId=de.target.value),vn(i,{t:"settings",rounds:a.rounds,arenaId:a.arenaId})})},w=D=>{const P=a.localCoins??0,te=xu.includes(D)&&D<=P?D:0;a.role==="host"?a.hostWager=te:a.guestWager=te,a.role==="host"?a.hostReady=!1:a.guestReady=!1,vn(i,{t:"ready",ready:!1,wager:te,info:a.localInfo}),l(),i.app.audio.ui(),g()},E=async(D,P)=>{if(D==="create-private")return U();if(D==="create-public")return y();if(D==="quick-match")return x();if(D==="join-code"){const te=o.querySelector("[data-code]"),ae=ni((te==null?void 0:te.value)||a.code);if(!ae){i.toast("Digite o código da sala.","error","link");return}return N(ae)}if(D==="cancel")return u();if(D==="leave"){i.confirm({title:"Sair da sala?",message:"A conexão com o adversário será encerrada.",danger:!0,confirmLabel:"Sair",onConfirm:()=>u()});return}if(D==="copy")return G();if(D==="ready")return O();if(D==="start")return R();if(D==="chat")return F();if(D==="retry")return u()},C=(D,P)=>{a.busy=!0,a.joining=!0,a.error="",d("searching",P);const te=h(D);return l(),g(),te},U=async()=>{if(a.busy)return;C("host","Criando sala privada…");const D=i.mp,P=F1(6);try{await D.session.hostPrivate({code:P,localInfo:a.localInfo}),a.role="host",a.code=P,a.public=!1,a.phase="lobby",a.joining=!1,a.busy=!1,d("waiting","Aguardando convidado"),l(),g()}catch(te){u((te==null?void 0:te.message)||"Não foi possível criar a sala.")}},y=async()=>{if(a.busy)return;C("host","Abrindo sala pública…");const D=i.mp;try{const P=await D.session.hostPublic({localInfo:a.localInfo,slots:8});a.role="host",a.code=P.code,a.public=!0,a.phase="lobby",a.joining=!1,a.busy=!1,d("waiting","Sala pública aberta · aguardando"),l(),g()}catch(P){u((P==null?void 0:P.message)||"Não foi possível abrir a sala pública.")}},x=async()=>{if(a.busy)return;C("guest","Procurando salas públicas…");const D=i.mp;try{const P=await D.session.joinPublic({localInfo:a.localInfo,slots:8});a.role="guest",a.code=P.code,a.public=!0,a.phase="lobby",a.joining=!1,a.busy=!1,d("online","Conectado · aguardando anfitrião"),l(),g()}catch(P){u((P==null?void 0:P.message)||"Nenhuma sala pública encontrada.")}},N=async D=>{if(a.busy)return;const P=ni(D);if(!P){i.toast("Código inválido.","error","link");return}C("guest",`Entrando na sala ${P}…`);const te=i.mp;try{await te.session.joinByCode({code:P,localInfo:a.localInfo}),a.role="guest",a.code=P,a.public=bf(P),a.phase="lobby",a.joining=!1,a.busy=!1,d("online","Conectado · aguardando anfitrião"),l(),g()}catch(ae){u((ae==null?void 0:ae.message)||"Não foi possível entrar. Confira o código.")}},O=()=>{const D=a.role==="host",P=!(D?a.hostReady:a.guestReady);D?a.hostReady=P:a.guestReady=P,vn(i,{t:"ready",ready:P,wager:D?a.hostWager:a.guestWager,info:a.localInfo}),l(),i.app.audio.ui(),g(),D&&P&&a.guestReady&&i.toast("Tudo pronto. Você já pode iniciar a luta.","success","check")},G=async()=>{const D=bu(a.code);try{await navigator.clipboard.writeText(D),i.toast("Link de convite copiado!","success","copy")}catch{const P=o.querySelector("[data-invite]");P==null||P.select();try{document.execCommand("copy"),i.toast("Link copiado.","success","copy")}catch{i.toast("Copie o link manualmente.","info","link")}}},F=()=>{var te;const D=o.querySelector("[data-chat-input]"),P=((D==null?void 0:D.value)||a.chatText||"").trim().slice(0,180);if(P){if(!vn(i,{t:"chat",text:P})){i.toast("Conexão indisponível.","error","wifiOff");return}a.messages.push({from:"Você",text:P,mine:!0}),a.messages.length>40&&a.messages.shift(),a.chatText="",l(),g({keepChat:!0}),(te=o.querySelector("[data-chat-input]"))==null||te.focus()}},R=()=>{if(a.role!=="host"||a.starting)return;if(!a.hostReady||!a.guestReady||!a.remoteInfo){i.toast("Os dois jogadores precisam estar prontos.","error","lock");return}a.starting=!0;const D=i.mp,P={matchId:"mp-"+a.code+"-"+Date.now().toString(36),code:a.code,public:!!a.public,rounds:a.rounds,roundTime:55,arenaId:a.arenaId,division:a.localInfo.division||"middle",wager:Math.max(0,Math.min(500,a.hostWager||0,a.guestWager||0)),p1:Vi(a.localInfo),p2:Vi(a.remoteInfo),createdAt:new Date().toISOString()};D.match=P,vn(i,{t:"match",match:P}),i.app.audio.ui(),W()},W=()=>{l(),i.mpKeep=!0,i.navigate("fight",{mode:"multiplayer"})};return r=Bt(`<div class="screen mp-screen">
    ${i.topbar("multiplayer")}
    ${jn({kicker:"Multiplayer online real",title:"Arena online",sub:"Salas privadas por link, partidas públicas, chat, revanche e sincronização P2P em tempo real. Cada jogador controla seu próprio lutador em seu dispositivo.",actions:`<span class="chip gold">${J("wifi",13)} WebRTC / PeerJS</span><span class="chip">${J("globe",13)} Convite por link</span>`})}
    <div data-content></div>
    <div class="mp-disclaimer">${J("shield",12)} Conexão peer-to-peer (WebRTC). Redes muito restritivas podem bloquear o P2P. TG COIN e apostas são virtuais, sem valor real e sem conversão em dinheiro.</div>
  </div>`),o=r.querySelector("[data-content]"),i.onCleanup(()=>{c(),i.mpKeep||Xl(i),i.mpKeep=!1}),n?(c=Wl(i,p),t.match&&e.rematch&&(a.hostReady=!1,a.guestReady=!1,a.starting=!1,a.role==="host"&&vn(i,{t:"ready",ready:!1,wager:a.hostWager,info:a.localInfo})),g()):(g(),e.join&&setTimeout(()=>{a.phase==="menu"&&N(ni(e.join))},260)),r}const lr={jab:{id:"jab",name:"Jab",short:"J",damage:4.2,stamina:4.5,dur:.3,impactAt:.42,range:.3,accuracy:.1,stun:.1,guardBreak:5,score:1,hand:"L"},cross:{id:"cross",name:"Direto",short:"K",damage:8.6,stamina:9,dur:.44,impactAt:.44,range:.22,accuracy:.02,stun:.2,guardBreak:12,score:2,hand:"R"},hook:{id:"hook",name:"Gancho",short:"L",damage:10.4,stamina:11.5,dur:.48,impactAt:.47,range:.12,accuracy:-.02,stun:.26,guardBreak:16,score:2,hand:"R"},uppercut:{id:"uppercut",name:"Uppercut",short:"I",damage:13.2,stamina:14.5,dur:.55,impactAt:.5,range:.1,accuracy:-.04,stun:.34,guardBreak:22,score:3,hand:"R"},body:{id:"body",name:"Corpo",short:"B",damage:7.2,stamina:9,dur:.42,impactAt:.45,range:.14,accuracy:.04,stun:.12,guardBreak:10,score:2,hand:"L"}},Nn=2.58,wu=1.62;function Zn(i,e,t=55){return(i==null?void 0:i[e])??t}class dx{constructor(e={}){this.config={rounds:3,roundTime:60,mode:"career",difficulty:"pro",seed:Date.now()%1e5,...e},this.phase="intro",this.phaseTime=0,this.clock=this.config.roundTime,this.round=1,this.timeScale=1,this.events=[],this.finished=!1,this.result=null,this.heat=.25,this.tick=0,this.slowmoTimer=0,this.started=!1,this.fighters=[this.makeFighter(e.p1,"p1"),this.makeFighter(e.p2,"p2")],this.fighters[0].pos={x:-.06,z:wu/2},this.fighters[1].pos={x:.06,z:-wu/2},this.fighters[0].facing=Math.PI,this.fighters[1].facing=0,this.judges=[{name:"Juiz Almeida",bias:0,scores:[0,0],rounds:[]},{name:"Juiz Tanaka",bias:.04,scores:[0,0],rounds:[]},{name:"Juiz Carter",bias:-.04,scores:[0,0],rounds:[]}],this.roundDamage=[0,0],this.punchRequests={p1:null,p2:null},this.remoteInput=null,this.ai={p1:e.ai1?new Eu(this,0,e.difficulty):null,p2:e.ai2?new Eu(this,1,e.difficulty):null},this.emit("intro")}makeFighter(e={},t){const n=e.attributes||{},s=100+Math.round((Zn(n,"conditioning")-50)*.35);return{id:t,def:e,isPlayer:!!e.isPlayer,name:e.name||(t==="p1"?"Lutador 1":"Lutador 2"),nick:e.nick||"",style:e.style||"technical",attributes:n,appearance:e.appearance||null,hp:s,maxHp:s,stamina:100,maxStamina:100,guard:100,pos:{x:0,z:0},facing:t==="p1"?Math.PI:0,vx:0,vz:0,moveX:0,moveZ:0,blocking:!1,blockingTime:0,action:null,cooldown:0,stun:0,dodge:{active:!1,time:0,dir:1,cooldown:0},counterWindow:0,lastCounterAt:-10,knockdowns:0,down:null,combo:0,lastHitAt:-10,stats:{thrown:0,landed:0,damage:0,blocks:0,dodges:0,counters:0,maxCombo:0,jabs:0,power:0,distance:0},roundDamage:0,scorecards:[],hurtFlash:0,expression:"neutral",tauntCd:4,victory:!1,defeated:!1,aiCooldown:.4+Math.random()*.3}}start(){this.started||(this.started=!0,this.phase="fight",this.phaseTime=0,this.emit("bell"),this.emit("roundStart",{round:1}))}update(e,t={}){if(!this.started)return;this.tick++;const n=e*this.timeScale;this.phaseTime+=n;for(const s of this.fighters)s.cooldown=Math.max(0,s.cooldown-n),s.stun=Math.max(0,s.stun-n),s.dodge.cooldown=Math.max(0,s.dodge.cooldown-n),s.dodge.time=Math.max(0,s.dodge.time-n),s.dodge.time<=0&&(s.dodge.active=!1),s.counterWindow=Math.max(0,s.counterWindow-n),s.hurtFlash=Math.max(0,s.hurtFlash-n),s.tauntCd=Math.max(0,s.tauntCd-n);this.slowmoTimer>0&&(this.slowmoTimer-=e,this.slowmoTimer<=0&&(this.timeScale=1)),this.phase==="fight"?this.updateFight(n,t):this.phase==="knockdown"?this.updateKnockdown(n,t):this.phase==="roundEnd"?this.phaseTime>3&&this.nextRound():this.phase==="ko"&&this.phaseTime>4.2&&this.finishKo()}updateFight(e,t){this.clock-=e;const n=this.normalizeInput(t.p1,"p1"),s=this.normalizeInput(t.p2,"p2"),a=this.ai.p1?this.ai.p1.think(e):null,r=this.ai.p2?this.ai.p2.think(e):null,o=a||n,c=r||s;this.punchRequests.p1=(o==null?void 0:o.punch)||null,this.punchRequests.p2=(c==null?void 0:c.punch)||null,this.stepFighter(this.fighters[0],o,this.fighters[1],e),this.stepFighter(this.fighters[1],c,this.fighters[0],e),this.separate(),this.updateHeat(e),this.clock<=0&&(this.clock=0,this.endRound())}normalizeInput(e,t){const n={moveX:0,moveZ:0,block:!1,dodge:!1,punch:null};return e?{moveX:Ve(e.moveX||0,-1,1),moveZ:Ve(e.moveZ||0,-1,1),block:!!e.block,dodge:!!e.dodge,punch:e.punch||null}:n}setRemoteInput(e){this.remoteInput=e,this.remoteInputTime=performance.now()}stepFighter(e,t,n,s){if(!e||!n)return;if(e.moveX=t.moveX,e.moveZ=t.moveZ,e.blocking=t.block&&!e.action&&!e.dodge.active&&e.stun<=0,e.expression=e.stun>0?"hurt":e.stamina<25?"tired":e.action?"focused":"neutral",e.stun>0){e.blocking=!1,this.applyMovement(e,n,0,0,s,!0);return}if(t.dodge&&!e.dodge.active&&e.dodge.cooldown<=0&&e.stamina>8&&!e.action&&(e.dodge.active=!0,e.dodge.time=.36,e.dodge.dir=Math.abs(t.moveX)>.1?Math.sign(t.moveX):Math.random()<.5?-1:1,e.dodge.cooldown=.9,e.stamina=Math.max(0,e.stamina-9),this.emit("dodge",{id:e.id,dir:e.dodge.dir})),e.dodge.active){e.blocking=!1,this.applyMovement(e,n,e.dodge.dir*1.8,0,s,!0),e.dodge.time>.05&&e.dodge.time<.3&&(e.counterWindow=Math.max(e.counterWindow,.22));return}const a=this.punchRequests[e.id];if(a&&lr[a]&&!e.action&&e.cooldown<=0&&!e.blocking&&this.startPunch(e,n,a),e.action){const l=e.action;l.time+=s,!l.resolved&&l.time>=l.def.impactAt*l.def.dur&&(l.resolved=!0,this.resolvePunch(e,n,l)),l.time>=l.def.dur&&(e.action=null,e.cooldown=.08),this.applyMovement(e,n,t.moveX*.22,t.moveZ*.22,s,!1);return}e.blocking?(this.applyMovement(e,n,t.moveX*.3,t.moveZ*.3,s,!1),e.blockingTime+=s,e.guard=Math.max(0,e.guard-s*1.4),e.guard<=0&&(e.stun=Math.max(e.stun,1.1),e.guard=12,e.blocking=!1,this.emit("guardBreak",{id:e.id}))):this.applyMovement(e,n,t.moveX,t.moveZ,s,!1);const r=Math.abs(t.moveX)+Math.abs(t.moveZ)>.15,o=Zn(e.attributes,"conditioning",55),c=(e.blocking?2.2:r?3.6:5.4)*(.7+o/160);e.action||(e.stamina=Math.min(e.maxStamina,e.stamina+c*s)),e.blocking||(e.guard=Math.min(100,e.guard+s*7)),e.stamina<=.5&&(e.expression="tired"),this.timeSinceHit(e,n)>1.6&&e.combo>0&&(e.combo=0)}applyMovement(e,t,n,s,a,r){var M;const o=t.pos.x-e.pos.x,c=t.pos.z-e.pos.z,l=Math.max(.001,Math.hypot(o,c)),h=o/l,d=c/l,u=-d,p=h,g=Zn(e.attributes,"mobility",55),v=((M=Bn[e.style])==null?void 0:M.modifiers)||{},m=e.stamina<25?.72:1;let f=(1.45+g/100*1)*(v.speed||1)*m;r&&(f*=1.3),e.blocking&&(f*=.4),e.stun>0&&(f*=.2),e.vx=(h*s+u*n)*f,e.vz=(d*s+p*n)*f,e.pos.x=Ve(e.pos.x+e.vx*a,-Nn,Nn),e.pos.z=Ve(e.pos.z+e.vz*a,-Nn,Nn),e.stats.distance+=Math.hypot(e.vx*a,e.vz*a);const _=t.pos.x-e.pos.x,b=t.pos.z-e.pos.z;e.facing=Math.atan2(_,b),e.distance=Math.hypot(_,b)}separate(){const[e,t]=this.fighters,n=t.pos.x-e.pos.x,s=t.pos.z-e.pos.z,a=Math.max(1e-4,Math.hypot(n,s)),r=.78;if(a<r){const o=(r-a)/2,c=n/a,l=s/a;e.pos.x=Ve(e.pos.x-c*o,-Nn,Nn),e.pos.z=Ve(e.pos.z-l*o,-Nn,Nn),t.pos.x=Ve(t.pos.x+c*o,-Nn,Nn),t.pos.z=Ve(t.pos.z+l*o,-Nn,Nn)}e.facing=Math.atan2(t.pos.x-e.pos.x,t.pos.z-e.pos.z),t.facing=Math.atan2(e.pos.x-t.pos.x,e.pos.z-t.pos.z)}startPunch(e,t,n){const s=lr[n];return!s||e.stamina<s.stamina*.6?!1:(e.action={type:n,def:s,time:0,resolved:!1,counter:e.counterWindow>0},e.stamina=Math.max(0,e.stamina-s.stamina),e.stats.thrown++,s.hand==="L"?e.stats.jabs++:e.stats.power++,e.counterWindow=0,this.emit("punch",{id:e.id,type:n,counter:e.action.counter}),!0)}resolvePunch(e,t,n){var b;const s=n.def,a=e.distance||Math.hypot(t.pos.x-e.pos.x,t.pos.z-e.pos.z),r=(Zn(e.attributes,"mobility",50)-50)*.001,o=1.48+s.range+r+(e.attributes&&e.attributes.reach,0);e.stats;const c=((b=Bn[e.style])==null?void 0:b.modifiers)||{};if(a>o){this.emit("whiff",{id:e.id,type:n.type});return}if(t.dodge.active){t.stats.dodges++,t.counterWindow=Math.max(t.counterWindow,.65),e.stun=Math.max(e.stun,.22),e.combo=0,this.emit("dodgeSuccess",{id:t.id,attacker:e.id,type:n.type});return}const l=Zn(e.attributes,"precision",55),h=Zn(t.attributes,"reflexes",55),d=e.stamina<20?.18:0;let u=.7+s.accuracy+(l-h)/240-d+(n.counter?.16:0)+(t.stun>0?.2:0);if(t.blocking&&(u+=.16),Math.random()>Ve(u,.28,.97)){e.combo=0,this.emit("whiff",{id:e.id,type:n.type});return}const p=Zn(e.attributes,"strength",55),g=Ve(.55+e.stamina/110,.55,1.15);let v=s.damage*(.72+p/100*.65)*g*(.9+Math.random()*.2);v*=c.power||1,n.counter&&(v*=1.28),e.combo>0&&(v*=1+Math.min(.24,e.combo*.035)),t.stun>0&&(v*=1.2);const m=Zn(t.attributes,"defense",55);v*=1-Ve(m/100*.34,0,.38);const f=Math.random()<.055+l/1400;f&&(v*=1.35);const _=Math.random()<.68?"head":"body";if(t.hurtFlash=.25,t.combo=0,e.lastHitAt=this.phaseTime,t.blocking){t.stats.blocks++;const M=s.guardBreak*(.72+p/160);t.guard=Math.max(0,t.guard-M);const I=v*.17;t.hp=Math.max(0,t.hp-I),t.hurtFlash=.12,this.emit("block",{attacker:e.id,defender:t.id,type:n.type,guard:t.guard,damage:I}),t.guard<=0&&(t.stun=Math.max(t.stun,1.2),t.blocking=!1,t.guard=15,this.emit("guardBreak",{id:t.id}));return}v=Math.max(1,Math.round(v*10)/10),t.hp=Math.max(0,t.hp-v),t.stun=Math.max(t.stun,s.stun*(.8+p/220)),t.stats.damage+=v,e.stats.landed++,e.stats.damage+=v,e.combo++,e.stats.maxCombo=Math.max(e.stats.maxCombo,e.combo),this.roundDamage[e.id==="p1"?0:1]+=v,t.roundDamage+=v,n.counter&&e.stats.counters++,this.heat=Math.min(1,this.heat+.08+v/80),this.emit(f?"critical":"hit",{attacker:e.id,defender:t.id,type:n.type,damage:v,crit:f,hp:t.hp,stamina:t.stamina,target:_}),t.hp<=0&&this.knockdown(t,e)}timeSinceHit(e,t){return this.phaseTime-(e.lastHitAt||0)}knockdown(e,t){this.phase==="fight"&&(e.knockdowns++,e.action=null,e.blocking=!1,e.dodge.active=!1,e.combo=0,this.phase="knockdown",this.phaseTime=0,this.down={fighter:e,opponent:t,time:0,count:0,resolved:!1,recovered:!1,fallProgress:0,taps:0,playerCanTap:e.isPlayer||this.config.mode==="multiplayer"&&e.id==="p2",maxKnockdowns:e.knockdowns>=3},t.stats.knockdowns=(t.stats.knockdowns||0)+1,this.emit("knockdown",{id:e.id,opponent:t.id,knockdowns:e.knockdowns,tko:this.down.maxKnockdowns}),this.timeScale=this.down.maxKnockdowns?.5:.62,this.slowmoTimer=1.4)}updateKnockdown(e,t){var a;const n=this.down;if(!n)return;if(n.time+=e,n.fallProgress=Math.min(1,n.time/.9),n.playerCanTap&&t){const r=n.fighter.id==="p1"?t.p1:t.p2;r!=null&&r.getUp&&n.taps++,(a=this.remoteInput)!=null&&a.getUp&&n.fighter.id==="p2"&&n.taps++}const s=Math.min(10,Math.floor(n.time/.55)+1);if(s!==n.count&&(n.count=s,this.emit("count",{count:s,id:n.fighter.id}),s===8&&!n.resolved)){n.resolved=!0;let o=.36+Zn(n.fighter.attributes,"recovery",55)/240-n.fighter.knockdowns*.11;o+=Math.min(.28,n.taps*.06),n.maxKnockdowns&&(o=0),n.recovered=Math.random()<Ve(o,0,.78),n.recovered&&(n.fighter.hp=Math.round(n.fighter.maxHp*.3),n.fighter.stamina=Math.max(30,n.fighter.stamina),n.fighter.stun=.8,n.fighter.guard=45,n.opponent.stamina=Math.max(0,n.opponent.stamina-6),this.emit("getUp",{id:n.fighter.id,taps:n.taps}))}if(n.resolved&&!n.recovered&&s>=9||s>=10){const r=n.fighter.knockdowns>=3||n.opponent.stats.landed-n.opponent.stats.blocks>0&&n.maxKnockdowns;this.endFight({winnerId:n.opponent.id,loserId:n.fighter.id,method:r?"TKO":"KO",round:this.round,time:Math.max(0,this.clock)}),this.phase="ko",this.phaseTime=0,this.timeScale=.5,this.emit("ko",{winner:n.opponent.id,loser:n.fighter.id,method:r?"TKO":"KO"});return}n.recovered&&n.time>6&&(this.phase="fight",this.phaseTime=0,this.clock=Math.max(6,this.clock),this.timeScale=1,this.down=null,this.emit("bell"),this.emit("resume",{}))}endRound(){if(this.phase!=="fight")return;this.phase="roundEnd",this.phaseTime=0,this.emit("bell");const[e,t]=this.fighters,n=this.roundDamage[0]+e.knockdowns*8,s=this.roundDamage[1]+t.knockdowns*8;for(const a of this.judges){let r=n===s?0:n>s?1:-1;r!==0&&Math.random()<Math.abs(a.bias)&&(r*=-1);let o=10,c=10;r===1&&(c=9),r===-1&&(o=9),r!==0&&Math.random()<.04&&(o=10,c=10,r=0);const l=r===1?t.knockdowns>0:e.knockdowns>0;l&&r!==0&&(c=r===1?8:c),l&&r===-1&&(o=8),a.scores[0]+=o,a.scores[1]+=c,a.rounds.push({round:this.round,a:o,b:c,winner:r})}e.scorecards.push({round:this.round,dmg:n}),t.scorecards.push({round:this.round,dmg:s}),this.emit("roundEnd",{round:this.round,damage:[...this.roundDamage],scores:this.judges.map(a=>[...a.scores])});for(const a of this.fighters){const r=Zn(a.attributes,"recovery",55);a.hp=Math.min(a.maxHp,a.hp+5+r*.075),a.stamina=Math.min(a.maxStamina,a.stamina+18+r*.24),a.guard=Math.min(100,a.guard+35),a.stun=0,a.combo=0,a.knockdowns=Math.max(0,a.knockdowns)}this.roundDamage=[0,0]}nextRound(){if(this.round>=this.config.rounds){this.decision();return}this.round++,this.phase="fight",this.phaseTime=0,this.clock=this.config.roundTime,this.timeScale=1,this.emit("roundStart",{round:this.round}),this.emit("bell")}decision(){const[e,t]=this.fighters,n=this.judges.map(l=>({a:l.scores[0],b:l.scores[1]}));let s=0,a=0;for(const l of n)l.a>l.b?s++:l.b>l.a&&a++;let r=null,o="DEC";if(s>a)r="p1";else if(a>s)r="p2";else{const l=e.stats.damage+e.knockdowns*12+e.stats.landed*.5,h=t.stats.damage+t.knockdowns*12+t.stats.landed*.5;Math.abs(l-h)<2?o="DRAW":r=l>h?"p1":"p2"}const c=o==="DEC"&&(s===3||a===3);this.endFight({winnerId:r,loserId:r?r==="p1"?"p2":"p1":null,method:o==="DRAW"?"DRAW":"DEC",decisionType:c?"UNÂNIME":"DIVISÃO",round:this.config.rounds,time:0,scorecards:n}),this.emit("decision",{result:this.result})}finishKo(){this.result&&(this.phase="end",this.timeScale=1,this.finished=!0,this.emit("end",this.result))}endFight(e){if(this.result)return;const t=this.fighters.find(r=>r.id===e.winnerId),n=this.fighters.find(r=>r.id===e.loserId),s=this.judges.reduce((r,o)=>r+o.scores[0],0),a=this.judges.reduce((r,o)=>r+o.scores[1],0);this.result={...e,rounds:this.config.rounds,stats:{p1:{...this.fighters[0].stats,hp:this.fighters[0].hp,maxHp:this.fighters[0].maxHp},p2:{...this.fighters[1].stats,hp:this.fighters[1].hp,maxHp:this.fighters[1].maxHp}},totals:{p1:s,p2:a},scorecards:this.judges.map(r=>({judge:r.name,p1:r.scores[0],p2:r.scores[1],rounds:r.rounds})),winnerName:(t==null?void 0:t.name)||null,loserName:(n==null?void 0:n.name)||null,winnerId:e.winnerId,loserId:e.loserId,method:e.method,division:this.config.division,date:new Date().toISOString(),matchId:this.config.matchId||"m"+Date.now().toString(36)},t&&(t.victory=!0),n&&(n.defeated=!0),this.timeScale=1,this.phase=this.phase==="ko"?"ko":"end",this.phase==="end"&&(this.finished=!0),this.emit("result",this.result),this.phase==="end"&&this.emit("end",this.result)}quit(e="p1"){if(this.result)return;const t=e==="p1"?"p2":"p1";this.endFight({winnerId:t,loserId:e,method:"QUIT",round:this.round,time:Math.max(0,this.clock)}),this.phase="end",this.finished=!0,this.emit("end",this.result)}joinGetUp(){this.phase==="knockdown"&&this.down&&(this.down.taps+=1)}updateHeat(e){const[t,n]=this.fighters,s=(t.combo+n.combo)*.05+(100-Math.min(t.hp,n.hp))/300;this.heat=Ve(this.heat+(s-this.heat)*e*.6,.15,1),this.timeScale=this.timeScale<1&&this.slowmoTimer<=0?1:this.timeScale}emit(e,t={}){const n={type:e,time:this.phaseTime,round:this.round,...t};this.events.push(n),this.onEvent&&this.onEvent(n),this.events.length>300&&this.events.shift()}drainEvents(){const e=this.events;return this.events=[],e}getSnapshot(){return{t:this.tick,phase:this.phase,started:this.started,clock:this.clock,round:this.round,rounds:this.config.rounds,timeScale:this.timeScale,heat:this.heat,result:this.result,fighters:this.fighters.map(e=>({id:e.id,pos:{...e.pos},facing:e.facing,hp:e.hp,maxHp:e.maxHp,stamina:e.stamina,guard:e.guard,blocking:e.blocking,action:e.action?{type:e.action.type,time:e.action.time,dur:e.action.def.dur}:null,stun:e.stun,dodge:{...e.dodge},knockdowns:e.knockdowns,combo:e.combo,expression:e.expression,victory:e.victory,defeated:e.defeated,hurtFlash:e.hurtFlash,down:this.down&&this.down.fighter.id===e.id?{fallProgress:this.down.fallProgress,count:this.down.count}:null})),down:this.down?{id:this.down.fighter.id,count:this.down.count,fallProgress:this.down.fallProgress,time:this.down.time}:null,judges:this.judges.map(e=>({scores:[...e.scores]})),stats:this.fighters.map(e=>({...e.stats}))}}applySnapshot(e){if(e){if(this.phase=e.phase,this.started=e.started,this.clock=e.clock,this.round=e.round,this.timeScale=e.timeScale,this.heat=e.heat,this.tick=e.t,e.result&&!this.result&&(this.result=e.result,this.fighters.forEach((t,n)=>{var s,a;t.victory=!!((s=e.fighters[n])!=null&&s.victory),t.defeated=!!((a=e.fighters[n])!=null&&a.defeated)}),this.emit("result",this.result)),this.fighters&&e.fighters&&e.fighters.forEach((t,n)=>{const s=this.fighters[n];s&&(Object.assign(s,{hp:t.hp,maxHp:t.maxHp,stamina:t.stamina,guard:t.guard,blocking:t.blocking,stun:t.stun,knockdowns:t.knockdowns,combo:t.combo,expression:t.expression,victory:t.victory,defeated:t.defeated,hurtFlash:t.hurtFlash,facing:t.facing}),s.pos={...t.pos},s.dodge={...t.dodge},s.action=t.action?{type:t.action.type,time:t.action.time,def:lr[t.action.type],resolved:!0}:null,s.down=t.down,s.netPos={...t.pos})}),e.down){const t=this.fighters.find(n=>n.id===e.down.id);this.down={fighter:t,time:e.down.time,count:e.down.count,fallProgress:e.down.fallProgress,resolved:!0,recovered:!1}}else this.down=null;e.judges&&e.judges.forEach((t,n)=>{this.judges[n]&&(this.judges[n].scores=[...t.scores])}),e.stats&&e.stats.forEach((t,n)=>{this.fighters[n]&&(this.fighters[n].stats={...t})}),e.phase==="end"&&(this.finished=!0)}}}class Eu{constructor(e,t,n="pro"){this.engine=e,this.slot=t,this.id=t===0?"p1":"p2",this.me=()=>e.fighters[t],this.opp=()=>e.fighters[1-t];const s={rookie:.55,pro:.75,elite:.9,legend:1};this.skill=s[n]??.78,this.input={moveX:0,moveZ:0,block:!1,dodge:!1,punch:null,getUp:!1},this.timer=.5+Math.random()*.5,this.punchPlan=[],this.blockTimer=0,this.dodgeTimer=0,this.style=this.me().style,this.aggression={aggressive:.92,defensive:.42,technical:.6,counter:.5,speed:.68,pressure:.95}[this.style]??.65,this.personality=Math.random()}think(e){var u;const t=this.me(),n=this.opp(),s=this.input;if(s.punch=null,s.dodge=!1,s.getUp=!1,this.engine.phase==="knockdown"&&((u=this.engine.down)==null?void 0:u.fighter)===t)return s.getUp=Math.random()<this.skill*.7,null;if(this.engine.phase!=="fight")return null;this.timer-=e,this.blockTimer=Math.max(0,this.blockTimer-e),this.dodgeTimer=Math.max(0,this.dodgeTimer-e);const a=t.distance||Math.hypot(n.pos.x-t.pos.x,n.pos.z-t.pos.z),r=!!n.action,o=t.stamina,c=n.hp/n.maxHp,l=t.hp/t.maxHp,h=this.skill*(.5+(t.attributes.reflexes||50)/180);if(r&&Math.random()<h*.5*e*18&&this.dodgeTimer<=0){const p=this.style==="counter"||this.style==="defensive"||this.style==="speed";if(Math.random()<(p?.55:.3)&&t.dodge.cooldown<=0&&o>18)return s.dodge=!0,this.dodgeTimer=.5,s.moveX=Math.random()<.5?-1:1,null;Math.random()<(p?.5:.66)&&o>10&&(this.blockTimer=.22+Math.random()*.3)}if(s.block=this.blockTimer>0&&o>4,s.moveX=0,s.moveZ=0,o<16&&!s.block)return s.moveZ=-.55,s.moveX=Math.sin(this.engine.phaseTime*.7)*.7,a<1.6&&(s.block=Math.random()<.5),a>2.3&&(s.moveZ=0),s;const d=this.style==="technical"?1.75:this.style==="counter"?1.8:this.style==="speed"?1.5:this.style==="defensive"?1.95:1.45;if(a>d+.15?(s.moveZ=.55+this.aggression*.45,s.moveX=Math.sin(this.engine.phaseTime*.9+this.personality)*.3):a<d-.22?(s.moveZ=-.35-(this.style==="aggressive"?-.1:.2),s.moveX=Math.sin(this.engine.phaseTime*1.1)*.4):s.moveX=Math.sin(this.engine.phaseTime*.55+this.personality*6)*.45,this.punchPlan.length&&this.timer<=0)return s.punch=this.punchPlan.shift(),this.timer=.16+Math.random()*.2+(1-this.skill)*.2,s;if(this.timer<=0){const p=c<.35,g=this.aggression*(.8+this.skill*.35)*(p?1.3:1)*(l<.3?.8:1);if(this.timer=.3+Math.random()*(.6-g*.3),a<2.1&&o>18&&Math.random()<g){const v=Math.random();let m;a>1.85?m=v<.7?"jab":"cross":a>1.5?m=v<.4?"jab":v<.7?"cross":"hook":m=v<.25?"jab":v<.5?"hook":v<.8?"uppercut":"body",n.blocking&&Math.random()<.45&&(m="body"),n.stun>0&&(m="uppercut"),s.punch=m;const f=this.skill*(this.style==="aggressive"||this.style==="pressure"?.7:.45);Math.random()<f&&(this.punchPlan=[Math.random()<.5?"cross":"hook"],this.style==="pressure"&&Math.random()<.4&&this.punchPlan.push("body")),this.timer=.18+Math.random()*.3}else a<1.6&&o>25&&Math.random()<.3?(s.punch="uppercut",this.timer=.4):Math.random()<.25&&(s.dodge=Math.random()<.2&&o>20)}return(Math.abs(t.pos.x)>2.15||Math.abs(t.pos.z)>2.15)&&(s.moveX=-Math.sign(t.pos.x||1)*.9,s.moveZ=-Math.sign(t.pos.z||1)*.5),s}}const wt=.68;class hx{constructor({renderer:e,engine:t,arenaConfig:n,quality:s="high",appearances:a={},mobile:r=!1}){this.renderer=e,this.engine=t,this.quality=s,this.mobile=r,this.arena=I_(n,{quality:s,crowd:!0,staff:!0}),this.scene=this.arena.scene,this.camera=new Zt(r?54:46,1,.1,80),this.camera.position.set(3.4,2.2,5.5),this.camera.lookAt(0,1.2,0),this.cameraTarget=new L(0,1.15,0),this.camPos=this.camera.position.clone(),this.camLook=new L(0,1.15,0),this.time=0,this.entrance=null,this.replay=null,this.frames=[],this.recordTimer=0,this.shake=0,this.flash=0,this.heat=.25,this.beltGroup=null,this.confetti=null,this.hitstop=0,this.koCamera=!1,this.lastPhase="intro",this.resultShownAt=0,this.flashSprite=new pr(new wa({map:qh(),color:"#fff7d0",transparent:!0,opacity:0,blending:yn,depthWrite:!1})),this.flashSprite.scale.setScalar(3),this.flashSprite.position.set(0,1.2,0),this.scene.add(this.flashSprite);const o=a.p1||ws(t.fighters[0].def,t.fighters[0].def.division),c=a.p2||ws(t.fighters[1].def,t.fighters[1].def.division);this.boxers=[new ga(o,{robe:!0,quality:s}),new ga(c,{robe:!0,quality:s})];for(const l of this.boxers){l.setRobe(!0),this.arena.root.add(l.root),l.root.position.set(0,0,0);const h=new q(new ts(.38,20),new Lt({color:"#000000",transparent:!0,opacity:.32,depthWrite:!1}));h.rotation.x=-Math.PI/2,h.position.y=.012,l.root.add(h),l.shadow=h}this.syncFighters(1),this.boxers[0].root.rotation.y=Math.PI,this.boxers[1].root.rotation.y=0,this.entrancePos=[new L(2,0,2.2),new L(-2,0,-2.2)],this.setupEffects(),this.updateCamera(.016,!0)}setArenaShadow(e){for(const t of this.arena.staff)t.root.traverse(n=>{n.isMesh&&(n.castShadow=e)})}setupEffects(){this.sparks=[];for(let r=0;r<10;r++){const o=new pr(new wa({map:qh(),color:"#ffd27a",transparent:!0,opacity:0,blending:yn,depthWrite:!1}));o.scale.setScalar(.5),this.scene.add(o),this.sparks.push({sprite:o,life:0,max:0,size:.5,color:"#ffd27a"})}this.sweatCount=140;const e=new Float32Array(this.sweatCount*3),t=new Float32Array(this.sweatCount*3),n=new Float32Array(this.sweatCount),s=new Ct;s.setAttribute("position",new Wt(e,3)),this.sweat={pos:e,vel:t,life:n,cursor:0,geo:s};const a=new Ea({color:"#fff5d4",size:.028,transparent:!0,opacity:.8,depthWrite:!1,blending:yn});this.sweatPoints=new fr(s,a),this.sweatPoints.frustumCulled=!1,this.scene.add(this.sweatPoints),this.impactRing=new q(new Xo(.12,.18,24),new Lt({color:"#fff0b0",transparent:!0,opacity:0,side:nn,blending:yn,depthWrite:!1})),this.scene.add(this.impactRing),this.impactRingLife=0}handleEvent(e){if(e)switch(e.type){case"hit":case"critical":{const t=e.defender==="p1"?this.boxers[0]:this.boxers[1],s=(e.attacker==="p1"?this.boxers[0]:this.boxers[1]).getGloveWorld(e.type==="jab"?"L":"R"),a=t.getHeadWorld(),r=new L().lerpVectors(s,a,.48);r.y=e.target==="body"?Math.min(r.y,1.15):r.y,this.spawnImpact(r,e.damage,e.crit,e.defender),t.flash(e.crit?"#ffd36e":"#ff7a5c"),this.shake=Math.min(.8,this.shake+.08+(e.damage||0)/130),e.crit&&(this.flash=Math.max(this.flash,.45)),(e.damage||0)>10&&(this.hitstop=.055),this.spawnSweat(a,e.crit?16:8,e.attacker==="p1"?1:-1);break}case"block":{const n=(e.defender==="p1"?this.boxers[0]:this.boxers[1]).getGloveWorld("R");this.spawnImpact(n,2,!1,e.defender,"#bfe6ff"),this.shake=Math.min(.5,this.shake+.035);break}case"knockdown":case"ko":this.shake=.9,this.flash=1,this.koCamera=!0;break;case"guardBreak":this.flash=Math.max(this.flash,.25);break;case"getUp":this.flashSprite.material.color.set("#a8ffcf");break}}spawnImpact(e,t=4,n=!1,s="p2",a=null){const r=this.sparks.find(c=>c.life<=0)||this.sparks[0];r.life=.28,r.max=.28,r.size=Ve(.35+t/26,.35,1.25)*(n?1.4:1),r.sprite.position.copy(e),r.sprite.material.color.set(a||(n?"#ffe9a3":"#ffc27a")),r.sprite.material.opacity=1,r.sprite.scale.setScalar(r.size*.6),r.crit=n,this.impactRing.position.copy(e),this.impactRing.position.z+=.01,this.impactRing.material.color.set(a||"#fff0b0"),this.impactRing.material.opacity=.9,this.impactRingLife=.2,this.impactRing.scale.setScalar(1);const o=s==="p1"?this.boxers[0]:this.boxers[1];o.flinch=(Math.random()<.5?-1:1)*.12}spawnSweat(e,t=8,n=1){if(this.sweat){for(let s=0;s<t;s++){const a=this.sweat.cursor;this.sweat.cursor=(this.sweat.cursor+1)%this.sweatCount,this.sweat.pos[a*3]=e.x+(Math.random()-.5)*.2,this.sweat.pos[a*3+1]=e.y+(Math.random()-.5)*.2,this.sweat.pos[a*3+2]=e.z+(Math.random()-.5)*.2,this.sweat.vel[a*3]=(Math.random()-.5)*1.8+n*.4,this.sweat.vel[a*3+1]=.8+Math.random()*1.8,this.sweat.vel[a*3+2]=(Math.random()-.5)*1.8,this.sweat.life[a]=.45+Math.random()*.4}this.sweatPoints.visible=!0}}startEntrance(){this.entrance={t:0,dur:3.1};for(const e of this.boxers)e.setRobe(!0);this.boxers[0].root.position.copy(this.entrancePos[0]),this.boxers[1].root.position.copy(this.entrancePos[1]),this.boxers[0].root.rotation.y=Math.PI*.8,this.boxers[1].root.rotation.y=-Math.PI*.2,this.boxers[0].update(.016,{entrance:!0,robe:!0}),this.boxers[1].update(.016,{entrance:!0,robe:!0})}endEntrance(){this.entrance=null;for(const e of this.boxers)e.setRobe(!1);this.syncFighters(1)}update(e,{paused:t=!1}={}){var n;if(this.hitstop>0&&(this.hitstop=Math.max(0,this.hitstop-e),e*=.15),this.time+=e,this.heat=En(this.heat,this.engine.heat||.25,1.2,e),this.shake=Math.max(0,this.shake-e*2.4),this.flash=Math.max(0,this.flash-e*3.2),this.replay){this.updateReplay(e),this.updateParticles(e),this.updateConfetti(e),this.arena.update(e,this.heat);return}if(this.entrance){this.entrance.t+=e;const s=Ve(this.entrance.t/this.entrance.dur,0,1),a=s*s*(3-2*s),r=new L(-.06*wt,0,1.62/2*wt),o=new L(.06*wt,0,-.81*wt);this.boxers[0].root.position.lerpVectors(this.entrancePos[0],r,a),this.boxers[1].root.position.lerpVectors(this.entrancePos[1],o,a),this.boxers[0].root.rotation.y=Je(Math.PI*.8,Math.PI,a),this.boxers[1].root.rotation.y=Je(-Math.PI*.2,0,a);for(const[c,l]of this.boxers.entries())l.update(e,{entrance:s<.9,robe:!0,moveZ:1,moveX:0,stamina:100});this.updateStaff(e),this.updateCamera(e,!1,!0),this.arena.update(e,.6),this.updateParticles(e),s>=1&&!this._entranceDone&&(this._entranceDone=!0,(n=this.onEntranceDone)==null||n.call(this));return}this.syncFighters(e),this.updateStaff(e),this.updateCamera(e),this.arena.update(e,Math.min(1,this.heat+(this.engine.phase==="knockdown"?.35:0))),this.updateParticles(e),this.updateConfetti(e),this.recordFrame(e),this.engine.result&&this.engine.phase==="end"&&!this.resultAt&&(this.resultAt=this.time),this.engine.result&&!this.beltGroup&&this.maybeCelebrate()}syncFighters(e){var s,a,r,o,c,l,h,d;const[t,n]=this.engine.fighters;this.engine.phase;for(const[u,p]of[t,n].entries()){const g=this.boxers[u];if(!p||!g)continue;const v=p.pos.x*wt,m=p.pos.z*wt;g.root.position.x=En(g.root.position.x,v,20,e),g.root.position.z=En(g.root.position.z,m,20,e),g.root.position.y=.012,g.root.rotation.y=p.facing;const f=this.engine.phase==="knockdown"&&((a=(s=this.engine.down)==null?void 0:s.fighter)==null?void 0:a.id)===p.id,_=(this.engine.phase==="ko"||this.engine.phase==="end")&&((r=this.engine.result)==null?void 0:r.loserId)===p.id&&["KO","TKO"].includes(this.engine.result.method),b={moveX:p.moveX||0,moveZ:p.moveZ||0,blocking:p.blocking,dodging:p.dodge.active,dodgeDir:p.dodge.dir,action:((o=p.action)==null?void 0:o.type)||null,actionTime:((c=p.action)==null?void 0:c.time)||0,actionDur:((h=(l=p.action)==null?void 0:l.def)==null?void 0:h.dur)||0,stun:p.stun,stamina:p.stamina,hp:p.hp,knockedDown:f||_,fallProgress:f?((d=this.engine.down)==null?void 0:d.fallProgress)||1:_?1:0,victory:!!(this.engine.result&&this.engine.result.winnerId===p.id&&this.engine.phase==="end"),defeated:_||!!(this.engine.result&&this.engine.result.loserId===p.id&&this.engine.phase==="end"&&!["KO","TKO"].includes(this.engine.result.method)),robe:!1};g._blocking,g.update(e,b),g._blocking=p.blocking,g.shadow&&(g.shadow.material.opacity=f||_?.2:.32),this.engine.result&&this.engine.phase==="end"&&this.engine.result.winnerId===p.id?g.setExpression("happy"):p.stun>.1?g.setExpression("hurt"):p.stamina<24?g.setExpression("tired"):p.action?g.setExpression("focused"):g.setExpression("neutral")}}updateStaff(e){var c;const t=this.arena.referee;if(!t)return;const n=this.engine;let s=0,a=-2.3,r=0;if(n.phase==="knockdown"&&n.down){const l=n.fighters.find(h=>h.id===n.down.fighter.id);l&&(s=l.pos.x*wt+.65,a=l.pos.z*wt+.55,r=Math.atan2(-(l.pos.x*wt-s),-(l.pos.z*wt-a)),t.setExpression("focused"))}else if(n.phase==="end"&&((c=n.result)!=null&&c.winnerId)){const l=n.fighters.find(h=>h.id===n.result.winnerId);l&&(s=l.pos.x*wt+.65,a=l.pos.z*wt+.35,r=Math.atan2(-(l.pos.x*wt-s),-(l.pos.z*wt-a)),t.setExpression("happy"))}else s=Math.sin(this.time*.2)*.6,a=-2.35,r=0;t.root.position.x=En(t.root.position.x,s,2.2,e),t.root.position.z=En(t.root.position.z,a,2.2,e),t.root.rotation.y=En(t.root.rotation.y,r,3,e);const o=n.phase==="knockdown"?.9:.15;t.update(e,{stamina:90,stance:o,blocking:!1});for(const l of this.arena.staff)l!==t&&l.update(e,{stamina:95,idle:!0})}updateCamera(e,t=!1,n=!1){var p,g,v;const s=this.engine,r=this.camera.aspect<1?1.26:1,[o,c]=s.fighters,l=new L((o.pos.x+c.pos.x)/2*wt,1.08,(o.pos.z+c.pos.z)/2*wt);let h,d;if(n){const m=Ve((((p=this.entrance)==null?void 0:p.t)||0)/(((g=this.entrance)==null?void 0:g.dur)||3),0,1),f=m*m*(3-2*m);h=new L(Je(-3.6,3.1,f),Je(.65,2,f),Je(6,5,f)),d=new L(Je(1.6,0,f),Je(.75,1.1,f),.2)}else if(s.phase==="knockdown"&&s.down){const m=s.fighters.find(b=>b.id===s.down.fighter.id)||o,f=m.pos.x*wt,_=m.pos.z*wt;h=new L(f+1.55*r,.82,_+1.85*r),d=new L(f,.5,_)}else if(s.phase==="ko"&&s.result){const m=s.fighters.find(M=>M.id===s.result.loserId)||c;s.fighters.find(M=>M.id===s.result.winnerId);const f=m.pos.x*wt,_=m.pos.z*wt,b=Ve((s.phaseTime||0)/4,0,1);h=new L(f+2*r,.8+b*.4,_+1.9*r),d=new L(f,.42,_),h.y+=Math.sin(this.time*.8)*.03}else if(s.phase==="end"&&((v=s.result)!=null&&v.winnerId)){const m=s.fighters.find(b=>b.id===s.result.winnerId)||o,f=m.pos.x*wt,_=m.pos.z*wt;h=new L(f+1.55*r,1.5,_+2.15*r),d=new L(f,1.15,_),this.beltGroup&&(d.set(0,1.2,0),h.set(1.1,1.8,3.4))}else{const m=Math.abs(o.pos.z-c.pos.z)+Math.abs(o.pos.x-c.pos.x),f=Ve(m*.16,0,.45);h=new L(l.x+(2.85+f)*r,1.95+(r-1)*.8,l.z+(4.6+f*2.2)*r),d=new L(l.x,1.05,l.z),h.x+=Math.sin(this.time*.22)*.12,h.y+=Math.sin(this.time*.35)*.04}const u=n?2.4:t?100:s.phase==="knockdown"||s.phase==="ko"?2:3.4;if(this.camera.position.x=En(this.camera.position.x,h.x,u,e),this.camera.position.y=En(this.camera.position.y,h.y,u,e),this.camera.position.z=En(this.camera.position.z,h.z,u,e),this.cameraTarget.x=En(this.cameraTarget.x,d.x,u,e),this.cameraTarget.y=En(this.cameraTarget.y,d.y,u,e),this.cameraTarget.z=En(this.cameraTarget.z,d.z,u,e),this.shake>.01){const m=this.shake*.12;this.camera.position.x+=(Math.random()-.5)*m,this.camera.position.y+=(Math.random()-.5)*m,this.camera.position.z+=(Math.random()-.5)*m*.5}this.camera.lookAt(this.cameraTarget)}renderCamera(e){this.replay||(this.shake>.01,this.camera.lookAt(this.cameraTarget))}updateParticles(e){for(const a of this.sparks){if(a.life<=0){a.sprite.material.opacity=0;continue}a.life-=e;const r=1-a.life/a.max;a.sprite.material.opacity=Math.max(0,1-r)*.95;const o=a.size*(.55+r*1.3);a.sprite.scale.setScalar(o)}if(this.impactRingLife>0){this.impactRingLife-=e;const a=1-this.impactRingLife/.2;this.impactRing.material.opacity=Math.max(0,1-a),this.impactRing.scale.setScalar(1+a*3.5)}else this.impactRing.material.opacity=0;const{pos:t,vel:n,life:s}=this.sweat;for(let a=0;a<this.sweatCount;a++){if(s[a]<=0){t[a*3+1]>-5&&(t[a*3+1]=-10);continue}s[a]-=e,n[a*3+1]-=5.5*e,t[a*3]+=n[a*3]*e,t[a*3+1]+=n[a*3+1]*e,t[a*3+2]+=n[a*3+2]*e,t[a*3+1]<.03&&(t[a*3+1]=.03,n[a*3+1]*=-.2,n[a*3]*=.5)}this.sweat.geo.attributes.position.needsUpdate=!0,this.flashSprite.material.opacity=this.flash*.65,this.flashSprite.scale.setScalar(2+this.flash*2),this.flashSprite.material.color.set(this.flash>.5?"#ffd27a":"#ff7a4a"),this.flinchTimer>0&&(this.flinchTimer-=e)}recordFrame(e){if(this.engine.phase==="intro"||this.engine.phase==="roundEnd"||(this.recordTimer+=e,this.recordTimer<.045))return;this.recordTimer=0;const t={t:this.time,cam:{pos:this.camera.position.toArray(),look:this.cameraTarget.toArray()},boxers:this.boxers.map(n=>({pos:n.root.position.toArray(),ry:n.root.rotation.y,state:n.getRenderState()})),heat:this.heat,phase:this.engine.phase};this.frames.push(t),this.frames.length>170&&this.frames.shift()}startReplay(e=4,t=.42,n=null){if(this.frames.length<4)return n==null||n(),!1;const s=this.time-e,a=this.frames.filter(r=>r.t>=s);return a.length<4?(n==null||n(),!1):(this.replay={frames:a,index:0,elapsed:0,speed:t,onDone:n,duration:e},this._entranceDone=!1,!0)}updateReplay(e){var d,u;const t=this.replay;if(!t)return;t.elapsed+=e;const n=t.frames,s=n[0].t,a=s+t.elapsed*t.speed;let r=t.index;for(;r<n.length-1&&n[r+1].t<=a;)r++;t.index=r;const o=n[r],c=n[Math.min(n.length-1,r+1)],l=c.t>o.t?Ve((a-o.t)/(c.t-o.t),0,1):0;for(const[p,g]of this.boxers.entries()){const v=o.boxers[p],m=c.boxers[p];if(!v)continue;g.root.position.set(Je(v.pos[0],m.pos[0],l),Je(v.pos[1],m.pos[1],l),Je(v.pos[2],m.pos[2],l)),g.root.rotation.y=Je(v.ry,m.ry,l);const f={};for(const _ of Object.keys(v.state.pose))f[_]=Je(v.state.pose[_],((u=(d=m.state)==null?void 0:d.pose)==null?void 0:u[_])??v.state.pose[_],l);g.applyRenderState({...v.state,pose:f})}this.camera.position.set(Je(o.cam.pos[0],c.cam.pos[0],l),Je(o.cam.pos[1],c.cam.pos[1],l),Je(o.cam.pos[2],c.cam.pos[2],l));const h=new L(Je(o.cam.look[0],c.cam.look[0],l),Je(o.cam.look[1],c.cam.look[1],l),Je(o.cam.look[2],c.cam.look[2],l));if(this.camera.lookAt(h),this.cameraTarget.copy(h),this.heat=o.heat,t.elapsed*t.speed>=n[n.length-1].t-s||t.elapsed>18){const p=t.onDone;this.replay=null,this.syncFighters(1),p==null||p()}}maybeCelebrate(){const e=this.engine.result;if(!(!e||this.engine.phase!=="end")&&["KO","TKO","DEC","QUIT"].includes(e.method)&&(this.confetti||this.spawnConfetti(),this.pendingBelt&&!this.beltGroup)){const t=A_(this.pendingBelt);t.position.set(0,1.65,.1),t.rotation.set(.15,0,0),this.scene.add(t),this.beltGroup=t,this.beltSpin=0}}showBelt(e){this.pendingBelt=e,this.maybeCelebrate()}spawnConfetti(){const t=new Float32Array(720),n=new Float32Array(240*3),s=[[.95,.76,.3],[.76,.1,.16],[.96,.96,.94],[.2,.7,.9]];for(let c=0;c<240;c++){t[c*3]=(Math.random()-.5)*8,t[c*3+1]=3+Math.random()*4,t[c*3+2]=(Math.random()-.5)*6;const l=s[c%s.length];n[c*3]=l[0],n[c*3+1]=l[1],n[c*3+2]=l[2]}const a=new Ct;a.setAttribute("position",new Wt(t,3)),a.setAttribute("color",new Wt(n,3));const r=new Ea({size:.06,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1}),o=new fr(a,r);this.scene.add(o),this.confetti={points:o,pos:t,vel:Array.from({length:240},()=>[Math.random()*.4,1+Math.random()*1.2,Math.random()*.4]),count:240}}updateConfetti(e){if(!this.confetti)return;const{pos:t,vel:n,count:s}=this.confetti;for(let a=0;a<s;a++)t[a*3]+=Math.sin(this.time+a)*e*.35+n[a][0]*e,t[a*3+1]-=n[a][1]*e,t[a*3+2]+=Math.cos(this.time*.7+a)*e*.2,t[a*3+1]<.02&&(t[a*3+1]=3+Math.random()*3);this.confetti.points.geometry.attributes.position.needsUpdate=!0,this.beltGroup&&(this.beltSpin+=e*.7,this.beltGroup.rotation.y=Math.sin(this.time*.5)*.5,this.beltGroup.rotation.z=Math.sin(this.time*.8)*.04,this.beltGroup.position.y=1.65+Math.sin(this.time*1.6)*.04,this.beltGroup.visible=!0)}resize(e,t){this.camera.aspect=e/t,this.camera.fov=e/t<1?56:46,this.camera.updateProjectionMatrix()}render(){this.renderer.render(this.scene,this.camera)}dispose(){this.frames=[],this.replay=null;for(const e of this.boxers)e.dispose();this.arena.dispose(),this.scene.clear()}}const Tu={KeyJ:"jab",KeyK:"cross",KeyL:"hook",KeyI:"uppercut",KeyB:"body",Digit1:"jab",Digit2:"cross",Digit3:"hook",Digit4:"uppercut",Digit5:"body"},ux={KO:"NOCAUTE",TKO:"NOCAUTE TÉCNICO",DEC:"DECISÃO",DRAW:"EMPATE",QUIT:"DESISTÊNCIA"};function ql(){return{moveX:0,moveZ:0,block:!1,dodge:!1,punch:null,getUp:!1}}function Cu(i){const e=Number(i);return Number.isFinite(e)?Math.max(-1,Math.min(1,e)):0}function px(i){const e=ql();return!i||typeof i!="object"||(e.moveX=Cu(i.moveX),e.moveZ=Cu(i.moveZ),e.block=!!i.block,e.dodge=!!i.dodge,e.getUp=!!i.getUp,e.punch=lr[i.punch]?i.punch:null),e}function Au(i,e){return e?`${Math.round(i/e*100)}%`:"0%"}function fx(i,e={}){var _t,zn,Hs,dn,Vs,Er,Ba,Cd,Ad,Rd,Pd,Ld,Id,Dd;const t=e.mode==="multiplayer"?"multiplayer":"career",n=cx(i),s=(n==null?void 0:n.match)||null,a=i.save,r=(a==null?void 0:a.settings)||{},o={..._p,...r.controls||{}};if(t==="multiplayer"&&(!n||!s))return Bt(`<div class="screen plain">
      ${i.topbar("multiplayer")}
      <div class="empty-state">${J("wifiOff",44)}<b>Partida não encontrada</b>
        <p>A sessão online expirou. Volte ao lobby e crie ou entre em uma sala.</p>
        <button class="btn btn-primary" data-nav="multiplayer">Voltar ao lobby</button>
      </div>
    </div>`);const c=e.offer||(t==="career"?(_t=a==null?void 0:a.career)==null?void 0:_t.activeOffer:null);if(t==="career"&&!c)return Bt(`<div class="screen plain">
      ${i.topbar("career")}
      <div class="empty-state">${J("calendar",44)}<b>Nenhuma luta contratada</b>
        <p>Assine um contrato na carreira para entrar no ringue.</p>
        <button class="btn btn-primary" data-nav="career">Voltar à carreira</button>
      </div>
    </div>`);const l=t==="multiplayer"?n.role:"host",h=t==="career"||l==="host",d=t==="multiplayer"?l==="host"?"p1":"p2":"p1",u=d==="p1"?0:1,p=e.division||((zn=c==null?void 0:c.opponent)==null?void 0:zn.division)||((Hs=a==null?void 0:a.profile)==null?void 0:Hs.division)||(s==null?void 0:s.division)||"middle",g=e.arenaId||(c==null?void 0:c.arenaId)||(s==null?void 0:s.arenaId)||"neighborhood",v=Ss[g]||Ss.neighborhood,m=Math.max(1,Number(e.rounds||(c==null?void 0:c.rounds)||(s==null?void 0:s.rounds))||3),f=Math.max(30,Number(s==null?void 0:s.roundTime)||60),_=(c==null?void 0:c.difficulty)||r.difficulty||"pro";let b,M,I,w;if(t==="multiplayer")b=Su(s.p1,"p1"),M=Su(s.p2,"p2"),b.division=((dn=s.p1)==null?void 0:dn.division)||p,M.division=((Vs=s.p2)==null?void 0:Vs.division)||p,I=((Er=s.p1)==null?void 0:Er.appearance)||ws(b,b.division),w=((Ba=s.p2)==null?void 0:Ba.appearance)||ws(M,M.division);else{const X=Ns(a);b={...X,division:p,height:(Ad=(Cd=a==null?void 0:a.profile)==null?void 0:Cd.appearance)==null?void 0:Ad.height,reach:(Pd=(Rd=a==null?void 0:a.profile)==null?void 0:Rd.appearance)==null?void 0:Pd.reach,overall:(X==null?void 0:X.overall)||_n(((Ld=a==null?void 0:a.profile)==null?void 0:Ld.attributes)||{})},M={...c.opponent,division:((Id=c.opponent)==null?void 0:Id.division)||p},I=((Dd=a==null?void 0:a.profile)==null?void 0:Dd.appearance)||ws(b,p),w=ws(M,M.division||p)}const E=(c==null?void 0:c.eventName)||(t==="multiplayer"?`TG ONLINE · ${v.city}`:"TG BOXING"),C=(c==null?void 0:c.title)||null,U=C?`${On(C.org).short} · ${ai(C.tier)}`:"",y=new dx({rounds:m,roundTime:f,mode:t==="multiplayer"?"multiplayer":"career",difficulty:_,seed:(Date.now()^Math.floor(Math.random()*65535))>>>0,p1:b,p2:M,ai1:!1,ai2:t==="career",division:p,matchId:`${t==="multiplayer"?s.matchId:"career-"+Date.now().toString(36)}`}),x=new hx({renderer:i.app.renderer,engine:y,arenaConfig:v,quality:i.app.quality,appearances:{p1:I,p2:w},mobile:!!i.app.mobile}),N=x.update.bind(x);let O=!1,G=!1,F=!1,R=!1,W=!1,Y=!1,ie=null,D=null,P=null,te=null,ae=null,$=!1,Q=!1,de=0,me=0,ce=0,fe=ql(),Pe=[];const ke=new Set,Oe={x:0,y:0};let k=null,yt=!1,Ge=!1,Xe=null,De=!1,ot=0;const ue=Bt(`<div class="screen fight-screen" data-mode="${t}">
    <div class="fight-ui">
      <div class="hud-top">
        ${et(y.fighters[0],"p1",!1)}
        <div class="round-center">
          <div class="round-label" data-round-label>ROUND 1 / ${m}</div>
          <div class="round-timer" data-timer>${f}</div>
          <div class="round-dots" data-round-dots>${Array.from({length:m},(X,ne)=>`<i class="${ne===0?"done":""}"></i>`).join("")}</div>
          ${t==="multiplayer"?`<div class="network-chip"><i></i><span data-net-label>P2P · ${l==="host"?"ANFITRIÃO":"CONVIDADO"}</span></div>`:""}
        </div>
        ${et(y.fighters[1],"p2",!0)}
      </div>

      <div class="combo-meter" data-combo><span data-combo-val>2</span><small>COMBO</small></div>
      <div class="announcer" data-announcer><div class="big"></div><div class="small"></div></div>
      <div class="count-overlay" data-count><div class="count-num"></div></div>

      <button class="getup-btn hidden" data-action="getup" type="button">${J("upgrade",19)} LEVANTE-SE!<span>Toque repetidamente</span></button>

      <div class="hud-bottom">
        <div class="hud-stats" data-hud-stats></div>
        <div class="desktop-hint">
          <span><b class="key">WASD</b> mover</span>
          <span><b class="key">J</b> jab</span>
          <span><b class="key">K</b> direto</span>
          <span><b class="key">L</b> gancho</span>
          <span><b class="key">I</b> uppercut</span>
          <span><b class="key">B</b> corpo</span>
          <span><b class="key">ESPAÇO</b> guarda</span>
          <span><b class="key">Q</b> esquiva</span>
        </div>
        <div class="hud-actions">
          <button class="hud-btn" data-action="pause" title="Pausar (Esc)" aria-label="Pausar">${J("pause",16)}</button>
        </div>
      </div>

      <div class="touch-controls" data-touch-controls data-side="${o.side||"right"}">
        <div class="joystick" data-joystick><div class="joystick-knob" data-joystick-knob></div><div class="joy-label">MOVER</div></div>
        <div class="action-pad" data-action-pad>
          <button class="act-btn punch jab" data-touch="jab" type="button" aria-label="Jab">J</button>
          <button class="act-btn punch cross" data-touch="cross" type="button" aria-label="Direto">K</button>
          <button class="act-btn punch hook" data-touch="hook" type="button" aria-label="Gancho">L</button>
          <button class="act-btn punch upper" data-touch="uppercut" type="button" aria-label="Uppercut">I</button>
          <button class="act-btn punch body" data-touch="body" type="button" aria-label="Golpe no corpo">B</button>
          <button class="act-btn block" data-touch="block" type="button" aria-label="Guarda">GUARDA</button>
          <button class="act-btn dodge" data-touch="dodge" type="button" aria-label="Esquiva">ESQUIVA</button>
        </div>
      </div>

      <div class="replay-overlay hidden" data-replay-label>${J("return",13)} REPLAY · CÂMERA LENTA</div>
      <div class="reconnect-banner hidden" data-reconnect>
        <div class="spinner"></div>
        <div class="grow"><b data-reconnect-title>Reconectando…</b><span data-reconnect-text>A luta está pausada até a conexão voltar.</span></div>
        ${l==="host"&&t==="multiplayer"?'<button class="btn btn-sm btn-gold-outline" data-action="net-wo">Vitória por W.O.</button>':""}
        <button class="btn btn-sm btn-ghost" data-action="net-leave">Sair</button>
      </div>
    </div>

    <div class="fight-overlay" data-intro>
      <div class="fight-intro-wrap">
        <div class="intro-kicker">${J("ring",13)} ${V(E)}</div>
        <div class="vs-card">
          <div class="vs-fighter">
            <div class="portrait">${Fn(b.name)}</div>
            <h2>${V(b.name)}</h2>
            <div class="nickname">${V(b.nick||"Sem apelido")}</div>
            <div class="rec">${It(b.record)} · ${Et(b.division||p)}</div>
            <div class="vs-tags">
              <span class="chip">${J("flag",11)} ${V(b.nationality||wi(b.nationality))}</span>
              <span class="chip gold">OVR ${b.overall||_n(b.attributes)}</span>
            </div>
          </div>
          <div class="vs-mid">
            <div class="at">${t==="multiplayer"?"ONLINE P2P":"MAIN EVENT"}</div>
            <div class="vs">VS</div>
            <div class="at">${V(v.name)}</div>
          </div>
          <div class="vs-fighter">
            <div class="portrait red">${Fn(M.name)}</div>
            <h2>${V(M.name)}</h2>
            <div class="nickname">${V(M.nick||"Sem apelido")}</div>
            <div class="rec">${It(M.record)} · ${Et(M.division||p)}</div>
            <div class="vs-tags">
              <span class="chip">${J("flag",11)} ${V(M.nationality||wi(M.nationality))}</span>
              <span class="chip gold">OVR ${M.overall||_n(M.attributes)}</span>
            </div>
          </div>
        </div>
        <div class="intro-details">
          <div class="event">${V(E)}</div>
          <div class="meta">${J("calendar",11)} ${Vt((c==null?void 0:c.date)||new Date().toISOString())} · ${J("flag",11)} ${V(v.city)} · ${m} ROUNDS</div>
          ${U?`<div class="title-line">${J("belt",15)} DISPUTA DE ${V(U.toUpperCase())}</div>`:""}
          ${t==="multiplayer"?`<div class="title-line">${J("wifi",13)} PARTIDA ONLINE REAL · APOSTA VIRTUAL: ${nt(s.wager||0)} TG</div>`:""}
          <p class="intro-quote">“${V(tu[(b.name.length+M.name.length)%tu.length])}”</p>
        </div>
        <div class="intro-buttons">
          <button class="btn btn-primary btn-lg" data-action="enter">${J("play",17)} Entrar no ringue</button>
          <button class="btn btn-ghost" data-action="skip">Pular entrada</button>
        </div>
        <div class="intro-hint"><span class="key">ENTER</span> começar · <span class="key">ESC</span> pausar · ${t==="multiplayer"?"cada jogador controla seu próprio lutador":"teclado, mouse ou toque"}</div>
      </div>
    </div>

    <div class="fight-overlay hidden" data-pause>
      <div class="panel pause-menu">
        <h2>PAUSA</h2>
        <div class="panel-body">
          <button class="btn btn-primary" data-action="resume">${J("play",15)} Continuar luta</button>
          <button class="btn" data-action="replay-pause">${J("return",15)} Ver replay</button>
          <button class="btn" data-action="sound">${J("volume",15)} Som</button>
          <button class="btn btn-ghost" data-action="leave">Encerrar luta</button>
        </div>
      </div>
    </div>

    <div class="fight-overlay hidden" data-result>
      <div class="panel result-card" data-result-card></div>
    </div>
  </div>`),A=ue.querySelector("[data-intro]"),S=ue.querySelector("[data-pause]"),j=ue.querySelector("[data-result]"),re=ue.querySelector("[data-result-card]"),le=ue.querySelector('[data-action="pause"]'),se=ue.querySelector('[data-action="getup"]'),Ae=ue.querySelector("[data-announcer]"),ve=Ae.querySelector(".big"),Se=Ae.querySelector(".small"),Qe=ue.querySelector("[data-count]"),he=Qe.querySelector(".count-num"),we=ue.querySelector("[data-combo]"),$e=ue.querySelector("[data-combo-val]"),ze=ue.querySelector("[data-hud-stats]"),Ee=ue.querySelector("[data-timer]"),qe=ue.querySelector("[data-round-label]"),He=ue.querySelector("[data-round-dots]"),ht=ue.querySelector("[data-reconnect]"),B=ue.querySelector("[data-reconnect-title]"),xe=ue.querySelector("[data-reconnect-text]"),ee=ue.querySelector("[data-replay-label]"),oe=ue.querySelector("[data-net-label]"),ye={p1:ue.querySelector('[data-hp="p1"]'),p2:ue.querySelector('[data-hp="p2"]')},_e={p1:ue.querySelector('[data-stamina="p1"]'),p2:ue.querySelector('[data-stamina="p2"]')};function et(X,ne,Ne){var xt;const Ke=X.def||{};return`<div class="hud-fighter ${Ne?"right":""}">
      <div class="hud-avatar">${Fn(X.name)}</div>
      <div class="hud-info">
        <div class="hud-name">${V(X.name)}</div>
        <div class="hud-record">${It(Ke.record)} · OVR ${Ke.overall||_n(X.attributes)}${Ke.style?` · ${V(((xt=Bn[Ke.style])==null?void 0:xt.name)||Ke.style)}`:""}</div>
        <div class="hp-track"><div class="hp-fill ${ne==="p2"?"p2":""}" data-hp="${ne}"></div></div>
        <div class="stamina-track"><div class="stamina-fill ${ne==="p2"?"p2":""}" data-stamina="${ne}"></div></div>
      </div>
    </div>`}function St(X){var Yn,Kn;const[ne,Ne]=y.fighters;if(!ne||!Ne)return;ye.p1.style.width=`${Math.max(0,ne.hp/Math.max(1,ne.maxHp)*100)}%`,ye.p2.style.width=`${Math.max(0,Ne.hp/Math.max(1,Ne.maxHp)*100)}%`,_e.p1.style.width=`${Math.max(0,Math.min(100,ne.stamina))}%`,_e.p2.style.width=`${Math.max(0,Math.min(100,Ne.stamina))}%`;const Ke=Math.max(0,Math.ceil(y.clock));Ee.textContent=String(Ke).padStart(2,"0"),Ee.classList.toggle("low",Ke<=10&&y.phase==="fight"),y.phase==="roundEnd"?qe.textContent="INTERVALO":y.phase==="knockdown"?qe.textContent="CONTAGEM":y.phase==="intro"?qe.textContent=`ROUND 1 / ${m}`:y.phase==="end"||y.phase==="ko"?qe.textContent="FIM DA LUTA":qe.textContent=`ROUND ${y.round} / ${m}`,He.querySelectorAll("i").forEach((at,Rt)=>at.classList.toggle("done",Rt<y.round));const Mn=y.fighters[u];Mn&&Mn.combo>=2&&y.phase==="fight"?($e.textContent=Mn.combo,we.classList.add("show")):we.classList.remove("show");const jt=(Mn==null?void 0:Mn.stats)||{};ze.innerHTML=`<span>GOLPES <b>${jt.thrown||0}</b></span>
      <span>ACERTOS <b>${jt.landed||0}</b></span>
      <span>DANO <b>${Math.round(jt.damage||0)}</b></span>
      <span>DEFESAS <b>${(jt.blocks||0)+(jt.dodges||0)}</b></span>`;const mn=y.phase==="knockdown"&&((Kn=(Yn=y.down)==null?void 0:Yn.fighter)==null?void 0:Kn.id)===d;se.classList.toggle("hidden",!mn),mn?se.classList.add("urgent"):se.classList.remove("urgent"),oe&&t==="multiplayer"&&(oe.textContent=F?"RECONECTANDO":`P2P · ${l==="host"?"ANFITRIÃO":"CONVIDADO"}`),r.cameraShake===!1&&(x.shake=0),i.app.audio.setHeat(x.heat)}function At(X,ne="",Ne=1400){ve.textContent=X,Se.textContent=ne,Ae.classList.add("show"),te&&clearTimeout(te),te=setTimeout(()=>Ae.classList.remove("show"),Ne)}function it(X){he.textContent=X,he.style.animation="none",he.offsetWidth,he.style.animation="",Qe.classList.add("show"),ae&&clearTimeout(ae),ae=setTimeout(()=>Qe.classList.remove("show"),620)}function Xt(X){if(X!=null&&X.length){for(const ne of X)if(ne)switch(ne.type){case"hit":case"critical":x.handleEvent(ne),ne.defender===d&&o.haptic&&navigator.vibrate&&navigator.vibrate(ne.type==="critical"?45:18);break;case"block":case"guardBreak":case"dodge":case"dodgeSuccess":case"whiff":x.handleEvent(ne);break;case"getUp":x.handleEvent(ne),At("LEVANTOU!","A luta continua",1100);break;case"knockdown":{x.handleEvent(ne);const Ne=y.fighters.find(Ke=>Ke.id===ne.id);At("KNOCKDOWN!",Ne?Ne.name:"",1600);break}case"count":it(ne.count);break;case"ko":x.handleEvent(ne),At("NOCAUTE!","A luta acabou",2200);break;case"roundStart":At(`ROUND ${ne.round}`,E,1300);break;case"roundEnd":At("FIM DO ROUND","Os juízes registram o round",1500);break;case"decision":At("DECISÃO","Os juízes vão anunciar",1600);break;case"result":break;default:x.handleEvent(ne);break}i.app.audio.handleEvents(X),i.app.audio.setHeat(x.heat)}}function $n(X){var Yn,Kn,at,Rt,In,pi;if(t!=="multiplayer"||!s)return null;const ne=Math.max(0,Math.min(500,Number(s.wager)||0)),Ne=X.winnerId===d,Ke=!!X.winnerId&&!Ne,xt=$1({matchId:s.matchId,p1:(Yn=s.p1)==null?void 0:Yn.name,p2:(Kn=s.p2)==null?void 0:Kn.name,wager:ne,result:X}),Mn={wager:ne,delta:0,localWon:Ne,localLost:Ke,receipt:xt,balance:((at=a==null?void 0:a.career)==null?void 0:at.coins)??null};if(!(a!=null&&a.career))return Mn;a.multiplayer=a.multiplayer||{history:[],lastCode:null,name:(Rt=a.profile)==null?void 0:Rt.name,totalMatches:0,wins:0},a.multiplayer.history=Array.isArray(a.multiplayer.history)?a.multiplayer.history:[];const jt=a.multiplayer.history.find(fi=>fi.matchId===s.matchId);if(jt)return{wager:jt.wager,delta:jt.coinsDelta,localWon:jt.won,localLost:jt.lost,receipt:jt.receipt,balance:a.career.coins,replay:!0};let mn=0;return Ne?mn=ne:Ke&&(mn=-Math.min(ne,Math.max(0,a.career.coins))),mn&&ko(a,mn,"Aposta online virtual"),a.multiplayer.totalMatches=(a.multiplayer.totalMatches||0)+1,Ne&&(a.multiplayer.wins=(a.multiplayer.wins||0)+1),a.multiplayer.lastCode=s.code||null,a.multiplayer.history.unshift({matchId:s.matchId,code:s.code||null,at:new Date().toISOString(),opponent:(d==="p1"?(In=s.p2)==null?void 0:In.name:(pi=s.p1)==null?void 0:pi.name)||"Adversário",result:X.winnerId?Ne?"V":"D":"E",method:X.method,round:X.round||null,wager:ne,coinsDelta:mn,won:Ne,lost:Ke,receipt:xt}),a.multiplayer.history.length>30&&(a.multiplayer.history.length=30),Mt(a,!0),{wager:ne,delta:mn,localWon:Ne,localLost:Ke,receipt:xt,balance:a.career.coins}}function rs(X){var ne;if(!(Y||!X)){if(Y=!0,t==="career"&&a){try{ie=d1({save:a,universe:i.universe,result:X,offer:c,division:p,arenaId:g})}catch(Ne){console.error("Falha ao aplicar resultado da carreira",Ne),ie={ok:!1,message:(Ne==null?void 0:Ne.message)||"Falha ao registrar o resultado."}}ie!=null&&ie.ok&&Mt(a,!0)}else D=$n(X),D&&Mt(a,!0);t==="career"&&C&&(ie!=null&&ie.titleWon)&&x.showBelt({org:C.org,tier:ie.titleWon.tier||C.tier,name:C.name,holder:((ne=a==null?void 0:a.profile)==null?void 0:ne.name)||""}),Mr(X),h&&H()}}function Mr(X){if(W||P)return;const ne=X==null?void 0:X.method;P=setTimeout(()=>{P=null,ui(X)},ne==="KO"||ne==="TKO"?2350:ne==="DEC"?1050:350)}function ui(X){W||!X||(W=!0,G=!0,Di(),A.classList.add("hidden"),re.innerHTML=ka(X),j.classList.remove("hidden"),Sr(),t==="career"?X.winnerId==="p1"?i.app.audio.cheer():X.winnerId||i.app.audio.ui():D!=null&&D.localWon?i.app.audio.cheer():i.app.audio.ui())}function ka(X){var Ni,Oi,Ws,kd,Nd;const ne=X.winnerId?X.winnerId===d:null,Ne=ux[X.method]||X.method||"RESULTADO",Ke=((Ni=X.stats)==null?void 0:Ni.p1)||{},xt=((Oi=X.stats)==null?void 0:Oi.p2)||{},Mn=X.winnerName||(X.winnerId==="p1"?b.name:X.winnerId==="p2"?M.name:""),jt=(X.scorecards||[]).map(Gt=>{const cs=Gt.p1??Gt.a??0,ec=Gt.p2??Gt.b??0;return`<div class="scorecard"><span>${V(Gt.judge||"Juiz")}</span><b>${cs} - ${ec}</b><span>${cs===ec?"EMPATE":cs>ec?"P1":"P2"}</span></div>`}).join(""),mn=[["Golpes",Ke.thrown||0,xt.thrown||0],["Acertos",Ke.landed||0,xt.landed||0],["Precisão",Au(Ke.landed||0,Ke.thrown||0),Au(xt.landed||0,xt.thrown||0)],["Dano",Math.round((Ke.damage||0)*10)/10,Math.round((xt.damage||0)*10)/10],["Quedas",Ke.knockdowns||0,xt.knockdowns||0],["Defesas",(Ke.blocks||0)+(Ke.dodges||0),(xt.blocks||0)+(xt.dodges||0)],["Contra-ataques",Ke.counters||0,xt.counters||0],["Maior combo",Ke.maxCombo||0,xt.maxCombo||0]],Yn=mn.map(([Gt,cs])=>`<div class="result-stat"><span>${Gt}</span><b>${cs}</b></div>`).join(""),Kn=mn.map(([Gt,,cs])=>`<div class="result-stat"><span>${Gt}</span><b>${cs}</b></div>`).join("");let at="",Rt="",In="";if(t==="career"&&(ie!=null&&ie.ok)?(at=`<div class="result-rewards">
        <div class="reward"><span>Bolsa</span><b>C$ ${nt(ie.purse)}</b></div>
        <div class="reward"><span>TG COIN</span><b>+${nt(ie.coins)}</b></div>
        <div class="reward"><span>Reputação</span><b class="${ie.repDelta>=0?"green":"red"}">${ie.repDelta>=0?"+":""}${ie.repDelta}</b></div>
        <div class="reward"><span>Ranking</span><b>#${ie.rank}</b></div>
      </div>`,ie.resultArticle&&(Rt=`<div class="result-news"><span>TG NEWS · ${V(ie.resultArticle.tag||"RESULTADO")}</span>${V(ie.resultArticle.title)}</div>`),ie.titleWon?In=`<div class="notice green" style="margin-top:14px">${J("belt",16)} <b>NOVO CINTURÃO:</b> ${V((C==null?void 0:C.name)||ai(ie.titleWon.tier))} · ${On((C==null?void 0:C.org)||ie.titleWon.org).short}. ${ie.titleWon.defense?"Defesa de título registrada.":"Seu nome entra na história."}</div>`:ie.titleLost&&(In=`<div class="notice red" style="margin-top:14px">${J("belt",16)} <b>CINTURÃO PERDIDO:</b> ${V(ai(ie.titleLost.tier))}.</div>`)):t==="career"&&ie&&!ie.ok&&(at=`<div class="notice red" style="margin-top:14px">${J("shield",14)} ${V(ie.message||"Resultado não aplicado.")}</div>`),t==="multiplayer"){const Gt=D;Gt&&(at=`<div class="result-rewards">
          <div class="reward"><span>Aposta efetiva</span><b>${nt(Gt.wager)} TG</b></div>
          <div class="reward"><span>Seu saldo</span><b>${nt(Gt.balance??((Ws=a==null?void 0:a.career)==null?void 0:Ws.coins)??0)} TG</b></div>
          <div class="reward"><span>Resultado da aposta</span><b class="${Gt.delta>0?"green":Gt.delta<0?"red":""}">${Gt.delta>0?"+":""}${nt(Gt.delta)} TG</b></div>
          <div class="reward"><span>Recibo</span><b class="mono">${V(Gt.receipt)}</b></div>
        </div>
        <div class="result-news"><span>PARTIDA ONLINE · REGISTRO À PROVA DE DUPLICIDADE</span>
          ${V(s.code||s.matchId)} · ${V(((kd=s.p1)==null?void 0:kd.name)||"P1")} vs ${V(((Nd=s.p2)==null?void 0:Nd.name)||"P2")} · apostas apenas em TG COIN virtual, sem valor real.
        </div>`)}const pi=ne===null?'<span class="tag">EMPATE</span>':ne?'<span class="tag green">VOCÊ VENCEU</span>':'<span class="tag red">VOCÊ PERDEU</span>',fi=t==="multiplayer"?`<button class="btn btn-primary" data-result-action="rematch">${J("clash",15)} Revanche</button>
         <button class="btn" data-result-action="lobby">${J("wifi",15)} Voltar ao lobby</button>
         <button class="btn btn-ghost" data-result-action="replay">${J("return",15)} Replay</button>
         <button class="btn btn-ghost" data-result-action="menu">${J("home",15)} Menu</button>`:`<button class="btn btn-primary" data-result-action="career">${J("crown",15)} Voltar à carreira</button>
         ${ie!=null&&ie.resultArticle?`<button class="btn" data-result-action="news">${J("news",15)} Ler notícia</button>`:""}
         <button class="btn btn-ghost" data-result-action="replay">${J("return",15)} Replay</button>
         <button class="btn btn-ghost" data-result-action="menu">${J("home",15)} Menu</button>`;return`<div class="result-head">
      <div class="kicker">${V(E)} · ${V(v.name)} · ${V(v.city)}</div>
      <div class="method">${V(Ne)}</div>
      <div class="winner">${X.winnerId?`VENCEDOR: <span>${V(Mn)}</span>`:"LUTA EMPATADA"}</div>
      <div class="meta">ROUND ${X.round||m} · ${m} ROUNDS · ${Vt(X.date||new Date().toISOString())}</div>
      <div class="result-tags">${pi}
        ${X.decisionType?`<span class="tag blue">${V(X.decisionType)}</span>`:""}
        ${t==="career"&&X.winnerId==="p1"?'<span class="tag gold">RESULTADO OFICIAL</span>':""}
      </div>
    </div>
    <div class="result-fighters">
      <div><b>${V(b.name)}</b><span>${It(b.record)}</span></div>
      <span class="vs-small">VS</span>
      <div><b>${V(M.name)}</b><span>${It(M.record)}</span></div>
    </div>
    <div class="result-stats">
      <div class="result-side">${Yn}</div>
      <div class="vs-small">VS</div>
      <div class="result-side right">${Kn}</div>
    </div>
    ${jt?`<div class="scorecards">${jt}</div>`:""}
    ${at}
    ${In}
    ${Rt}
    <div class="result-actions">${fi}</div>`}function Sr(){re.querySelectorAll("[data-result-action]").forEach(X=>{X.addEventListener("click",()=>{const ne=X.dataset.resultAction;if(ne==="career")return os("career");if(ne==="rematch")return Q=!0,i.navigate("multiplayer",{rematch:!0});if(ne==="lobby")return Q=!0,i.navigate("multiplayer");if(ne==="menu")return os("menu");if(ne==="news"&&(ie!=null&&ie.resultArticle))return i.navigate("news",{id:ie.resultArticle.id});if(ne==="replay")return Ii(!1)})})}function os(X,ne={}){t==="multiplayer"&&X==="multiplayer"&&(Q=!0),i.navigate(X,ne)}function Ii(X=!1){if($)return;if(x.frames.length<4){i.toast("Replay ainda não disponível.","info","play");return}$=!0,j.classList.add("hidden"),S.classList.add("hidden"),ue.classList.add("replaying"),ee.classList.remove("hidden");const ne=G;G=!0,x.startReplay(5.5,.48,()=>{$=!1,ue.classList.remove("replaying"),ee.classList.add("hidden"),X||ne?(G=!0,W||S.classList.remove("hidden")):G=!1,W&&j.classList.remove("hidden")})||($=!1,ue.classList.remove("replaying"),ee.classList.add("hidden"),W?j.classList.remove("hidden"):X&&S.classList.remove("hidden"))}function Na(){if(R!==!1){if(W){Ii(!1);return}G=!0,Di(),S.classList.remove("hidden"),i.app.audio.ui()}}function Di(){S.classList.add("hidden")}function Oa(){W||(Di(),G=!1,i.app.audio.ui(),Gs="")}let Gs="";function Qo(){let X=0,ne=0;(ke.has("KeyD")||ke.has("ArrowRight"))&&(X+=1),(ke.has("KeyA")||ke.has("ArrowLeft"))&&(X-=1),(ke.has("KeyW")||ke.has("ArrowUp"))&&(ne+=1),(ke.has("KeyS")||ke.has("ArrowDown"))&&(ne-=1),X+=Oe.x,ne+=Oe.y;const Ne=Math.hypot(X,ne);return Ne>1&&(X/=Ne,ne/=Ne),{x:X,z:ne}}function wr(X,ne=!0){const Ne=Qo(),Ke=!!(yt||Ge||ke.has("Space")||ke.has("ShiftLeft")),xt={moveX:Ne.x,moveZ:Ne.z,block:Ke,dodge:De,punch:Xe,getUp:X<ot};return ne&&(Xe=null,De=!1),xt}function Ua(X){var ne,Ne;if(!(!lr[X]||W)&&R){if(y.phase==="knockdown"&&((Ne=(ne=y.down)==null?void 0:ne.fighter)==null?void 0:Ne.id)===d){z();return}Xe=X,Z()}}function T(){!R||W||G||(De=!0,Z())}function z(){ot=performance.now()+130,Z()}function K(X=performance.now(),ne=!1){if(t!=="multiplayer"||l!=="guest"||!ne&&X-me<62||!(n!=null&&n.session))return;const Ne=wr(X,!0),Ke=`${Ne.moveX.toFixed(2)}|${Ne.moveZ.toFixed(2)}|${Ne.block}|${Ne.dodge}|${Ne.punch}|${Ne.getUp}`;if(!ne&&Ke===Gs){me=X;return}Gs=Ke,me=X,vn(i,{t:"input",input:Ne})}function Z(){t==="multiplayer"&&l==="guest"&&K(performance.now(),!0)}function H(){if(t!=="multiplayer"||l!=="host"||!(n!=null&&n.session))return;const X=Pe.splice(0,Pe.length);vn(i,{t:"state",snapshot:y.getSnapshot(),events:X,at:Date.now()})}function pe(X){var ne;return!!((ne=X==null?void 0:X.closest)!=null&&ne.call(X,'input, textarea, select, [contenteditable="true"]'))}const be=X=>{if(!pe(X.target)){if(X.code==="Escape"||X.code==="KeyP"){X.preventDefault(),R&&!W&&(G?Oa():Na());return}if(!R){(X.code==="Enter"||X.code==="Space")&&(X.preventDefault(),gt(!1));return}if(!W){if((X.code==="Space"||X.code==="ShiftLeft"||X.code==="ShiftRight")&&X.preventDefault(),X.repeat){(X.code==="Space"||X.code==="ShiftLeft")&&ke.add(X.code);return}if(ke.add(X.code),Tu[X.code]){X.preventDefault(),Ua(Tu[X.code]);return}(X.code==="KeyQ"||X.code==="KeyE")&&(X.preventDefault(),T())}}},Te=X=>{ke.delete(X.code)},Re=()=>{ke.clear(),Ge=!1,yt=!1,Oe.x=0,Oe.y=0,Xe=null,De=!1},Fe=()=>Re(),Be=X=>{if(!(!R||G||W)&&!X.target.closest("button, .touch-controls, .fight-overlay, .hud-btn")){if(X.pointerType==="mouse"&&X.button===2){Ge=!0,X.preventDefault();return}X.pointerType==="mouse"&&X.button===0&&(Ua(X.clientY>window.innerHeight*.62?"body":"jab"),X.preventDefault())}},Le=X=>{X.pointerType==="mouse"&&X.button===2&&(Ge=!1)},rt=X=>{X.target.closest(".fight-screen")&&X.preventDefault()};function mt(){const X=ue.querySelector("[data-touch-controls]"),ne=ue.querySelector("[data-joystick]"),Ne=ue.querySelector("[data-joystick-knob]"),Ke=ue.querySelector("[data-action-pad]");if(!X||!ne||!(i.app.mobile||typeof matchMedia<"u"&&matchMedia("(pointer:coarse)").matches))return;X.classList.add("enabled");const Mn=Math.max(80,Math.min(190,Number(o.joystick)||128));ne.style.width=`${Mn}px`,ne.style.height=`${Mn}px`,X.style.setProperty("--ctrl-opacity",String(Math.max(.3,Math.min(1,Number(o.opacity)||.8))));const jt=Math.max(.75,Math.min(1.35,(Number(o.buttons)||132)/132));Ke&&Ke.style.setProperty("--btn-scale",jt.toFixed(2));const mn=o.side==="left"?"left":"right";X.dataset.side=mn;const Yn=at=>{const Rt=ne.getBoundingClientRect(),In=Rt.left+Rt.width/2,pi=Rt.top+Rt.height/2;let fi=at.clientX-In,Ni=at.clientY-pi;const Oi=Rt.width*.38,Ws=Math.hypot(fi,Ni);Ws>Oi&&(fi=fi/Ws*Oi,Ni=Ni/Ws*Oi),Ne.style.transform=`translate(calc(-50% + ${fi}px), calc(-50% + ${Ni}px))`,Oe.x=fi/Oi,Oe.y=-Ni/Oi},Kn=()=>{k=null,Oe.x=0,Oe.y=0,Ne.style.transform="translate(-50%, -50%)"};ne.addEventListener("pointerdown",at=>{var Rt;at.preventDefault(),k=at.pointerId,(Rt=ne.setPointerCapture)==null||Rt.call(ne,at.pointerId),Yn(at)}),ne.addEventListener("pointermove",at=>{k===at.pointerId&&(at.preventDefault(),Yn(at))}),ne.addEventListener("pointerup",at=>{k===at.pointerId&&Kn()}),ne.addEventListener("pointercancel",Kn),X.querySelectorAll("[data-touch]").forEach(at=>{const Rt=at.dataset.touch;at.addEventListener("pointerdown",pi=>{pi.preventDefault(),pi.stopPropagation(),Rt==="block"?(yt=!0,at.classList.add("pressed")):Rt==="dodge"?(T(),at.classList.add("pressed")):(Ua(Rt),at.classList.add("pressed"))});const In=()=>{at.classList.remove("pressed"),Rt==="block"&&(yt=!1)};at.addEventListener("pointerup",In),at.addEventListener("pointercancel",In),at.addEventListener("pointerleave",In)})}mt();function gt(X=!1){if(R)return;R=!0,A.classList.add("hidden"),x.startEntrance(),t==="multiplayer"&&l==="host"&&vn(i,{t:"begin"});const ne=()=>{t==="multiplayer"?l==="host"&&(y.start(),vn(i,{t:"started"})):y.start()};X?(x.onEntranceDone=null,x.endEntrance(),ne()):x.onEntranceDone=()=>{x.onEntranceDone=null,ne()}}function cn(){R||gt(!1)}function st(){R||(R=!0,A.classList.add("hidden")),x.entrance&&x.endEntrance(),y.started||(y.started=!0)}const Ut=t==="multiplayer"?Wl(i,(X,ne={})=>{if(t==="multiplayer")switch(X){case"state":{if(l!=="guest")break;Array.isArray(ne.events)&&ne.events.length&&Xt(ne.events),ne.snapshot&&(st(),y.applySnapshot(ne.snapshot),qt(),F=!1,ne.snapshot.result&&rs(ne.snapshot.result));break}case"input":{if(l!=="host")break;fe=px(ne.input),ce=performance.now();break}case"begin":{if(l!=="guest")break;cn();break}case"started":{if(l!=="guest")break;st();break}case"resync":{if(l!=="host")break;H();break}case"hello":{if(l!=="host")break;F=!1,qt(),y.started&&H();break}case"connected":{ne.resumed&&(F=!1,qt(),l==="host"?H():vn(i,{t:"resync"}));break}case"reconnected":{F=!1,qt(),l==="guest"&&vn(i,{t:"resync"});break}case"disconnected":{F=!0,tt("Conexão perdida","A luta foi pausada. Tentando reconectar automaticamente…"),W||i.toast("Conexão instável. A luta está pausada.","error","wifiOff");break}case"status":{(ne.state==="reconnecting"||ne.state==="offline")&&(F=!0,tt("Reconectando…",ne.label||"Aguardando o adversário."));break}case"closed":{F=!0,tt("Sala encerrada","O anfitrião encerrou a partida.");break}case"error":{ne.message&&i.toast(ne.message,"error","wifiOff");break}}}):()=>{};function tt(X,ne){B.textContent=X,xe.textContent=ne,ht.classList.remove("hidden")}function qt(){ht.classList.add("hidden")}function ki(){t!=="multiplayer"||l!=="host"||y.result||(y.endFight({winnerId:"p1",loserId:"p2",method:"QUIT",round:y.round,time:Math.max(0,y.clock)}),rs(y.result),qt(),F=!1)}function ln(X){if(O)return;const ne=performance.now(),Ne=G||F;if(R&&!$)if(h){if(!Ne){const xt=wr(ne,!0);t==="multiplayer"?(ne-ce>900&&(fe=ql()),y.update(X,{p1:xt,p2:fe})):y.update(X,{p1:xt})}const Ke=y.drainEvents();Ke.length&&(Xt(Ke),Pe.push(...Ke)),y.result&&rs(y.result),t==="multiplayer"&&!W&&ne-de>66&&(de=ne,H())}else y.drainEvents().length,y.result&&rs(y.result),!W&&ne-me>62&&K(ne,!1);St()}x.update=X=>{ln(X),N(X)},i.app.showFight(x),i.app.audio.setScene("fight"),i.app.audio.setHeat(.4),ue.querySelectorAll("[data-action]").forEach(X=>{const ne=X.dataset.action;ne!=="pause"&&X.addEventListener("click",Ne=>{Ne.preventDefault(),ne==="enter"?gt(!1):ne==="skip"?gt(!0):ne==="resume"?Oa():ne==="replay-pause"?Ii(!0):ne==="leave"?i.confirm({title:t==="multiplayer"?"Sair da partida?":"Encerrar a luta?",message:t==="multiplayer"?"A sala online será encerrada para os dois jogadores.":"Encerrar agora conta como desistência para a carreira.",confirmLabel:"Sair",danger:!0,onConfirm:()=>{t==="career"?(G=!1,y.quit("p1")):os("multiplayer")}}):ne==="sound"?Fa(X):ne==="getup"?(z(),i.app.audio.ui()):ne==="net-leave"?os("multiplayer"):ne==="net-wo"&&ki()})}),le.addEventListener("click",()=>Na());function Fa(X){i.audioMuted=!i.audioMuted,i.app.audio.master&&(i.app.audio.master.gain.value=i.audioMuted?0:.9),X.innerHTML=`${J((i.audioMuted,"volume"),15)} Som ${i.audioMuted?"desligado":"ligado"}`}return window.addEventListener("keydown",be),window.addEventListener("keyup",Te),window.addEventListener("blur",Fe),ue.addEventListener("pointerdown",Be),ue.addEventListener("pointerup",Le),ue.addEventListener("contextmenu",rt),t==="multiplayer"&&l==="guest"&&(A.dataset.remote="1"),i.onCleanup(()=>{O=!0,window.removeEventListener("keydown",be),window.removeEventListener("keyup",Te),window.removeEventListener("blur",Fe),ue.removeEventListener("pointerdown",Be),ue.removeEventListener("pointerup",Le),ue.removeEventListener("contextmenu",rt),Ut(),te&&clearTimeout(te),ae&&clearTimeout(ae),P&&clearTimeout(P),t==="multiplayer"&&!Q&&Xl(i),i.lastBackground=null,i.app.clearBackground()}),ue}const Ru=document.getElementById("boot-bar"),$o=document.getElementById("boot-phase"),Wi=document.getElementById("boot-screen");function ha(i,e){$o&&($o.textContent=i),Ru&&(Ru.style.width=`${e}%`)}function Wc(i){return new Promise(e=>setTimeout(e,i))}async function mx(){var c;ha("Acordando o universo",8),await Wc(50);const i=document.getElementById("game-canvas");if(!i)throw new Error("Canvas 3D não encontrado.");ha("Carregando arena e iluminação",24);const e=new F_(i),t=new V_(e);W_(t);let n=y_();ha("Gerando 1.100 lutadores",46),await Wc(30);let s=__();(!s||!Array.isArray(s.fighters)||s.fighters.length<100||!s.champions)&&(s=j_()),x_(s),e.boot({save:n,universe:s}),t.save=n,t.universe=s,e.navigator=(l,h)=>t.navigate(l,h),n&&((c=n.career.news)!=null&&c.length||Ap(n,s,14),_d(n,s,3),Mt(n,!0)),ha("Aplicando preferências",66),n!=null&&n.settings&&(e.audio.setSettings(n.settings),n.settings.reducedMotion&&document.body.classList.add("reduce-motion"),n.settings.highContrast&&document.body.classList.add("high-contrast"),n.settings.quality&&n.settings.quality!=="auto"&&e.setQuality(n.settings.quality),document.body.classList.toggle("reduce-motion",!!n.settings.reducedMotion)),ha("Montando o vestiário",82),t.addScreen("menu",G1),t.addScreen("create",V1),t.addScreen("editor",W1),t.addScreen("career",q1),t.addScreen("rankings",J1),t.addScreen("news",Z1),t.addScreen("shop",ex),t.addScreen("gym",nx),t.addScreen("stats",sx),t.addScreen("settings",rx),t.addScreen("multiplayer",lx),t.addScreen("fight",fx),t.app.audio.setSettings((n==null?void 0:n.settings)||{}),t.start();const a=()=>{e.audio.unlock(),window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a)};window.addEventListener("pointerdown",a,{passive:!0}),window.addEventListener("keydown",a);const r=new URLSearchParams(window.location.search),o=ni(r.get("room")||"");return o&&setTimeout(()=>t.navigate("multiplayer",{join:o}),120),window.addEventListener("beforeunload",()=>{t.save&&Mt(t.save,!0)}),document.addEventListener("visibilitychange",()=>{var l;document.visibilityState==="hidden"&&t.save&&((l=t.save.settings)==null?void 0:l.autoSave)!==!1&&Mt(t.save,!0)}),window.addEventListener("error",l=>{var d;const h=((d=l==null?void 0:l.error)==null?void 0:d.message)||(l==null?void 0:l.message)||"Erro inesperado";String(h).includes("Script error")||t.toast(h,"error","close")}),window.addEventListener("unhandledrejection",l=>{var d;const h=((d=l==null?void 0:l.reason)==null?void 0:d.message)||String((l==null?void 0:l.reason)||"Falha inesperada");t.toast(h,"error","close")}),window.TG_BOXING={app:e,ui:t,get save(){return t.save},get universe(){return t.universe},navigate:(l,h)=>t.navigate(l,h),saveNow:()=>Mt(t.save,!0),booted:!0},ha("Pronto para lutar",100),await Wc(420),Wi==null||Wi.classList.add("hide"),setTimeout(()=>Wi==null?void 0:Wi.remove(),900),ci.emit("booted",{app:e,ui:t}),{app:e,ui:t}}mx().catch(i=>{console.error("Falha ao iniciar TG BOXING",i),$o&&($o.textContent="Falha ao iniciar: "+((i==null?void 0:i.message)||i)),Wi&&Wi.insertAdjacentHTML("beforeend",'<button class="btn btn-primary" style="margin-top:22px" onclick="location.reload()">Tentar novamente</button>')});
