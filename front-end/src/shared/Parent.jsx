import Search from "../Search";
import Jobcategories from "./Jobcategories";
import Separator from "./Separator";

function Parent() {
    return (
        <div>
            <Search />
            <Separator/>
            <Jobcategories />
            <Separator/>
        </div>
    )
}


export default Parent;