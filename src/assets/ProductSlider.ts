/**
 * 
 * 
 */
enum productSliderComponentsEnum {
  idProductSliderContainer = 'idProductSliderContainer',
  idSliderInner = 'idSliderInner',
  idPrevButton = 'idPrevButton',
  idNextButton = 'idNextButton',
  _imageSlideList = '._image_slide',
  _dotSliderList = '._dot_slider',
}

/**
 * 
 * 
 */
function product_slider_components(): Map<string, HTMLElement | null>{

  const components: Map<string, HTMLElement | null> = new Map();
  
  //
  const idProductSliderContainer: HTMLElement | null = 
    document.getElementById(
      productSliderComponentsEnum.idProductSliderContainer
    );
  components.set(
    productSliderComponentsEnum.idProductSliderContainer, 
    idProductSliderContainer
  );

  //
  const idSliderInner: HTMLElement | null = 
    document.getElementById(
      productSliderComponentsEnum.idSliderInner
    );
  components.set(
    productSliderComponentsEnum.idSliderInner, 
    idSliderInner);

  //
  const idPrevButton: HTMLElement | null = 
    document.getElementById(
      productSliderComponentsEnum.idPrevButton
  );
  components.set(
    productSliderComponentsEnum.idPrevButton, 
    idPrevButton
  );

  //
  const idNextButton: HTMLElement | null = 
    document.getElementById(
      productSliderComponentsEnum.idNextButton
    );
  components.set(
    productSliderComponentsEnum.idNextButton, 
    idNextButton
  );

  //
  return components;
}

/**
 * 
 * 
 */
function validate_product_slider_components(
  components: Map<string, HTMLElement | null>,
): boolean{
  let validate: boolean = true;
  for(const [_, value] of components.entries()){
    validate = validate && (value !== null);
  }
  return validate;
}

/**
 * 
 * 
 */
function addClassList(component: HTMLElement, classList: string[]): void{
  if(classList.length > 0){
    classList.map(cssClass => {
      component.classList.add(cssClass);
    })
  }
}

/**
 * 
 * 
 */
function removeClassList(component: HTMLElement, classList: string[]): void{
  if(classList.length > 0){
    classList.map(cssClass => {
      component.classList.remove(cssClass)
    });
  }
}

/**
 * 
 * 
 */
type SliderStateType = {
  getIndex: () => number,
  increment: () => number,
  decrement: () => number,
}

function sliderState(initValue: number): SliderStateType{
  let index: number = initValue;

  const increment = () => {
    index = index + 1;
    return index;
  };

  const decrement = () => {
    index = index -1;
    return index;
  }

  return{
    getIndex: () => index,
    increment: increment,
    decrement: decrement,
  }
}

/**
 * 
 * 
 */
function init_product_slider(): void{

  // test
  console.log(product_slider_components());

  // state
  let indexSliderState: number = 0; 

  // html components
  const idProductSliderContainer: HTMLDivElement | null = document.getElementById('idProductSliderContainer') as HTMLDivElement;
  const idSliderInner: HTMLDivElement | null = document.getElementById('idSliderInner') as HTMLDivElement;
  const _imageSlideList: NodeListOf<HTMLDivElement> = document.querySelectorAll('._image_slide');
  const idPrevButton: HTMLButtonElement | null = document.getElementById('idPrevButton') as HTMLButtonElement;
  const idNextButton: HTMLButtonElement | null = document.getElementById('idNextButton') as HTMLButtonElement;
  const _dotSliderList: NodeListOf<HTMLDivElement> = document.querySelectorAll('._dot_slider');

  // list of slider items
  const totalItems: number = _imageSlideList.length;

  // init prev button - init slide dots
  if(indexSliderState === 0 && idPrevButton !== null){
    idPrevButton.classList.remove('_slide_buttons');
    idPrevButton.classList.add('_disable_button_slider');
    idPrevButton.disabled = true;
    slideDotCurrent(_dotSliderList[indexSliderState]);
  }

  // add events to both buttons
  if(idPrevButton !== null && idNextButton !== null){
    idPrevButton.addEventListener('click', () => prevSlide());
    idNextButton.addEventListener('click', () => nextSlide());
  }

  /**
   * 
   * 
   */
  function moveToIndex(index: number): void{
    if(idProductSliderContainer !== null && idSliderInner !== null){
      const newTransform = -idProductSliderContainer.offsetWidth * index;
      idSliderInner.style.transform = `translateX(${newTransform}px)`;
    }
  }

  /**
   * 
   * 
   */
  function slideDotCurrent($slideDot: HTMLDivElement): void{
    $slideDot.classList.remove('_dot_slider');
    $slideDot.classList.add('_slide_dots_current');
  }

  /**
   * 
   * 
   */
  function slideDotNormal($slideDot: HTMLDivElement): void{
    $slideDot.classList.remove('_slide_dots_current');
    $slideDot.classList.add('_dot_slider');
  }

  /**
   * 
   * 
   */
  function disableButtonSlide($button: HTMLButtonElement): void{
    $button.classList.remove('_slide_buttons');
    $button.classList.add('_disable_button_slider');
    $button.disabled = true;
  }

  /**
   * 
   * 
   */
  function enableButtonSlide($button: HTMLButtonElement): void{
    $button.classList.remove('_disable_button_slider');
    $button.classList.add('_slide_buttons');
    $button.disabled = false;
  }
    
  /**
   * 
   * 
   */
  function prevSlide(): void{

    slideDotNormal(_dotSliderList[indexSliderState]);
    indexSliderState = indexSliderState - 1;
    slideDotCurrent(_dotSliderList[indexSliderState]);

    if(indexSliderState === 0 && idPrevButton !== null){
      disableButtonSlide(idPrevButton);
    }
    else if(indexSliderState === (totalItems - 1) && idNextButton !== null){
      disableButtonSlide(idNextButton);
    }
    else{
      idPrevButton !== null && enableButtonSlide(idPrevButton);
      idNextButton !== null && enableButtonSlide(idNextButton);
    }

    moveToIndex(indexSliderState);
  }

  /**
   * 
   * 
   */
  function nextSlide(): void{

    slideDotNormal(_dotSliderList[indexSliderState]);
    indexSliderState = indexSliderState + 1;
    slideDotCurrent(_dotSliderList[indexSliderState]);

    if(indexSliderState === 0 && idPrevButton !== null){
      disableButtonSlide(idPrevButton);
    }
    else if(indexSliderState === (totalItems - 1) && idNextButton !== null){
      disableButtonSlide(idNextButton);
    }
    else{
      idPrevButton !== null && enableButtonSlide(idPrevButton);
      idNextButton !== null && enableButtonSlide(idNextButton);
    }

    moveToIndex(indexSliderState);
  }
}

document.addEventListener('DOMContentLoaded', init_product_slider);