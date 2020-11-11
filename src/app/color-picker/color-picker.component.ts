import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input() colorOptions: string[];
  @Input() initialColor: string;
  selectedColor : string;
  styleColor : string="";
  setBackground:string = "";


  ngOnInit(): void {
    //get lightpink color hex code and put it into array colorOptions
    let indexColor = this.colorOptions.findIndex(a=>a == "lightpink");
    this.colorOptions[indexColor] = "#FFB6C1";

    //set initial background into canva 
    this.setBackground = JSON.parse("{\"background-color\":\""+this.initialColor+"\"}");
  }

  selectColor(event){
    this.styleColor = JSON.parse(JSON.stringify(event.target.attributes.style.textContent));
    this.setColor();
  }

  /**Set background color object to canva ngStyle propierty */
  setColor(){
    
    //get rgb elements and put it into an array
    let rgbElements = this.styleColor
                    .replace("background-color: rgb(","")
                    .replace(");","")
                    .split(",");    
    
    let hexColor = this.setHexColor(rgbElements[0],rgbElements[1],rgbElements[2]);

    this.setBackground = JSON.parse("{\"background-color\":\"#"+hexColor+"\"}");
    this.selectedColor = "#"+hexColor;
    
  }

  /**build hex code from rgb elements */
  setHexColor(r,g,b){

    let redElement = this.rgbToHex(r);
    let greenElement = this.rgbToHex(g);
    let blueElement = this.rgbToHex(b);
    
    return redElement+greenElement+blueElement;
  }

  /**Get hex code from rgb element */
  rgbToHex(rgbCode) { 
    
    let hexCode = Number(rgbCode).toString(16);
    
    hexCode = (hexCode.length < 2)? "0" + hexCode: hexCode;
    return hexCode;
  };

}
