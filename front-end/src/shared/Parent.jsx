import Search from "../Search";
import Jobcategories from "./Jobcategories";
import RandomJobs from "./RandomJobs";
import Separator from "./Separator";

function Parent() {
    return (
        <div>
            <Search />
            <Separator/>
            <Jobcategories />
            <Separator/>
            <RandomJobs />
        </div>
    )
}


export default Parent;