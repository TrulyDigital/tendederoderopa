/**
 * 
 * @description
 * 
 * Estado que se quiere gestionar
 * 
 */
type ProductSliderStateType = {
  sliderIndex: number;
  sliderLength: number;
}

/**
 * 
 * @description
 * 
 * Componentes que se esperan obtener para este script
 * 
 */

type ProductSliderComponentsType = {
  idProductSliderContainer: HTMLDivElement;
  idSliderInner: HTMLDivElement;
  idPrevButton: HTMLButtonElement;
  idNextButton: HTMLButtonElement;
  imageSlideList: NodeListOf<HTMLDivElement>;
  dotSliderList: NodeListOf<HTMLDivElement>;
}

class ProductSliderComponents{

  private totalComponents: number;
  private idProductSliderContainer: HTMLDivElement;
  private idSliderInner: HTMLDivElement;
  private idPrevButton: HTMLButtonElement;
  private idNextButton: HTMLButtonElement;
  private imageSlideList: NodeListOf<HTMLDivElement>;
  private dotSliderList: NodeListOf<HTMLDivElement>;

  constructor(){
    this.totalComponents = 0;
    this.idProductSliderContainer = document.createElement('div');
    this.idSliderInner = document.createElement('div');
    this.idPrevButton = document.createElement('button');
    this.idNextButton = document.createElement('button');
    this.imageSlideList = [] as unknown as NodeListOf<HTMLDivElement>;
    this.dotSliderList = [] as unknown as NodeListOf<HTMLDivElement>;
  }

  setIdProductSliderContaner(
    idProductSliderContainer: HTMLDivElement,
  ): void{
    this.totalComponents = this.totalComponents + 1;
    this.idProductSliderContainer = idProductSliderContainer;
  }

  setIdSliderInner(
    idSliderInner: HTMLDivElement,
  ): void{
    this.totalComponents = this.totalComponents + 1;
    this.idSliderInner = idSliderInner;
  }

  setIdPrevButton(
    idPrevButton: HTMLButtonElement,
  ): void{
    this.totalComponents = this.totalComponents + 1;
    this.idPrevButton = idPrevButton;
  }

  setIdNextButton(
    idNextButton: HTMLButtonElement,
  ): void{
    this.totalComponents = this.totalComponents + 1;
    this.idNextButton = idNextButton;
  }

  setImageSlideList(
    imageSlideList: NodeListOf<HTMLDivElement>,
  ): void{
    this.totalComponents = this.totalComponents + 1;
    this.imageSlideList = imageSlideList;
  }

  setDotSliderList(
    dotSliderList: NodeListOf<HTMLDivElement>,
  ): void{
    this.totalComponents = this.totalComponents + 1;
    this.dotSliderList = dotSliderList;
  }

  getTotalComponents(): number{
    return this.totalComponents;
  }

  getComponents(): ProductSliderComponentsType{
    return {
      idProductSliderContainer: this.idProductSliderContainer,
      idSliderInner: this.idSliderInner,
      idPrevButton: this.idPrevButton,
      idNextButton: this.idNextButton,
      imageSlideList: this.imageSlideList,
      dotSliderList: this.dotSliderList,
    }
  }
}


/**
 * 
 * @description
 * 
 * Interfaz del Observer:
 * Cada componente que quiera observar el estado debe implementarla
 * 
 */
interface ProductSliderObserver {
  update(state: ProductSliderStateType): void;
}


/**
 * 
 * @description
 * 
 * Clase que gestiona el estado y notifica a los observadores cuando
 * hay algún cambio
 * 
 */
class ProductSliderSubject{

  private observers: ProductSliderObserver[];
  private state: ProductSliderStateType;

  constructor(sliderLength: number){
    this.observers = [];
    this.state = {
      sliderIndex: 0,
      sliderLength: sliderLength,
    };
  }

  // subscribir a un observador
  attach(observer: ProductSliderObserver): void{
    this.observers.push(observer);
  }

  // notificar a los observadores cuando cambie el estado
  notify(): void{
    this.observers.forEach(observer => observer.update(this.state));
  }

  // modificar el estado y notificar a los observadores
  increment(): void{
    if(this.state.sliderIndex < (this.state.sliderLength - 1)){
      const sliderIndex: number = this.state.sliderIndex + 1;
      this.state = {...this.state, sliderIndex};
      this.notify();
    }
  }

  // modificar el estado y notificar a los observadores
  decrement(): void{
    if(this.state.sliderIndex > 0){
      const sliderIndex: number = this.state.sliderIndex - 1;
      this.state = {...this.state, sliderIndex};
      this.notify();
    }
  }

  // obtener el estado
  getState(): ProductSliderStateType{
    return this.state;
  }
}


/**
 * 
 * @description
 * 
 * Clase que gestiona la lógica del componente
 * 
 */
class NextButton implements ProductSliderObserver{

  private state: ProductSliderStateType;
  private idNextButton: HTMLButtonElement;

  constructor(
    state: ProductSliderStateType,
    idNextButton: HTMLButtonElement,
  ){
    this.state = state;
    this.idNextButton = idNextButton;
  }

  update(state: ProductSliderStateType): void {
    this.state = state;
    console.log(`idNextButton: He recibido el nuevo estado: ${this.state.sliderIndex}`);
    if(this.state.sliderIndex === (this.state.sliderLength - 1)){
      this.disableButton();
    }
    else{
      this.enableButton();
    }
  }

  enableButton(): void{
    this.idNextButton.classList.remove('_slide_button_disable');
    this.idNextButton.classList.add('_slide_button_enable');
    this.idNextButton.disabled = false;
  }

  disableButton(): void{
    this.idNextButton.classList.remove('_slide_button_enable');
    this.idNextButton.classList.add('_slide_button_disable');
    this.idNextButton.disabled = true;
  }
}


/**
 * 
 * @description
 * 
 * Clase que gestiona la lógica del componente
 * 
 */
class PrevButton implements ProductSliderObserver{

  private state: ProductSliderStateType;
  private idPrevButton: HTMLButtonElement;

  constructor(
    state: ProductSliderStateType,
    idNextButton: HTMLButtonElement,
  ){
    this.state = state;
    this.idPrevButton = idNextButton;
  }

  update(state: ProductSliderStateType): void {
    this.state = state;
    console.log(`idPrevButton: He recibido el nuevo estado: ${this.state.sliderIndex}`);
  }
}


/**
 * 
 * @description
 * 
 * Clase que inicia el script del componente
 * 
 */
class InitProductSlider {

  private components: ProductSliderComponentsType;
  private productSliderSubject: ProductSliderSubject;
  private nextButton: NextButton;
  private prevButton: PrevButton;

  constructor(
    components: ProductSliderComponentsType,
  ){

    // components
    this.components = components;

    // state
    this.productSliderSubject = new ProductSliderSubject(
      this.components.imageSlideList.length,
    );

    // NextButton
    this.nextButton = new NextButton(
      this.productSliderSubject.getState(),
      this.components.idNextButton,
    );

    // PrevButton
    this.prevButton = new PrevButton(
      this.productSliderSubject.getState(),
      this.components.idPrevButton,
    );
  }

  getComponents(): ProductSliderComponentsType{
    return this.components;
  }

  getProductSliderSubject(): ProductSliderSubject{
    return this.productSliderSubject;
  }

  getNextButton(): NextButton{
    return this.nextButton;
  }

  getPrevButton(): PrevButton{
    return this.prevButton;
  }
}


/**
 * 
 * @description
 * 
 * Inicio del script cuando carga el documento html
 * 
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // html components
  const idProductSliderContainer: HTMLElement | null = document.getElementById('idProductSliderContainer');
  const idSliderInner: HTMLElement | null = document.getElementById('idSliderInner');
  const idPrevButton: HTMLElement | null = document.getElementById('idPrevButton');
  const idNextButton: HTMLElement | null = document.getElementById('idNextButton');
  const imageSlideList: NodeListOf<HTMLDivElement> = document.querySelectorAll('._image_slide');
  const dotSliderList: NodeListOf<HTMLDivElement> = document.querySelectorAll('._dots_slider_container > div > div');

  // components
  const htmlComponents = new ProductSliderComponents();

  if(idProductSliderContainer !== null){
    htmlComponents.setIdProductSliderContaner(
      idProductSliderContainer as HTMLDivElement,
    );
  }

  if(idSliderInner !== null){
    htmlComponents.setIdSliderInner(
      idSliderInner as HTMLDivElement,
    );
  }

  if(idPrevButton !== null){
    htmlComponents.setIdPrevButton(
      idPrevButton as HTMLButtonElement,
    );
  }

  if(idNextButton !== null){
    htmlComponents.setIdNextButton(
      idNextButton as HTMLButtonElement,
    );
  }

  if(imageSlideList.length > 0){
    htmlComponents.setImageSlideList(
      imageSlideList,
    );
  }

  if(dotSliderList.length > 0){
    htmlComponents.setDotSliderList(
      dotSliderList,
    );
  }

  if(htmlComponents.getTotalComponents() === 6){

    const components: ProductSliderComponentsType = htmlComponents.getComponents();
    const initProductSlider = new InitProductSlider(components);
    const subject = initProductSlider.getProductSliderSubject();
    const nextButton = initProductSlider.getNextButton();
    const prevButton = initProductSlider.getPrevButton();
    subject.attach(nextButton);
    subject.attach(prevButton);

    components.idNextButton.addEventListener('click', () => subject.increment());
    components.idPrevButton.addEventListener('click', () => subject.decrement());
  }

});
