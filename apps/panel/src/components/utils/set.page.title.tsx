import {Metadata} from "next";
export const setPageTitle = (props: any, metadata: Metadata) => {
    props.params.title = metadata.title;
}
