import { sp, Item } from "@pnp/sp";
import { taxonomy, ITerm, ITermData } from "@pnp/sp-taxonomy";
import { Util } from "@pnp/common";



interface ITermTree {
    node: ITermData & ITerm;
    children: (ITermData & ITerm)[];
}


class TaxonomyPlayground {

    

    static async addTermWithRandomSuffix() {
        const store = await taxonomy.termStores.getById("b89e80e6649144a2a303bfd61c8dc360").get();
        const set = await store.getTermSetById("0e9b9bfe-b7c3-491f-ab91-34d49ccd31d9").get();
        const terms = await set.terms.select('Id', 'Name', 'Parent').get().then((r) => {



            r.forEach(element => {
                console.log(element);
            });
            


            // let theTree: ITermTree = {} as ITermTree;

            // theTree.node = {} as ITermData & ITerm;
            // theTree.children = [] as (ITermData & ITerm)[];
            // theTree.node.Name = "Root";

            // this.foo(r, theTree.node);

            // let counter = 0;
            // while (r.length > 0) {

            //     let currentTerm = r[counter];
            //     theTree.children.push(currentTerm);
            //     r = r.filter((t) => {
            //         t.Id != currentTerm.Id;
            //     });
            //     counter++;

            // }
            // console.log(theTree);
        });


        const result = await set.addTerm("term-via-pnp-tax" + Util.getRandomString(5), 1033, true);
        return result;
    }


}

_spBodyOnLoadFunctions.push(() => {
    TaxonomyPlayground.addTermWithRandomSuffix().then((r) => {
        console.warn("A term was just borned in a beautiful way: " + r.Name + " 🦄");
    });
});




