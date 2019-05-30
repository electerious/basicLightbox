declare module 'basiclightbox' {

  interface BasicLightBox {
    /**
     * Shows a lightbox instance.
     * 
     * @param cb A function that gets executed as soon as the lightbox starts to fade in.
     */
    show: (cb?: () => void) => void

    /**
     * Closes a lightbox instance.
     * 
     * @param cb A function that gets executed as soon as the lightbox has been faded out.
     */
    close: (cb?: () => void) => void

    /**
     * Returns true when the lightbox instance is visible. Also returns true when the lightbox is currently in the process of showing/hiding and not fully visible/hidden, yet.
     */
    visible: () => void

    /**
     * Returns the DOM element/node associated with the instance.
     */
    element: () => Element
  }

  type options = {
    /*
     * Prevents the lightbox from closing when clicking its background.
     */
    closable?: boolean,
    /*
     * One or more space separated classes to be added to the basicLightbox element.
     */
    className?: string,
    /*
     * Function that gets executed before the lightbox will be shown.
     * Returning false will prevent the lightbox from showing.
     */
    onShow: (instance: BasicLightBox) => void,
    /*
     * Function that gets executed before the lightbox closes.
     * Returning false will prevent the lightbox from closing.
     */
    onClose: (instance: BasicLightBox) => void
  }

  /**
   * Creates a new BasicLightbox instance.
   * 
   * @param content Content of the lightbox.
   * @param options An object of options.
   */
  function create(content: string | Element, options?: any): BasicLightBox

  /**
   * Returns `true` when a lightbox is visible. Also returns true when a lightbox is currently in the process of showing/hiding and not fully visible/hidden, yet.
   */
  function visible(): boolean 
}

