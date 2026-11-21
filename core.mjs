export const SHOWS=[
 {name:'First Splash',tag:'Find your shape',walls:6,speed:3.4,slack:.28},
 {name:'Coral Club',tag:'Slide into place',walls:8,speed:3.8,slack:.28},
 {name:'Sunset Shuffle',tag:'Follow the opening',walls:8,speed:4,slack:.28},
 {name:'Palm Parade',tag:'Keep your cool',walls:10,speed:4.3,slack:.28},
 {name:'Afterglow',tag:'A little more rhythm',walls:10,speed:4.7,slack:.28},
 {name:'The Big Splash',tag:'Your headline show',walls:12,speed:5,slack:.28}
];
export const POSES=['TALL','STAR','DUCK'];
export const COLORS=['#f87936','#2bbdaf','#b595ec','#f4c34c','#f56895','#6b9dff'];
export function clean(v={}){return {stars:Array.from({length:6},(_,i)=>Math.min(3,Math.max(0,Math.floor(Number(v.stars?.[i])||0)))),best:Math.max(0,Number(v.best)||0),suit:Math.min(5,Math.max(0,Math.floor(Number(v.suit)||0))),sound:v.sound!==false,rewards:{like:v.rewards?.like===true,comment:v.rewards?.comment===true}};}
export function mergeProfile(a,b){a=clean(a);b=clean(b);return {...a,stars:a.stars.map((s,i)=>Math.max(s,b.stars[i])),best:Math.max(a.best,b.best),rewards:{like:a.rewards.like||b.rewards.like,comment:a.rewards.comment||b.rewards.comment}};}
export function unlocked(p){return Math.min(5,p.stars.findIndex(s=>!s)<0?5:p.stars.findIndex(s=>!s));}
export function wallSpec(level,index){let pose=level===0?index%3:(index*7+level)%3;let x=level===0?0:[-2.1,0,2.1,0,2.1,-2.1][(index+level)%6];return {pose,x,drift:level>=2&&index%3===1?Math.min(.8,.35+level*.1):0};}
export function openingX(spec,t){return spec.x+Math.sin(t*1.5)*spec.drift;}
export function verdict(pose,x,spec,t,slack){let d=Math.abs(x-openingX(spec,t));return {hit:pose===spec.pose&&d<=slack,perfect:pose===spec.pose&&d<=slack*.4,distance:d};}
export class Round{
 constructor(level=0){this.level=Math.max(0,Math.min(6,level));this.endless=level===6;this.cfg=SHOWS[Math.min(5,level)];this.index=0;this.lives=3;this.score=0;this.combo=0;this.perfect=0;this.passed=0;this.finished=false;}
 get spec(){return wallSpec(this.level,this.index);}
 resolve(pose,x,t){if(this.finished)return null;let v=verdict(pose,x,this.spec,t,this.cfg.slack);if(v.hit){this.passed++;this.combo++;this.perfect+=+v.perfect;this.score+=100+(v.perfect?50:0)+Math.min(5,this.combo)*20;}else{this.lives--;this.combo=0;}this.index++;this.finished=this.lives<=0||(!this.endless&&this.index>=this.cfg.walls);return {...v,finished:this.finished,win:this.finished&&this.lives>0};}
 get medal(){return this.lives>0?(this.lives===3&&this.perfect>=Math.ceil(this.cfg.walls/2)?3:this.lives>=2?2:1):0;}
}
