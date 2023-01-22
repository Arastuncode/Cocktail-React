import Filter from "./Filter";
import List from "./List";
import Random from "./Random";

function Main({cocktailShow}) {
    return (
        <main className="py-3">
            <Random />
            <Filter />
            <List cocktailShow={cocktailShow} />
        </main>
    );
  }
  
  export default Main;