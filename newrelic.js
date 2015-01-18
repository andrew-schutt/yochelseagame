/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete desc.
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['yochelseagame'],
  /**
   * Your New Relic license key.
   */
  license_key : '705077d6d1619f15ca57ddcfd26473b41eb6ead3',
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'info'
  }
};
