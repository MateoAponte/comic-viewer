import { DefineComponent } from 'vue';
import { BxBookReader } from '@kalimahapps/vue-icons';

export interface TabInfo {
  name: String;
  icon: typeof BxBookReader;
  component: DefineComponent<any, any, any>;
}
