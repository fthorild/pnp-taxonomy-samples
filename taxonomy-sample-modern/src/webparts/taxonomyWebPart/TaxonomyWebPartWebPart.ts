import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { sp } from "@pnp/sp";
import { taxonomy, ITerm, ITermData } from "@pnp/sp-taxonomy";
import { Util } from "@pnp/common";

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TaxonomyWebPartWebPartStrings';
import TaxonomyWebPart from './components/TaxonomyWebPart';
import { ITaxonomyWebPartProps } from './components/ITaxonomyWebPartProps';

export interface ITaxonomyWebPartWebPartProps {
  description: string;
}

class TaxonomyPlayground {
  static async addTermWithRandomSuffix() {
    const store = await taxonomy.termStores.getById("<replace with id of term store>").get();
    const set = await store.getTermSetById("<replace with id of term set>").get();
    const result = await set.addTerm("term-via-pnp-tax" + Util.getRandomString(5), 1033, true);
    return result;
  }
}

export default class TaxonomyWebPartWebPart extends BaseClientSideWebPart<ITaxonomyWebPartWebPartProps> {

  public render(): void {
    TaxonomyPlayground.addTermWithRandomSuffix().then((r) => {
      console.warn("A term was just borned in a beautiful way: " + r.Name + " 🦄");
    });

    const element: React.ReactElement<ITaxonomyWebPartProps> = React.createElement(
      TaxonomyWebPart,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
