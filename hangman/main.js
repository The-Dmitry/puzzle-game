(()=>{"use strict";class e{constructor(e){this.node=this.createNode(e)}getNode(){return this.node}createNode(e){return this.node=document.createElement(e.tag),this.setClassNames(e.css),this.setTextContent(e.text),this.setId(e.id),e.callback&&this.setCallback(e.callback),e.href&&this.setHref(e.href),this.node}setHref(e){this.node.href=e}setClassNames(e){e&&(this.node.className="",this.node.classList.add(...e))}addClassName(e){e&&this.node.classList.add(e)}removeCLassName(e){e&&this.node.classList.remove(e)}setTextContent(e){e&&(this.node.textContent=e)}setCallback(e,t="click"){this.node.addEventListener(t,e)}setId(e){e&&(this.node.id=e)}setAttribute(e,t){this.node.setAttribute(e,t)}addInnerNode(...t){t.forEach((t=>{t instanceof e?this.node.append(t.getNode()):this.node.append(t)}))}prependInnerNode(...t){t.forEach((t=>{t instanceof e?this.node.prepend(t.getNode()):this.node.prepend(t)}))}removeAllChildren(){for(;this.node.firstChild;)this.node.removeChild(this.node.firstChild)}removeNode(){this.node.remove()}}class t{modal=null;constructor(t){this.viewNode=new e(t)}getElement(){return this.viewNode.getNode()}addViewInside(...e){e.forEach((e=>this.viewNode.addInnerNode(e.getElement())))}showModal(t){const s=new e({tag:"div",css:["modal"]});s.addInnerNode(...t),this.modal=s,setTimeout((()=>{document.body.append(this.modal.getNode())}),1e3)}closeModal(){this.modal&&this.modal.getNode().remove()}blockView(e){e?this.viewNode.addClassName("blocked"):this.viewNode.removeCLassName("blocked")}}const s=["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];class i extends t{constructor(e,t){super({tag:"button",css:["keyboard__button"],text:e,callback:()=>{this.setResultStyle(t(e))}})}setResultStyle(e){this.viewNode.addClassName(e?"keyboard__button_correct":"keyboard__button_incorrect"),this.viewNode.getNode().disabled=!0}resetButton(){this.viewNode.setClassNames(["keyboard__button"]),this.viewNode.getNode().disabled=!1}}class a extends t{buttonList=new Map;isPlaying=!0;constructor(e){super({tag:"div",css:["keyboard"]}),this.configureView(e),window.addEventListener("keydown",(t=>{if(!this.isPlaying)return;if(!s.includes(t.code.at(-1)))return;const i=e(t.code.at(-1));this.buttonList.get(t.code.at(-1)).setResultStyle(i)}))}configureView(e){s.forEach((t=>{const s=new i(t,e);this.buttonList.set(t,s)})),this.addViewInside(...this.buttonList.values())}resetKeyboard(){this.buttonList.forEach((e=>e.resetButton()))}blockKeyboard(e){this.isPlaying=e}}const o=[{id:1,q:"What is the capital of France?",a:"Paris"},{id:2,q:"What is the name of the liquid that makes up about 60% of the human body?",a:"Water"},{id:3,q:"What is the name of the planet closest to the sun?",a:"Mercury"},{id:4,q:"What is the name of the sport that involves kicking a ball into a net?",a:"Soccer"},{id:5,q:"What is the name of the musical instrument that is played with a bow?",a:"Violin"},{id:6,q:'What is the name of the chemical element that is represented by the symbol "Fe"?',a:"Iron"},{id:7,q:"What is the name of the part of the body that is responsible for breaking down food?",a:"Stomach"},{id:8,q:"What is the name of the process by which plants and animals reproduce?",a:"Reproduction"},{id:9,q:"What is the name of the chemical element that is used to make aluminum cans?",a:"Aluminium"},{id:10,q:"What is the name of the musical genre that originated in the United States and features improvisation and soulful vocals?",a:"Jazz"},{id:11,q:"Animal with a long neck",a:"Giraffe"},{id:12,q:"Small bird that can mimic human speech",a:"Parrot"},{id:13,q:"Tool used to cut things",a:"Knife"},{id:14,q:"Sport played on ice",a:"Hockey"},{id:15,q:"Musical instrument with strings",a:"Guitar"},{id:16,q:"Type of animal that can change its color",a:"Chameleon"},{id:17,q:"Sport played with a ball and racket",a:"Tennis"},{id:18,q:"Type of cheese that is often grated",a:"Parmesan"},{id:19,q:"Type of clothing that covers the legs",a:"Pants"},{id:20,q:"Type of bird that can swim underwater",a:"Penguin"},{id:21,q:"Type of rock that is often used in jewelry",a:"Diamond"},{id:22,q:"Type of food that is often served at picnics",a:"Sandwich"},{id:23,q:"Type of sport that involves hitting a ball with a bat",a:"Baseball"},{id:24,q:"Type of animal that can survive in dry environments",a:"Camel"},{id:25,q:"Type of computer input device that uses a laser pointer",a:"Mouse"},{id:26,q:"Type of computer output device that displays images and text on a screen",a:"Monitor"},{id:27,q:"Type of animal that can run fast",a:"Cheetah"},{id:28,q:"Type of weather phenomenon that is characterized by strong winds and heavy rain",a:"Hurricane"},{id:29,q:"Type of insect that can make honey",a:"Bee"},{id:30,q:"Type of musical instrument that is played by tapping keys",a:"Piano"},{id:31,q:"Type of plant that can grow in deserts",a:"Cactus"},{id:32,q:"What is the national animal of Australia?",a:"Kangaroo"},{id:33,q:"What is the capital of Spain?",a:"Madrid"},{id:34,q:"What is the largest continent in the world?",a:"Asia"}],n={1:"gallows__head",2:"gallows__body",3:"gallows__left-arm",4:"gallows__right-arm",5:"gallows__left-leg",6:"gallows__right-leg"};class h extends t{mistakes=0;constructor(){super({tag:"div",css:["gallows-container"]}),this.configureView()}configureView(){this.gallows=new e({tag:"div",css:["gallows"]}),this.viewNode.addInnerNode(this.gallows)}setBodyParts(t){t?this.gallows.addInnerNode(new e({tag:"div",css:[n[t]]})):this.gallows.removeAllChildren()}resetGallows(){this.mistakes=0}}const d="Incorrect guesses: ";class r extends t{constructor(){super({tag:"div",css:["info"]}),this.configureView()}configureView(){this.secretWord=new e({tag:"p",css:["info__secret-word"]}),this.question=new e({tag:"p",css:["info__question"]}),this.correctAnswers=new e({tag:"p",text:`${d}0 / 6`}),this.viewNode.addInnerNode(this.correctAnswers,this.question,this.secretWord)}updateData(e,t,s){const i=e.split("").map((e=>t.includes(e.toUpperCase())?e:"_")).join("");return this.secretWord.setTextContent(i),s&&this.question.setTextContent(`Hint: ${s}`),!i.includes("_")}updateGuesses(e){this.correctAnswers.setTextContent(`${d}${e} / 6`)}}class l extends t{quiz=[];correctChars=[];qNumber=0;MAX_MISTAKES=6;mistakes=0;constructor(){super({tag:"div",css:["main"]}),this.shuffleArray(o),this.keyboard=new a(this.checkChar.bind(this)),this.gallows=new h,this.infoView=new r,this.configureView()}configureView(){this.addViewInside(this.gallows,this.infoView,this.keyboard),this.startNewGame()}shuffleArray(e){this.quiz=e.sort((()=>.5-Math.random()))}checkChar(e){const t=this.quiz[this.qNumber].a.toLowerCase().includes(e.toLowerCase());return t?(this.correctChars.push(e),this.infoView.updateData(this.quiz[this.qNumber].a,this.correctChars)&&this.showWin()):this.updateMistakes(),t}updateMistakes(){this.mistakes+=1,this.gallows.setBodyParts(this.mistakes),this.infoView.updateGuesses(this.mistakes),this.mistakes>=this.MAX_MISTAKES&&this.showGameOver()}showGameOver(){const e=this.createModal("GAME OVER");this.blockAllView(!0),this.showModal(e)}showWin(){const e=this.createModal("You did it!");this.blockAllView(!0),this.showModal(e)}show;resetGame(){this.mistakes=0,this.correctChars=[]}startNewGame(){this.resetGame(),this.qNumber+=1,this.qNumber>=o.length&&(this.qNumber=0),this.gallows.setBodyParts(0),this.keyboard.resetKeyboard(),this.infoView.updateData(this.quiz[this.qNumber].a,this.correctChars,this.quiz[this.qNumber].q),this.infoView.updateGuesses(0)}blockAllView(e){[this.keyboard,this.gallows,this.infoView].forEach((t=>t.blockView(e))),this.keyboard.blockKeyboard(!e)}createModal(t){return[new e({tag:"p",text:`${t}`}),new e({tag:"p",text:`The correct word is ${this.quiz[this.qNumber].a.toUpperCase()}`}),new e({tag:"button",css:["play-again"],text:"Play again",callback:()=>{this.closeModal(),this.startNewGame(),this.blockAllView(!1)}})]}}new class{constructor(){this.main=new l,this.startApp()}startApp(){document.body.append(this.main.getElement())}}})();