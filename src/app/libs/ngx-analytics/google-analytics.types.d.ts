declare module "@analytics/google-analytics" {
  export type GoogleAnalyticsOptions = {
    /**
     * Google Analytics MEASUREMENT IDs
     */
    measurementIds: string | string[];

    /** Enable Google Analytics debug mode */
    debug?: boolean;

    /** Set custom google analytic tasks */
    tasks?: object;

    /**
     * The optional name for dataLayer object. Defaults to ga4DataLayer.
     */
    dataLayerName?: string;

    /**
     * The optional name for dataLayer object. Defaults to ga4DataLayer.
     */
    gtagName?: string;

    gtagConfig?: {
      /**
       * Enable [Anonymizing IP addresses](https://bit.ly/3c660Rd) sent to Google Analytics.
       */
      anonymize_ip?: boolean;
      /**
       * Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
       */
      cookie_domain: unknown;

      /**
       * Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
       */
      cookie_expires: number | Date;

      /**
       * Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
       */
      cookie_prefix: string;

      /**
       * Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
       */
      cookie_update: boolean;

      /**
       * Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
       */
      cookie_flags: string;

      /**
       *  Custom URL for google analytics script, if proxying calls
       */
      customScriptSrc: string;
    };
  };
  type AnalyticsPlugin = {
    /** Name of plugin */
    name: string;

    /** exposed events of plugin */
    EVENTS?: any;

    /** Configuration of plugin */
    config?: any;

    /** Load analytics scripts method */
    initialize?: (...params: any[]) => any;

    /** Page visit tracking method */
    page?: (...params: any[]) => any;

    /** Custom event tracking method */
    track?: (...params: any[]) => any;

    /** User identify method */
    identify?: (...params: any[]) => any;

    /** Function to determine if analytics script loaded */
    loaded?: (...params: any[]) => any;

    /** Fire function when plugin ready */
    ready?: (...params: any[]) => any;
  };

  function GoogleAnalytics(options: GoogleAnalyticsOptions): AnalyticsPlugin;

  export default GoogleAnalytics;
}
