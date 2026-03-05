export const serializeComponent = (element: HTMLElement): unknown => {
  return {
    tag: element.tagName,
    classes: element.className,
    id: element.id,
    children: element.children.length,
    text: element.textContent?.substring(0, 100),
    attributes: Array.from(element.attributes).reduce(
      (acc, attr) => ({ ...acc, [attr.name]: attr.value }),
      {}
    ),
  };
};

export const getComponentState = (componentName: string): unknown => {
  const element = document.querySelector(`[data-component-name="${componentName}"]`);
  if (!element) return null;

  return {
    visible: isVisible(element as HTMLElement),
    enabled: isEnabled(element as HTMLElement),
    focused: isFocused(element as HTMLElement),
    value: (element as HTMLInputElement).value,
    snapshot: serializeComponent(element as HTMLElement),
  };
};

export const isVisible = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden';
};

export const isEnabled = (element: HTMLElement): boolean => {
  return !(element as HTMLInputElement).disabled;
};

export const isFocused = (element: HTMLElement): boolean => {
  return document.activeElement === element;
};