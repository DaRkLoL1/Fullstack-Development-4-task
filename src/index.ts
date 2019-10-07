import './index.scss';


export class MainModel  {
  private min : number;
  private max : number;
  private step : number;
  private handle : ModelHandle;


  constructor( {min = 0, max = 100, step = 1, handle = new ModelHandle()} = {}) {
    this.min = min;
    this.max = max;
    this.step = step;
    this.handle = handle;
  };

  getMin() : number {
    return this.min;
  }
  
  getMax() : number {
    return this.max;
  }

  getStep() : number {
    return this.step;
  }

  getValue() : number {
     return this.handle.getValue();
  }

  setValue(value : number) : void {
    this.handle.setValue({value: value, min: this.min, max : this.max});
  }

  increaseValue() : void {
    this.handle.increaseValue({max: this.max, step: this.step});
  }

  reduceValue() : void {
    this.handle.reduceValue({min: this.min, step: this.step});
  }
}


export class ModelHandle {
  constructor(private value : number = 0) {}

  getValue() : number {
    return this.value;
  }

  setValue(obj : {value : number, min: number, max: number}) : void {
    if(obj.value > obj.max) {
      this.value = obj.max;
    }
    else if(obj.value < obj.min) {
      this.value = obj.min;
    } else {
      this.value = obj.value;
    }
  }

  increaseValue(obj : {max: number, step: number}) : void {
    let count : number = this.value  + obj.step;

    if(count > obj.max) {
      this.value = obj.max;
    }
    else {
      this.value = count;
    } 
  }

  reduceValue(obj : {min: number, step: number}) : void {
    let count = this.value - obj.step;

    if(count < obj.min) {
      this.value = obj.min;
    } else {
      this.value = count;
    }
  }

}

export class View {
  private item : HTMLElement | null;
  private interval : number | undefined;

  constructor(item : HTMLElement | null) {
    this.item = item;
  }
  createSlider(obj : {min : number, max : number, step : number }) {
    if( this.item !== null) {

      $(this.item).html('<div class="slider"><div class="slider__field"></div></div>');
      this.interval = $(this.item).width();
      
      if(typeof this.interval !== 'undefined') {
        this.interval = this.interval / (obj.max - obj.min) * obj.step;
      }

    }

  }
}