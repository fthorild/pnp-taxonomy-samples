import { sp } from "@pnp/sp";
import { taxonomy, ITerm, ITermData } from "@pnp/sp-taxonomy";
import { Util } from "@pnp/common";

class TaxonomyPlayground {
    static async addTermWithRandomSuffix() {
        const store = await taxonomy.termStores.getById("<replace with id of term store>").get();
        const set = await store.getTermSetById("<replace with id of term set>").get();
        const result = await set.addTerm("term-via-pnp-tax" + Util.getRandomString(5), 1033, true);
        return result;
    }
}

_spBodyOnLoadFunctions.push(() => {
    TaxonomyPlayground.addTermWithRandomSuffix().then((r) => {
        console.warn("A term was just borned in a beautiful way: " + r.Name + " 🦄");
    });
});




