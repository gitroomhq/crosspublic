"use client";

import {wrapMeta} from "@meetfaq/panel/src/helpers/wrap.meta";
import {Block} from "@meetfaq/panel/src/components/utils/block";
import {useForm} from "react-hook-form";
import { Input } from "../utils/input";
import {SketchPicker} from "react-color";
import {FC, useState} from "react";

interface StylesInterface {
  name: string;
  pageColor: string;
  primaryColor: string;
  removeBranding: boolean;
  secondaryColor: string;
  brandingText: string;
  topBarColor: string;
}

export const ColorPicker: FC<{color: string, onChange: (color: string) => void}> = (props) => {
  const {color, onChange} = props;
  const [show, setShow] = useState(false);
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
}

export const StyleComponent = wrapMeta<{styles: StylesInterface}>((props) => {
  const {styles} = props;
  const {register, watch} = useForm({
    values: styles,
  });

  return (
    <Block>
      <div className="flex flex-col gap-4">
        <Input label="Name" {...register('name')} />
        {[
          {key: 'pageColor', name: 'Page Color', value: watch('pageColor')},
          {key: 'primaryColor', name: 'Primary Color', value: watch('primaryColor')},
          {key: 'secondaryColor', name: 'Secondary Color', value: watch('secondaryColor')},
          {key: 'topBarColor', name: 'Top Bar Color', value: watch('topBarColor')}
        ].map((val) => {
          const reg = register(val.key as keyof StylesInterface);
          return (
            <div className="flex items-end gap-2" key={val.key}>
              <Input readOnly={true} label={val.name} value={val.value} />
              <ColorPicker color={val.value} onChange={(color: string) => reg.onChange({target: {value: color, name: val.key}})} />
            </div>
          )})}
      </div>
    </Block>
  )
});
