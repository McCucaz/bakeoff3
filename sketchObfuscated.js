const _0x52b2=['wxyz','CPS:\x20','983QlmrSv','push','If\x20you\x20have\x20any\x20suggestions\x20or\x20advices\x20that\x20would\x20increase\x20your\x20performance,\x20please\x20write\x20them\x20down\x20below.','WPM\x20with\x20penalty:\x20','wpm_w_penalty','startsWith','log','toFixed','237mrutIC','val','Arial','mouseReleased','33476fvfmjo','Leaderboards','41bgvJxk','database','Target\x20phrase\x20','erase.png','split','ppi','1WAivlC','START\x202ND\x20ATTEMPT','AIzaSyAXut58LmRSwNrNWa56WH8hiPya4OuhAbQ','SUBMIT','data/pairwords.txt','toLowerCase','length','Thank\x20you\x20for\x20your\x20participation!','tuv','bakeoff3-1c7b1.firebaseapp.com','429429NdEGIu','Opinions','\x20with\x20','position','1746758GeuIZW','3606RhwVdM','trim','size','First\x20Iteration','\x20out\x20of\x202!','mno','\x20words\x20per\x20minute.','initializeApp','data/arm_watch.png','19597XtRIwx','value','width','jkl','screen','remove','Swipe\x20up\x20to\x20complete','ref','replace','https://bakeoff3-1c7b1-default-rtdb.europe-west1.firebasedatabase.app/','ghi','def','38UzhQQf','orderByChild','Freebie\x20errors:\x20','1018567PdyLFV','\x20-\x20','substring','Raw\x20WPM:\x20'];function _0x3b63(_0x4a5d85,_0x5eba57){_0x4a5d85=_0x4a5d85-0x18a;let _0x52b250=_0x52b2[_0x4a5d85];return _0x52b250;}(function(_0x4c7874,_0x2e32bf){const _0x5afa2a=_0x3b63;while(!![]){try{const _0x5249f2=-parseInt(_0x5afa2a(0x1a1))*parseInt(_0x5afa2a(0x1bc))+parseInt(_0x5afa2a(0x193))+-parseInt(_0x5afa2a(0x199))*-parseInt(_0x5afa2a(0x190))+parseInt(_0x5afa2a(0x1ad))*-parseInt(_0x5afa2a(0x1c5))+parseInt(_0x5afa2a(0x1b7))+parseInt(_0x5afa2a(0x1a5))*-parseInt(_0x5afa2a(0x1a7))+parseInt(_0x5afa2a(0x1bb));if(_0x5249f2===_0x2e32bf)break;else _0x4c7874['push'](_0x4c7874['shift']());}catch(_0x14afca){_0x4c7874['push'](_0x4c7874['shift']());}}}(_0x52b2,0xf091d));const GROUP_NUMBER=0x2e,BAKE_OFF_DAY=!![];let PPI,PPCM,second_attempt_button,finger_img,FINGER_SIZE,FINGER_OFFSET,arm_img,ARM_LENGTH,ARM_HEIGHT,draw_finger_arm=![],phrases=[],current_trial=0x0,attempt=0x0,target_phrase='',currently_typed='',entered=new Array(0x2),CPS=0x0,attempt_start_time,attempt_end_time,trial_end_time,letters_entered=0x0,letters_expected=0x0,errors=0x0,database,erase,ARROW_SIZE,current_letter=-0x1,time,lastTime=0x0,toComplete,locked,clickedX,clickedY;function preload(){const _0x258456=_0x3b63;arm=loadImage(_0x258456(0x1c4)),fingerOcclusion=loadImage('data/finger.png'),phrases=loadStrings('data/phrases.txt'),erase=loadImage(_0x258456(0x1aa)),possibleWords=loadStrings('data/wordlist.txt'),commonPairs=loadStrings(_0x258456(0x1b1)),console[_0x258456(0x19f)]('loaded');}function getFirstMatch(_0x121ed8){const _0x537a23=_0x3b63;let _0x30ff37=_0x121ed8[_0x537a23(0x1ab)]('\x20'),_0x20e6ba=_0x30ff37[_0x30ff37[_0x537a23(0x1b3)]-0x1],_0x21276a=_0x30ff37[_0x30ff37[_0x537a23(0x1b3)]-0x2];for(let _0x48e63b=0x0;_0x48e63b<commonPairs[_0x537a23(0x1b3)];_0x48e63b++){const _0x4e68c8=commonPairs[_0x48e63b];let _0x46e7ec=_0x4e68c8[_0x537a23(0x1ab)]('\x20');if(_0x46e7ec[0x0][_0x537a23(0x1b2)]()==_0x21276a&&_0x46e7ec[0x1][_0x537a23(0x1b2)]()['startsWith'](_0x20e6ba)){toComplete=_0x46e7ec[0x1][_0x537a23(0x1b2)]();return;}}for(let _0x23dcfc=0x0;_0x23dcfc<possibleWords['length'];_0x23dcfc++){const _0x114f0b=possibleWords[_0x23dcfc];if(_0x114f0b[_0x537a23(0x19e)](_0x20e6ba)){toComplete=_0x114f0b;return;}}}function setup(){createCanvas(0x2bc,0x1f4),frameRate(0x3c),shuffle(phrases,!![]),target_phrase=phrases[current_trial],drawUserIDScreen();}function draw(){draw_finger_arm&&(background(0xff),noCursor(),drawArmAndWatch(),writeTargetAndEntered(),drawACCEPT(),drawPredictedWord(),stroke(0x0,0xff,0x0),noFill(),rect(width/0x2-0x2*PPCM,height/0x2-0x1*PPCM,0x4*PPCM,0x3*PPCM),draw2Dkeyboard(),drawFatFinger());}function draw2Dkeyboard(){const _0x9339e0=_0x3b63;textFont(_0x9339e0(0x1a3),0x18-display_size/0x6),fill(0x0),text('_',width/0x2-1.6*PPCM,height/0x2-0.5*PPCM),image(erase,width/0x2-PPCM,height/0x2-0.5*PPCM-0x5,0x14,0x14),text('abc',width/0x2,height/0x2-0.5*PPCM),text(_0x9339e0(0x18f),width/0x2+1.3*PPCM,height/0x2-0.5*PPCM),text(_0x9339e0(0x18e),width/0x2-1.3*PPCM,height/0x2+0.5*PPCM),text(_0x9339e0(0x1c8),width/0x2,height/0x2+0.5*PPCM),text(_0x9339e0(0x1c1),width/0x2+1.3*PPCM,height/0x2+0.5*PPCM),text('pqrs',width/0x2-1.3*PPCM,height/0x2+1.5*PPCM),text(_0x9339e0(0x1b5),width/0x2,height/0x2+1.5*PPCM),text(_0x9339e0(0x197),width/0x2+1.3*PPCM,height/0x2+1.5*PPCM),noFill(),imageMode(CORNER);}function drawPredictedWord(){const _0x263e2a=_0x3b63;noStroke(),fill(0xff),rect(width/0x2-0x2*PPCM,height/0x2-0x2*PPCM,0x4*PPCM,0x1*PPCM),textAlign(CENTER),textFont(_0x263e2a(0x1a3),0x10),fill(0x0);if(current_letter==-0x1)textFont(_0x263e2a(0x1a3),0xc),text(_0x263e2a(0x18a),width/0x2,height/0x2-1.3*PPCM);else text(toComplete,width/0x2,height/0x2-1.3*PPCM);}function complete(){const _0x46a784=_0x3b63;currently_typed=currently_typed[_0x46a784(0x195)](0x0,currently_typed['length']-0x1),getFirstMatch(currently_typed);let _0x5e643f=currently_typed[_0x46a784(0x1ab)]('\x20'),_0x35fea2='';for(let _0x1923de=0x0;_0x1923de<_0x5e643f[_0x46a784(0x1b3)]-0x1;_0x1923de++){_0x35fea2+=_0x5e643f[_0x1923de]+'\x20';}currently_typed=_0x35fea2+toComplete+'\x20',getFirstMatch(currently_typed);}function mouseReleased(){if(clickedY!=0x0&&clickedY>mouseY+0x14)complete();}function mousePressed(){const _0x41f93c=_0x3b63;time=millis();if(draw_finger_arm){if(mouseClickWithin(width/0x2-0x2*PPCM,height/0x2-0x1*PPCM,0x4*PPCM,0x3*PPCM)){clickedX=mouseX,clickedY=mouseY;if(mouseClickWithin(width/0x2-0x2*PPCM,height/0x2-0x1*PPCM,0x2*PPCM/0x3,0x3*PPCM/0x3))current_letter='_',currently_typed+='\x20';else{if(mouseClickWithin(width/0x2-1.5*PPCM,height/0x2-0x1*PPCM,0x2*PPCM/0x3,0x3*PPCM/0x3))current_letter=0x0,currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,'');else{if(mouseClickWithin(width/0x2-0x2*PPCM+0x4*PPCM/0x3,height/0x2-0x1*PPCM,0x4*PPCM/0x3,0x3*PPCM/0x3)){time-lastTime>0x258&&(current_letter=='a'||current_letter=='b'||current_letter=='c')&&(current_letter=0x0);switch(current_letter){case'a':current_letter='b',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'b':current_letter='c',currently_typed=currently_typed['replace'](/.$/,current_letter);break;case'c':current_letter='a',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;default:current_letter='a',currently_typed+=current_letter;break;}}else{if(mouseClickWithin(width/0x2-0x2*PPCM+0x4*PPCM*0x2/0x3,height/0x2-0x1*PPCM,0x4*PPCM/0x3,0x3*PPCM/0x3)){if(time-lastTime>0x258&&(current_letter=='d'||current_letter=='e'||current_letter=='f'))current_letter=0x0;switch(current_letter){case'd':current_letter='e',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'e':current_letter='f',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'f':current_letter='d',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;default:current_letter='d',currently_typed+=current_letter;break;}}else{if(mouseClickWithin(width/0x2-0x2*PPCM,height/0x2-0x1*PPCM+0x3*PPCM/0x3,0x4*PPCM/0x3,0x3*PPCM/0x3)){if(time-lastTime>0x258&&(current_letter=='g'||current_letter=='h'||current_letter=='i'))current_letter=0x0;switch(current_letter){case'g':current_letter='h',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'h':current_letter='i',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'i':current_letter='g',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;default:current_letter='g',currently_typed+=current_letter;break;}}else{if(mouseClickWithin(width/0x2-0x2*PPCM+0x4*PPCM/0x3,height/0x2-0x1*PPCM+0x3*PPCM/0x3,0x4*PPCM/0x3,0x3*PPCM/0x3)){if(time-lastTime>0x258&&(current_letter=='j'||current_letter=='k'||current_letter=='l'))current_letter=0x0;switch(current_letter){case'j':current_letter='k',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'k':current_letter='l',currently_typed=currently_typed['replace'](/.$/,current_letter);break;case'l':current_letter='j',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;default:current_letter='j',currently_typed+=current_letter;break;}}else{if(mouseClickWithin(width/0x2-0x2*PPCM+0x4*PPCM*0x2/0x3,height/0x2-0x1*PPCM+0x3*PPCM/0x3,0x4*PPCM/0x3,0x3*PPCM/0x3)){if(time-lastTime>0x258&&(current_letter=='m'||current_letter=='n'||current_letter=='o'))current_letter=0x0;switch(current_letter){case'm':current_letter='n',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'n':current_letter='o',currently_typed=currently_typed['replace'](/.$/,current_letter);break;case'o':current_letter='m',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;default:current_letter='m',currently_typed+=current_letter;break;}}else{if(mouseClickWithin(width/0x2-0x2*PPCM,height/0x2-0x1*PPCM+0x3*PPCM*0x2/0x3,0x4*PPCM/0x3,0x3*PPCM/0x3)){if(time-lastTime>0x258&&(current_letter=='p'||current_letter=='q'||current_letter=='r'||current_letter=='s'))current_letter=0x0;switch(current_letter){case'p':current_letter='q',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'q':current_letter='r',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'r':current_letter='s',currently_typed=currently_typed['replace'](/.$/,current_letter);break;case's':current_letter='p',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;default:current_letter='p',currently_typed+=current_letter;break;}}else{if(mouseClickWithin(width/0x2-0x2*PPCM+0x4*PPCM/0x3,height/0x2-0x1*PPCM+0x3*PPCM*0x2/0x3,0x4*PPCM/0x3,0x3*PPCM/0x3)){if(time-lastTime>0x258&&(current_letter=='t'||current_letter=='u'||current_letter=='v'))current_letter=0x0;switch(current_letter){case't':current_letter='u',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'u':current_letter='v',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'v':current_letter='t',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;default:current_letter='t',currently_typed+=current_letter;break;}}else{if(mouseClickWithin(width/0x2-0x2*PPCM+0x4*PPCM*0x2/0x3,height/0x2-0x1*PPCM+0x3*PPCM*0x2/0x3,0x4*PPCM/0x3,0x3*PPCM/0x3)){if(time-lastTime>0x258&&(current_letter=='w'||current_letter=='x'||current_letter=='y'||current_letter=='z'))current_letter=0x0;switch(current_letter){case'w':current_letter='x',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'x':current_letter='y',currently_typed=currently_typed['replace'](/.$/,current_letter);break;case'y':current_letter='z',currently_typed=currently_typed[_0x41f93c(0x18c)](/.$/,current_letter);break;case'z':current_letter='w',currently_typed=currently_typed['replace'](/.$/,current_letter);break;default:current_letter='w',currently_typed+=current_letter;break;}}}}}}}}}}}}else mouseClickWithin(width/0x2-0x2*PPCM,height/0x2-5.1*PPCM,0x4*PPCM,0x2*PPCM)?(clickedX=mouseX,clickedY=mouseY,letters_expected+=target_phrase[_0x41f93c(0x1bd)]()[_0x41f93c(0x1b3)],letters_entered+=currently_typed['trim']()[_0x41f93c(0x1b3)],errors+=computeLevenshteinDistance(currently_typed[_0x41f93c(0x1bd)](),target_phrase['trim']()),entered[current_trial]=currently_typed,trial_end_time=millis(),current_trial++,current_trial<0x2?(currently_typed='',target_phrase=phrases[current_trial]):(draw_finger_arm=![],attempt_end_time=millis(),printAndSavePerformance(),attempt++,attempt<0x2&&(second_attempt_button=createButton(_0x41f93c(0x1ae)),second_attempt_button[_0x41f93c(0x1a4)](startSecondAttempt),second_attempt_button[_0x41f93c(0x1ba)](width/0x2-second_attempt_button['size']()[_0x41f93c(0x1c7)]/0x2,height/0x2+0xfa)))):(clickedX=0x0,clickedY=0x0);}getFirstMatch(currently_typed),lastTime=time;}function startSecondAttempt(){shuffle(phrases,!![]),current_trial=0x0,target_phrase=phrases[current_trial],letters_expected=0x0,letters_entered=0x0,errors=0x0,currently_typed='',CPS=0x0,current_letter=-0x1,second_attempt_button['remove'](),draw_finger_arm=!![],attempt_start_time=millis();}function thank(){const _0x3f1d37=_0x3b63;let _0x3cdd83=comments_input['value']();submit_button[_0x3f1d37(0x1ca)](),comments_input['remove'](),text(_0x3f1d37(0x1b4),width/0x2,0x384);let _0x19ba17=color(0x0,0x0,0x0);fill(_0x19ba17),noStroke(),ellipse(width/0x2,0x320,width,0x28,0x1);let _0x45a79b=database[_0x3f1d37(0x18b)](_0x3f1d37(0x1b8));_0x45a79b[_0x3f1d37(0x19a)](_0x3cdd83);}function printAndSavePerformance(){const _0x37a552=_0x3b63;let _0x38e66d=(attempt_end_time-attempt_start_time)/0xea60,_0x5a2797=letters_entered/0x5/_0x38e66d,_0x18f24f=letters_expected*0.05,_0x2edc0f=max(0x0,(errors-_0x18f24f)/_0x38e66d),_0x4cd215=max(_0x5a2797-_0x2edc0f,0x0),_0x4fa4b6=day()+'/'+month()+'/'+year()+'\x20\x20'+hour()+':'+minute()+':'+second(),_0x36a096=letters_entered/_0x38e66d;background(color(0x0,0x0,0x0)),cursor(),textFont(_0x37a552(0x1a3),0x10),fill(color(0xff,0xff,0xff)),text(_0x4fa4b6,0x64,0x14),text('Finished\x20attempt\x20'+(attempt+0x1)+_0x37a552(0x1c0),width/0x2,height/0x2);let _0x25c816=0x14;for(i=0x0;i<0x2;i++,_0x25c816+=0x28){text(_0x37a552(0x1a9)+(i+0x1)+':\x20'+phrases[i],width/0x2,height/0x2+_0x25c816),text('User\x20typed\x20'+(i+0x1)+':\x20'+entered[i],width/0x2,height/0x2+_0x25c816+0x14);}text(_0x37a552(0x196)+_0x5a2797[_0x37a552(0x1a0)](0x2),width/0x2,height/0x2+_0x25c816+0x14),text(_0x37a552(0x192)+_0x18f24f[_0x37a552(0x1a0)](0x2),width/0x2,height/0x2+_0x25c816+0x28),text('Penalty:\x20'+_0x2edc0f[_0x37a552(0x1a0)](0x2),width/0x2,height/0x2+_0x25c816+0x3c),text(_0x37a552(0x19c)+_0x4cd215[_0x37a552(0x1a0)](0x2),width/0x2,height/0x2+_0x25c816+0x50),text(_0x37a552(0x198)+_0x36a096[_0x37a552(0x1a0)](0x2),width/0x2,height/0x2+_0x25c816+0x64);attempt>0x0&&(text(_0x37a552(0x19b),width/0x2,0x320),comments_input=createInput(''),comments_input[_0x37a552(0x1ba)](width/0x2-0xc8,0x33e),comments_input[_0x37a552(0x1be)](0x190,0x1e),submit_button=createButton(_0x37a552(0x1b0)),submit_button['position'](width/0x2-submit_button[_0x37a552(0x1c7)]/0x2,0x384),submit_button[_0x37a552(0x1a4)](thank));let _0x5154ac={'project_from':GROUP_NUMBER,'assessed_by':student_ID,'attempt_completed_by':_0x4fa4b6,'attempt':attempt,'attempt_duration':_0x38e66d,'raw_wpm':_0x5a2797,'freebie_errors':_0x18f24f,'penalty':_0x2edc0f,'wpm_w_penalty':_0x4cd215,'cps':_0x36a096};if(BAKE_OFF_DAY){attempt===0x0&&(firebase[_0x37a552(0x1c3)](_0x5d29b5),database=firebase['database']());let _0x3facaa=database[_0x37a552(0x18b)]('G'+GROUP_NUMBER);_0x3facaa[_0x37a552(0x19a)](_0x5154ac);}else{var _0x5d29b5={'apiKey':_0x37a552(0x1af),'authDomain':_0x37a552(0x1b6),'databaseURL':_0x37a552(0x18d),'storageBucket':'bakeoff3-1c7b1.appspot.com'};attempt===0x0&&(firebase[_0x37a552(0x1c3)](_0x5d29b5),database=firebase[_0x37a552(0x1a8)]());let _0x141f0d=database['ref'](_0x37a552(0x1bf));_0x141f0d[_0x37a552(0x19a)](_0x5154ac);var _0x4b3440=firebase['database']()[_0x37a552(0x18b)](_0x37a552(0x1bf))[_0x37a552(0x191)](_0x37a552(0x19d))['limitToLast'](0xa);textFont(_0x37a552(0x1a3),0x12),text(_0x37a552(0x1a6),width/0x2,0xa5);var _0x1b11b9=0x19,_0x46f9cc=0xa;_0x4b3440['on'](_0x37a552(0x1c6),_0x5a3bd3=>{_0x5a3bd3['forEach'](_0x3c2d1d=>{const _0x2aa915=_0x3b63;var _0x5c96d8=_0x3c2d1d['val']()['assessed_by'],_0x1f9296=_0x3c2d1d[_0x2aa915(0x1a2)]()['wpm_w_penalty'];text(_0x46f9cc+_0x2aa915(0x194)+_0x5c96d8+_0x2aa915(0x1b9)+_0x1f9296[_0x2aa915(0x1a0)](0x4)+_0x2aa915(0x1c2),width/0x2,0x1e0-_0x1b11b9),_0x46f9cc-=0x1,_0x1b11b9+=0x1c;});});}}function windowResized(){const _0x3d53cc=_0x3b63;resizeCanvas(windowWidth,windowHeight);let _0x29963e=new Display({'diagonal':display_size},window[_0x3d53cc(0x1c9)]);PPI=_0x29963e[_0x3d53cc(0x1ac)],PPCM=PPI/2.54,FINGER_SIZE=int(0xb*PPCM),FINGER_OFFSET=int(0.8*PPCM),ARM_LENGTH=int(0x13*PPCM),ARM_HEIGHT=int(11.2*PPCM),ARROW_SIZE=int(2.2*PPCM),draw_finger_arm=!![],attempt_start_time=millis();}