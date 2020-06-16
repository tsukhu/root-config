import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine,
} from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

const data = {
  loaders: {
    navLoader: `<div style="display:block;background-color:yellow;color:black;padding:20px;font-size:100px;">Loading...</div>`,
  },
};

const routes = constructRoutes(
  document.querySelector('#single-spa-layout'),
  data
);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => System.import(name),
});
// Delay starting the layout engine until the styleguide CSS is loaded
const layoutEngine = constructLayoutEngine({
  routes,
  applications,
  active: false,
});

applications.forEach(registerApplication);

System.import('@react-mf/styleguide').then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  layoutEngine.activate();
  start();
});
