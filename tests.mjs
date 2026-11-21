import assert from 'node:assert/strict';
import {Round,SHOWS,clean,mergeProfile,unlocked,wallSpec,openingX,verdict} from './core.mjs';
let checks=0;function ok(v,msg){assert(v,msg);checks++;}
let p=clean();ok(unlocked(p)===0,'new profile only first show');
for(let level=0;level<6;level++){
 let r=new Round(level);for(let i=0;i<SHOWS[level].walls;i++){let s=r.spec,t=(20/r.cfg.speed),x=openingX(s,t),result=r.resolve(s.pose,x,t);ok(result.hit&&result.perfect,'authored wall is solvable');ok(Math.abs(x)<3.35,'opening within reachable runway');}
 ok(r.finished&&r.medal===3,'complete show awards three stars');p.stars[level]=r.medal;ok(unlocked(p)===Math.min(5,level+1),'sequential unlock');ok(r.resolve(0,0,0)===null,'terminal score cannot be duplicated');
}
let loss=new Round(0);for(let n=0;n<3;n++)loss.resolve((loss.spec.pose+1)%3,0,0);ok(loss.finished&&loss.lives===0&&loss.medal===0,'three misses ends round');
let endless=new Round(6);for(let n=0;n<35;n++){let s=endless.spec;endless.resolve(s.pose,openingX(s,1),1);}ok(!endless.finished&&endless.index===35,'encore continues beyond campaign length');
let c=clean({stars:[-5,9,NaN],suit:99,best:-9});ok(c.stars.join(',')==='0,3,0,0,0,0'&&c.suit===5&&c.best===0,'untrusted save normalized');
let merged=mergeProfile({stars:[3,1],sound:false,rewards:{like:true}},{stars:[1,3],rewards:{comment:true}});ok(merged.stars[0]===3&&merged.stars[1]===3&&!merged.sound&&merged.rewards.like&&merged.rewards.comment,'cloud never erases best progress or local settings');
for(let level=0;level<6;level++){let s=wallSpec(level,4);ok(!verdict(s.pose,3.35,s,0,SHOWS[level].slack).hit,'out of opening misses');ok(!verdict((s.pose+1)%3,s.x,s,0,1).hit,'wrong pose misses');}
console.log(JSON.stringify({checks,scope:'Campaign solvability, scoring, losses, unlocks, endless, save normalization and merge'}));
