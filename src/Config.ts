import { Env } from './env';

function setProperties() {
  PropertiesService.getScriptProperties().setProperties(Env.Properties);
}

function getProperties() {
  const properties = PropertiesService.getScriptProperties().getProperties();
  console.log(properties);
}
