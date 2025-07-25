if (!window.Packlink) {
    window.Packlink = {};
}

(function () {
    /**
     * Handles configuration static page.
     *
     * @constructor
     *
     * @param {{getDataUrl: string}} config
     */
    function ConfigurationController(config) {

        const templateService = Packlink.templateService,
            state = Packlink.state,
            ajaxService = Packlink.ajaxService,
            utilityService = Packlink.utilityService,
            templateId = 'pl-configuration-page';

        /**
         *
         * @param {{helpUrl: string, version: string}} response
         */
        const setConfigParams = (response) => {
            const version = templateService.getComponent('pl-version-number'),
                helpLink = templateService.getComponent('pl-navigate-help');

            version.innerHTML = 'v' + response.version;
            helpLink.href = response.helpUrl;

            templateService.getComponent('pl-open-system-info').addEventListener('click', () => {
                state.goToState('system-info');
            });

            utilityService.hideSpinner();
        };

        /**
         * Displays page content.
         */
        this.display = () => {
            templateService.setCurrentTemplate(templateId);
            const mainPage = templateService.getMainPage(),
                backButton = mainPage.querySelector('.pl-sub-header button');

            backButton.addEventListener('click', () => {
                state.goToState('my-shipping-services');
            });

            mainPage.querySelector('#pl-navigate-order-status').addEventListener('click', () => {
                state.goToState('order-status-mapping');
            });

            mainPage.querySelector('#pl-navigate-warehouse').addEventListener('click', () => {
                state.goToState('default-warehouse', {
                    'code': 'config',
                    'prevState': 'configuration',
                    'nextState': 'configuration',
                });
            });

            mainPage.querySelector('#pl-navigate-parcel').addEventListener('click', () => {
                state.goToState('default-parcel', {
                    'code': 'config',
                    'prevState': 'configuration',
                    'nextState': 'configuration',
                });
            });

            mainPage.querySelector('#pl-navigate-manual-sync').addEventListener('click', () => {
                state.goToState('manual-sync');
            });

            ajaxService.get(config.getDataUrl, setConfigParams);
        };
    }

    Packlink.ConfigurationController = ConfigurationController;
})();
