/**
 * 
 * 
 */
interface ObserverComponent{
  update(): void;
}

/**
 * 
 * 
 */
interface SubjectComponent{
  attach(component: ObserverComponent): void;
  detach(component: ObserverComponent): void;
  notify(): void;
}

/**
 * 
 * 
 */
enum SliderActionEnum{
  NONE = 'NONE',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
};

/**
 * 
 * 
 */
enum SliderPositionEnum{
  HEAD = 'HEAD',
  MIDDLE = 'MIDDLE',
  TAIL = 'TAIL',
};


/**
 * 
 * 
 */
type SliderStateVo = {
  action: SliderActionEnum,
  position: SliderPositionEnum,
  index: number;
};


/**
 * 
 * 
 */
class ProductSliderState implements SubjectComponent{
  
  private static instance: ProductSliderState;
  private observers: ObserverComponent[];
  private index: number;
  private length: number;
  private state: SliderStateVo;

  private constructor(
    length: number,
  ){
    this.index = 0;
    this.observers = [];
    this.length = length;
    this.state = {
      action: SliderActionEnum.NONE,
      position: SliderPositionEnum.HEAD,
      index: this.index,
    };
  }

  static get_instance(
    length: number,
  ): ProductSliderState{

    if(!ProductSliderState.instance){
      ProductSliderState.instance = new ProductSliderState(length);
    }

    return ProductSliderState.instance;
  }

  attach(component: ObserverComponent): void {
    this.observers.push(component);
  }

  detach(component: ObserverComponent): void {
    this.observers = this.observers.filter(obs => obs !== component);
  }

  notify(): void {
    this.observers.forEach(observer => observer.update());
  }

  set_state(
    action: SliderActionEnum,
  ): void{

    if(action === SliderActionEnum.INCREMENT){
      this.increment(action);
    }

    if(action === SliderActionEnum.DECREMENT){
      this.decrement(action);
    }

    this.notify();
  }

  private increment(
    action: SliderActionEnum,
  ): void{

    if(this.state.index === (this.length - 2)){
      this.state = {
        action: action,
        position: SliderPositionEnum.TAIL,
        index: this.state.index+1,
      };
    }

    if(this.state.index >= 0 && this.state.index < (this.length - 2)){
      this.state = {
        action: action,
        position: SliderPositionEnum.MIDDLE,
        index: this.state.index+1,
      };
    }
  }

  private decrement(
    action: SliderActionEnum,
  ): void{

    if(this.state.index === 1){
      this.state = {
        action: action,
        position: SliderPositionEnum.HEAD,
        index: this.state.index-1,
      };
    }

    if(this.state.index >= 2 && this.state.index <= (this.length-1)){
      this.state = {
        action: action,
        position: SliderPositionEnum.MIDDLE,
        index: this.state.index-1,
      }
    }
  }

  get_state(): SliderStateVo{
    return this.state;
  }
}

/**
 * 
 * 
 * 
 */
class SliderNextButton implements ObserverComponent{

  private static instance: SliderNextButton;
  private htmlButtonElement: HTMLButtonElement;
  private productSliderState: ProductSliderState;
  
  private constructor(
    htmlButtonElement: HTMLButtonElement,
    productSliderState: ProductSliderState,
  ){
    this.htmlButtonElement = htmlButtonElement;
    this.productSliderState = productSliderState;
    this.productSliderState.attach(this);
  }

  static get_instance(
    htmlButtonElement: HTMLButtonElement,
    productSliderState: ProductSliderState,
  ): SliderNextButton{

    if(!SliderNextButton.instance){
      SliderNextButton.instance = new SliderNextButton(
        htmlButtonElement,
        productSliderState,
      );
    }
    return SliderNextButton.instance;
  }

  get_button_element(): HTMLButtonElement{
    return this.htmlButtonElement;
  }

  update(): void {
    const state = this.productSliderState.get_state();
    console.log(state);

    if(state.position === SliderPositionEnum.TAIL){
      this.disableButton();
    }
    else{
      this.enableButton();
    }
  }

  handleClick(): void{
    this.productSliderState.set_state(SliderActionEnum.INCREMENT);
  }

  private disableButton(): void{
    this.htmlButtonElement.classList.remove('_slide_button_enable');
    this.htmlButtonElement.classList.add('_slide_button_disable');
    this.htmlButtonElement.disabled = true;
  }

  private enableButton(): void{
    this.htmlButtonElement.classList.remove('_slide_button_disable');
    this.htmlButtonElement.classList.add('_slide_button_enable');
    this.htmlButtonElement.disabled = false;
  }
}


/**
 * 
 * 
 * 
 */
class SliderPrevButton implements ObserverComponent{

  private static instance: SliderPrevButton;
  private htmlButtonElement: HTMLButtonElement;
  private productSliderState: ProductSliderState;
  
  private constructor(
    htmlButtonElement: HTMLButtonElement,
    productSliderState: ProductSliderState,
  ){
    this.htmlButtonElement = htmlButtonElement;
    this.productSliderState = productSliderState;
    this.productSliderState.attach(this);
  }

  static get_instance(
    htmlButtonElement: HTMLButtonElement,
    productSliderState: ProductSliderState,
  ): SliderPrevButton{

    if(!SliderPrevButton.instance){
      SliderPrevButton.instance = new SliderPrevButton(
        htmlButtonElement,
        productSliderState,
      );
    }
    return SliderPrevButton.instance;
  }

  get_button_element(): HTMLButtonElement{
    return this.htmlButtonElement;
  }

  update(): void {
    const state = this.productSliderState.get_state();
    console.log(state);
    
    if(state.position === SliderPositionEnum.HEAD){
      this.disableButton();
    }
    else{
      this.enableButton();
    }
  }

  handleClick(): void{
    this.productSliderState.set_state(SliderActionEnum.DECREMENT);
  }

  private disableButton(): void{
    this.htmlButtonElement.classList.remove('_slide_button_enable');
    this.htmlButtonElement.classList.add('_slide_button_disable');
    this.htmlButtonElement.disabled = true;
  }

  private enableButton(): void{
    this.htmlButtonElement.classList.remove('_slide_button_disable');
    this.htmlButtonElement.classList.add('_slide_button_enable');
    this.htmlButtonElement.disabled = false;
  }
}


/**
 * 
 * 
 * 
 */
class SliderDots implements ObserverComponent{

  private static instance: SliderDots;
  private sliderDotsList: NodeListOf<HTMLDivElement>;
  private productSliderState: ProductSliderState;

  constructor(
    sliderDotsList: NodeListOf<HTMLDivElement>,
    productSliderState: ProductSliderState,
  ){
    this.sliderDotsList = sliderDotsList;
    this.productSliderState = productSliderState;
    this.productSliderState.attach(this);
  }

  static get_instance(
    sliderDotsList: NodeListOf<HTMLDivElement>,
    productSliderState: ProductSliderState,
  ): SliderDots{
    
    if(!SliderDots.instance){
      SliderDots.instance = new SliderDots(
        sliderDotsList,
        productSliderState,
      );
    }

    return SliderDots.instance;
  }

  update(): void {
    
    const { action, position, index} = this.productSliderState.get_state();

    if(position === SliderPositionEnum.HEAD){
  
      const htmlDivElementCurrent = this.sliderDotsList[index];
      this.enableDot(htmlDivElementCurrent);

      const htmlDivElementPrev = this.sliderDotsList[index+1];
      this.disableDot(htmlDivElementPrev);

    }

    if(position === SliderPositionEnum.TAIL){

      const htmlDivElementCurrent = this.sliderDotsList[index];
      this.enableDot(htmlDivElementCurrent);

      const htmlDivElementPrev = this.sliderDotsList[index-1];
      this.disableDot(htmlDivElementPrev);

    }

    if(position === SliderPositionEnum.MIDDLE && action === SliderActionEnum.INCREMENT){

      const htmlDivElementCurrent = this.sliderDotsList[index];
      this.enableDot(htmlDivElementCurrent);

      const htmlDivElementPrev = this.sliderDotsList[index-1];
      this.disableDot(htmlDivElementPrev);

    }

    if(position === SliderPositionEnum.MIDDLE && action === SliderActionEnum.DECREMENT){

      const htmlDivElementCurrent = this.sliderDotsList[index];
      this.enableDot(htmlDivElementCurrent);

      const htmlDivElementPrev = this.sliderDotsList[index+1];
      this.disableDot(htmlDivElementPrev);

    }
  }

  private enableDot(
    htmlDivElement: HTMLDivElement,
  ): void{
    htmlDivElement.classList.remove('_dot_disable');
    htmlDivElement.classList.add('_dot_enable');
  }

  private disableDot(
    htmlDivElement: HTMLDivElement,
  ): void{
    htmlDivElement.classList.remove('_dot_enable');
    htmlDivElement.classList.add('_dot_disable');
  }
}

/**
 * 
 * @description
 * 
 * Iniciar el script cuando carga el documento html
 * 
 */
document.addEventListener('DOMContentLoaded', () => {

  // html components
  const idNextButton = document.getElementById('idNextButton');
  const idPrevButton = document.getElementById('idPrevButton');
  const dotsList = document.querySelectorAll('._dot') as NodeListOf<HTMLDivElement>;
  const imageSlideList = document.querySelectorAll('._image_slide');

  // state
  const productSliderState = ProductSliderState.get_instance(
    imageSlideList.length,
  );

  // next button observer
  if(idNextButton !== null){

    const sliderNextButton = SliderNextButton.get_instance(
      idNextButton as HTMLButtonElement,
      productSliderState,
    );

    sliderNextButton
      .get_button_element()
      .addEventListener('click', () => sliderNextButton.handleClick());
  }

  // prev button observer
  if(idPrevButton !== null){

    const sliderPrevButton = SliderPrevButton.get_instance(
      idPrevButton as HTMLButtonElement,
      productSliderState,
    );;

    sliderPrevButton
      .get_button_element()
      .addEventListener('click', () => sliderPrevButton.handleClick());
  }

  if(dotsList.length > 0){
    const sliderDots = SliderDots.get_instance(
      dotsList,
      productSliderState,
    );
  }

});