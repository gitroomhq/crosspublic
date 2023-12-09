import {JSX, ComponentType} from "react";
import {Metadata} from "next";
import {ChangeTitle} from "@crosspublic/panel/src/helpers/title.helper";

interface Title {
  metadata: Metadata;
}
// eslint-disable-next-line react/display-name
export const wrapMeta = <T, >(WrapperComponent: ComponentType<T & Title>) => {
  // eslint-disable-next-line react/display-name
  return (props: T & Title): JSX.Element => {

    return (
        <>
          <ChangeTitle newTitle={props.metadata.title as string} />
          <div className="animate-fade-up">
            <WrapperComponent {...props} />
          </div>
        </>
    );
  }
};
