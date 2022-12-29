let badElements: HTMLElement[] = [];

interface IOrderValidationError {
  type: string;
  field: number | string;
  message: string;
}

export function removeBadElements() {
  badElements.forEach((element) => element.classList.remove('bad-form'));
  badElements.forEach((element) => {
    const msgErrorElement = element?.getElementsByClassName('bad-msg');
    if (!msgErrorElement || msgErrorElement?.length === 0) return;
    msgErrorElement[0].remove();
  });
  badElements = [];
}

export function addBadElement(element: HTMLElement, vError: IOrderValidationError) {
  element.classList.add('bad-form');
  badElements.push(element);

  const msgElement = document.createElement('div');
  msgElement.classList.add('bad-msg');
  msgElement.innerText = vError.message;
  element.appendChild(msgElement);
}
