"use client";

import {wrapMeta} from "@meetfaq/panel/src/helpers/wrap.meta";
import {Block} from "@meetfaq/panel/src/components/utils/block";
import {SubmitHandler, useForm} from "react-hook-form";
import { Input } from "../utils/input";
import {SketchPicker} from "react-color";
import {FC, forwardRef, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import WarningIcon from "@meetfaq/panel/src/components/icons/warning.icon";
import { Button } from "../utils/button";
import {useFetch} from "@meetfaq/panel/src/helpers/fetch.context";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";

interface StylesInterface {
  canEditBranding: boolean;
  name: string,
  topBarColor: string,
  topBarTextColor: string,
  backgroundColor: string,
  pageTextColor: string,
  pageBlockColor: string;
  brandingText: string
}

type StylesKey = keyof StylesInterface;
interface MapInterface {
  key: StylesKey;
  name: string;
  value: string;
}

// eslint-disable-next-line react/display-name
export const ColorPicker = forwardRef<SketchPicker, {color: string, onChange: (color: string) => void}>((props, ref) => {
  const {color, onChange} = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (ref) {
      // @ts-ignore
      ref.current = {click: () => setShow(!show)};
    }
  }, []);

  return (
    <div className="relative bg-white h-[42px] w-[42px] rounded p-1 border border-gray cursor-pointer">
      <div className="w-full h-full border border-gray" onClick={() => setShow(!show)} style={{backgroundColor: color}} />
      {show && (
        <div className="absolute left-[100%] top-0">
          <div className="relative z-[100]">
            <div className="fixed w-full h-full left-0 top-0 z-9" onClick={(e) => {
              setShow(!show);
              setTimeout(() => {
                // @ts-ignore
                document.elementFromPoint(e.clientX, e.clientY)?.focus();
              }, 100);
            }} />
            <div className="relative z-[10] translate-x-[10px] -translate-y-[50%]">
              <SketchPicker color={color} onChange={(e) => onChange(e.hex)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
});

export const RefComponent: FC<{children: (ref: any) => ReactNode}> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  return props.children(ref);
}
export const StyleComponent = wrapMeta<{styles: StylesInterface}>((props) => {
  const {styles: {canEditBranding, ...allStyles}} = props;
  const router = useRouter();
  const customFetch = useFetch();
  const {handleSubmit, formState, register, watch} = useForm({
    values: allStyles,
  });

  const submit: SubmitHandler<Omit<StylesInterface, 'canEditBranding'>> = useCallback(async (data) => {
    await customFetch.put('/styles', data);
    router.refresh();
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Your styles have been updated!',
    });
  }, []);

  return (
    <Block>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4 max-w-[500px]">
          <Input topDivClass="flex flex-col" label="Company Name" {...register('name')} />
          {([
            {key: 'topBarColor', name: 'Top Bar Color', value: watch('topBarColor')},
            {key: 'topBarTextColor', name: 'Top Bar Text Color', value: watch('topBarTextColor')},
            {key: 'pageTextColor', name: 'Page text color', value: watch('pageTextColor')},
            {key: 'backgroundColor', name: 'Background color', value: watch('backgroundColor')},
            {key: 'pageBlockColor', name: 'Block color', value: watch('pageBlockColor')}
          ] as MapInterface[]).map((val) => {
            const reg = register(val.key as keyof Omit<StylesInterface, 'canEditBranding'>);
            return (
              <div className="flex items-end gap-2" key={val.key}>
                <RefComponent>
                  {ref => (
                    <div className="flex flex-1 items-end gap-2">
                      <Input topDivClass="flex flex-col flex-1" readOnly={true} label={val.name} value={val.value} onClick={() => {
                        ref.current.click()
                      }} />
                      <ColorPicker ref={ref} color={val.value} onChange={(color: string) => reg.onChange({target: {value: color, name: val.key}})} />
                    </div>
                )}
                </RefComponent>
              </div>
            )})}
          <div className="flex items-end gap-2">
            <Input topDivClass="flex flex-col flex-1" readOnly={!canEditBranding} label="Bottom branding text" {...register('brandingText')} />
            {!canEditBranding && (
              <div className="h-[42px] flex items-center text-primary">
                <WarningIcon data-tooltip-id="my-tooltip" data-tooltip-content="You must have the Basic version to change the branding text" />
              </div>
            )}
          </div>
          <div className="max-w-[150px] mt-5">
            <Button loading={formState.isSubmitting} type="submit">Update!</Button>
          </div>
        </div>
      </form>
    </Block>
  )
});
