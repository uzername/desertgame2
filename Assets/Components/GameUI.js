import * as RE from 'rogue-engine';

export default class GameUI extends RE.Component {
	
		startGame() {
			RE.App.loadScene("FirstScene");
	    }
		createStartGameUI() {
	if (this.startGameUI) {
      if (this.startGameUI.style.display === "none")
        this.startGameUI.style.display = "flex";

      return this.startGameUI
    }

    this.startGameUI = document.createElement("div");
    this.startGameUI.style.marginLeft = "25%";
    this.startGameUI.style.textAlign = "center";
    this.startGameUI.style.height = "100%";
    this.startGameUI.style.display = "flex";
    this.startGameUI.style.flexDirection = "column";
    this.startGameUI.style.justifyContent = "center";
/*
    const gameTitle = document.createElement("h1");
    gameTitle.textContent = "Rogue Space Shooter";
    gameTitle.style.color = "crimson";
*/
    const playBtn = document.createElement("h2");
    playBtn.style.cursor = "pointer";
    playBtn.style.color = "red";
    playBtn.style.position = "relative";
    playBtn.textContent = "Start Journey!";
	playBtn.style.fontFamily = "monospace";
	playBtn.style.fontWeight = "bold";

    playBtn.onclick = () => {
      this.startGameUI.style.display = "none";
	  console.log("Start now");
      this.startGame();
    };
/*
    this.startGameUI.appendChild(gameTitle);
	*/
    this.startGameUI.appendChild(playBtn);

    this.uiContainer.appendChild(this.startGameUI);

    return this.startGameUI;
	}
	
	start () {
		this.uiContainer = document.getElementById("rogue-ui");
		this.createStartGameUI();
	}
	

}

RE.registerComponent(GameUI);