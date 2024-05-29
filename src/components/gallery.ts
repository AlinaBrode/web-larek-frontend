import { Component } from "./base/components"


export interface IGallery {
  galleryItems: HTMLElement[];
} 

export class Gallery extends Component<IGallery> implements IGallery {
  constructor(container: HTMLElement) {
    super(container)
  }

  set galleryItems(items: HTMLElement[]) {
    this.container.replaceChildren(... items);
  }
}