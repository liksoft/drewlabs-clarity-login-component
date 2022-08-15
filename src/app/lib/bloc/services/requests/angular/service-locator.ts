import { Injector } from "@angular/core";

export class InjectorServiceLocator {
  private static instance: () => Injector;

  /**
   *
   * @param injector
   */
  static setInstance(injector: Injector) {
    InjectorServiceLocator.instance = () => {
      return injector;
    };
  }

  /**
   * Returns the global injector
   */
  static getInstance() {
    return InjectorServiceLocator.instance();
  }
}
