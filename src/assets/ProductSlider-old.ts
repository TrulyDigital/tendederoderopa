/**
 * 
 * 
 */

type SliderStateType = {
  getIndex: () => number,
  increment: () => number,
  decrement: () => number,
}

function slider_state(
  initValue: number, 
  totalItems: number,
): SliderStateType{

  let index: number = initValue;

  const increment = () => {
    if(index < (totalItems-1)){
      index = index + 1;
    }
    return index;
  };

  const decrement = () => {
    if(index > 0){
      index = index -1;
    }
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
function dom_dot_slider(
  dotElement: HTMLDivElement,
): void{
  dotElement.classList.remove('_dot_current_slider');
  dotElement.classList.add('_dot_slider');
}

/**
 * 
 * 
 */
function dom_dot_current_slider(
  dotElement: HTMLDivElement,
): void{
  dotElement.classList.remove('_dot_slider');
  dotElement.classList.add('_dot_current_slider');
}

/**
 * 
 * 
 */
function dom_disabled_button_slider(
  buttonElement: HTMLButtonElement,
): void{
  buttonElement.classList.remove('_slide_buttons');
  buttonElement.classList.add('_disable_button_slider');
  buttonElement.disabled = true;
}

/**
 * 
 * 
 */
function dom_enable_button_slider(
  buttonElement: HTMLButtonElement,
): void{
  buttonElement.classList.remove('_disable_button_slider');
  buttonElement.classList.add('_slide_buttons');
  buttonElement.disabled = false;
}

/**
 * 
 * 
 */

type ArrayZoneType = {
  isHead: boolean,
  isTail: boolean,
  isMiddle: boolean,
}

function array_zone(
  dotSliderList: NodeListOf<HTMLDivElement>,
  getIndex: () => number,
): ArrayZoneType{

  const totalItems: number = dotSliderList.length;

  if(getIndex() === 0){
    return {
      isHead: true,
      isTail: false,
      isMiddle: false,
    }
  }

  if(getIndex() === (totalItems-1)){
    return{
      isHead: false,
      isTail: true,
      isMiddle: false,
    }
  }

  return{
    isHead: false,
    isTail: false,
    isMiddle: true,
  }
}

/**
 * 
 * 
 */
function dom_next_slide(
  idPrevButton: HTMLButtonElement,
  idNextButton: HTMLButtonElement,
  dotSliderList: NodeListOf<HTMLDivElement>,
  getIndex: () => number,
  increment: () => number,
): void{

  increment();
  dom_dot_slider(dotSliderList[getIndex()-1]);
  dom_dot_current_slider(dotSliderList[getIndex()]);

  const arrayZone: ArrayZoneType = array_zone(dotSliderList, getIndex);

  switch(true){
    case arrayZone.isHead: {
      console.log('isHead');
      console.log(getIndex());
      dom_disabled_button_slider(idPrevButton);
    }
    case arrayZone.isTail: {
      console.log('isTail');
      console.log(getIndex());
      dom_disabled_button_slider(idNextButton);
    }
    default: {
      console.log('isMiddle');
      console.log(getIndex());
      dom_enable_button_slider(idNextButton);
      dom_enable_button_slider(idPrevButton);
    }
  }
}

/**
 * 
 * 
 */
function dom_prev_slide(
  idPrevButton: HTMLButtonElement,
  idNextButton: HTMLButtonElement,
  dotSliderList: NodeListOf<HTMLDivElement>,
  getIndex: () => number,
  decrement: () => number,
): void{

  decrement();
  dom_dot_slider(dotSliderList[getIndex()+1]);
  dom_dot_current_slider(dotSliderList[getIndex()]);

  const arrayZone: ArrayZoneType = array_zone(dotSliderList, getIndex);

  switch(true){
    case arrayZone.isHead:
      dom_disabled_button_slider(idPrevButton);
    case arrayZone.isTail:
      dom_disabled_button_slider(idNextButton);
    default: {
      dom_enable_button_slider(idNextButton);
      dom_enable_button_slider(idPrevButton);
    }
  }
}

/**
 * 
 * 
 */
function dom_move_to_index(
  newTransform: number,
  idSliderInner: HTMLDivElement,
): void{
  idSliderInner.style.transform = `translateX(${newTransform}px)`;
}

/**
 * 
 * 
 */
function init_product_slider(): void{

  // html components
  const idProductSliderContainer: HTMLDivElement | null = document.getElementById('idProductSliderContainer') as HTMLDivElement;
  const idSliderInner: HTMLDivElement | null = document.getElementById('idSliderInner') as HTMLDivElement;
  const idPrevButton: HTMLButtonElement | null = document.getElementById('idPrevButton') as HTMLButtonElement;
  const idNextButton: HTMLButtonElement | null = document.getElementById('idNextButton') as HTMLButtonElement;
  const imageSlideList: NodeListOf<HTMLDivElement> = document.querySelectorAll('._image_slide');
  const dotSliderList: NodeListOf<HTMLDivElement> = document.querySelectorAll('._dot_slider');

  // state
  const { getIndex, increment, decrement } = slider_state(0, dotSliderList.length);

  // add event - next slide
  if(idPrevButton !== null && idNextButton !== null && dotSliderList.length > 0){

    idNextButton.addEventListener('click', () => dom_next_slide(
      idPrevButton,
      idNextButton,
      dotSliderList,
      getIndex,
      increment,
    ));

    idPrevButton.addEventListener('click', () => dom_prev_slide(
      idPrevButton,
      idNextButton,
      dotSliderList,
      getIndex,
      decrement,
    ));
  }

  // init prev button - init slide dots
  if(getIndex() === 0 && idPrevButton !== null && dotSliderList.length > 0){
    dom_disabled_button_slider(idPrevButton);
    dom_dot_current_slider(dotSliderList[getIndex()]);
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
}

document.addEventListener('DOMContentLoaded', init_product_slider);