"use client";

import {wrapMeta} from "@crosspublic/panel/src/helpers/wrap.meta";
import {Block} from "@crosspublic/panel/src/components/utils/block";
import {Subscription} from "@prisma/client";
import {Button} from "@crosspublic/panel/src/components/utils/button";
import {pricing, PricingInterface} from "@crosspublic/helpers/src/pricing/pricing";
import {capitalize} from "lodash";
import {FC, useCallback, useEffect, useState} from "react";
import {clsx} from "clsx";
import {useFetch} from "@crosspublic/panel/src/helpers/fetch.context";
import {useRouter} from "next/navigation";
import {deleteDialog} from "@crosspublic/panel/src/helpers/delete.dialog";
import {Oval} from "react-loader-spinner";

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px">
    <path fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"/>
  </svg>
);

const Not = () => (
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px">
    <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"/>
    <path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"/>
  </svg>
);

export const Loader: FC<{id: string, onSuccess: () => void}> = (props) => {
  const {id, onSuccess} = props;
  const fetchObject = useFetch();
  useEffect(() => {
    check();
  }, []);

  const check = useCallback(async () => {
    const {data} = await fetchObject.get(`/billing/check/${id}`);
    if (!data.exists) {
      await new Promise((res) => {
        setTimeout(res, 5000);
      });
      return check();
    }

   return onSuccess();
  }, [id]);
  return (
    <div className="absolute left-0 top-0 h-full w-full bg-black/70 z-[100] flex justify-center items-center">
      <div className="bg-white w-[200px] h-[200px] rounded-container flex items-center justify-center">
        <Oval color="#3B1D61" secondaryColor="#3B1D61" width={100} height={100} strokeWidth="5" />
      </div>
    </div>
  )
}

export const PricingComponent: FC<{period: 'MONTHLY' | 'YEARLY', pricing: PricingInterface, billing?: Subscription, p: 'FREE' | 'BASIC' | 'PRO'}> = (props) => {
  const {period, pricing, billing, p} = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fetchObject = useFetch();
  const subscribe = useCallback(async () => {
    setLoading(true);
    const {data: {url, id, portal}} = await fetchObject.post('/billing/subscribe', {billing: p, period});
    if (url) {
      window.open(url, '_blank');
    }
    else if(id) {
      router.push(`/billing?check=${id}`);
    }
    else if (portal) {
      try {
        await deleteDialog('We could not find a payment method. Please add a payment method to continue', 'Add Payment Method', 'Payment method added');
        window.open(portal, '_blank');
      }
      catch (err) {}
    }
    setLoading(false);
  }, [p, period]);
  return (
    <div
      className="flex-1 rounded-container border-gray border flex flex-col min-h-full p-6 gap-4"
      data-v0-t="card"
    >
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {
            // @ts-ignore
            capitalize(pricing?.[p]?.package)
          }
        </h3>
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex items-end">
          <h2 className="text-4xl font-bold">${
            // @ts-ignore
            pricing?.[p]?.pricing[period.toLowerCase()]
          }</h2>
          <p className="text-zinc-500 dark:text-zinc-400"> / per {period.toLowerCase().replace('ly', '')}</p>
        </div>
        <ul className="space-y-2">
          <li className="flex">
            <div className="mr-1"><Check /></div>
            <div>{pricing?.[p]?.faq} FAQs</div>
          </li>
          <li className="flex">
            <div className="mr-1"><Check /></div>
            <div>{pricing?.[p]?.categories} Categories</div>
          </li>
          <li className="flex">
            <div className="mr-1"><Check /></div>
            <div>{pricing?.[p]?.user} Users</div>
          </li>
          <li className="flex">
            <div className="mr-1">
              {pricing?.[p]?.domains ? <Check /> : <Not />}
            </div>
            <div>Custom domain</div>
          </li>
          <li className="flex">
            <div className="mr-1">
              {pricing?.[p]?.domains ? <Check /> : <Not />}
            </div>
            <div>Remove crosspublic branding</div>
          </li>
          <li className="flex">
            <div className="mr-1">
              {pricing?.[p]?.api ? <Check /> : <Not />}
            </div>
            <div>API Access</div>
          </li>
          <li className="flex">
            <div className="mr-1">
              {pricing?.[p]?.embed ? <Check /> : <Not />}
            </div>
            <div>Documentation Embedding (soon)</div>
          </li>
        </ul>
        {
          // @ts-ignore
          p === (billing?.subscriptionTier || 'FREE') && ((billing?.period || 'MONTHLY') === period) && (
            <div className="mt-4 p-2 rounded-md text-center">
                  <span className="text-pink dark:text-green-300">
                    Current Package
                  </span>
            </div>
          )}
      </div>
      <div className="mt-auto">
        <Button onClick={subscribe} loading={loading} disabled={
          ((p === (billing?.subscriptionTier || 'FREE') && ((billing?.period || 'MONTHLY') === period))) ||
          // @ts-ignore
          (p === 'FREE' && billing?.subscriptionTier !== 'FREE')
        }>
          {
            // @ts-ignore
            (p === 'FREE' && billing?.subscriptionTier !== 'FREE') ? 'Locked' :
            // @ts-ignore
            p === (billing?.subscriptionTier || 'FREE') && ((billing?.period || 'MONTHLY') === period) ? 'Current' : 'Subscribe'}
        </Button>
      </div>
    </div>
  )
}

export const BillingComponent = wrapMeta<{billing?: Subscription, check?: string}>((props) => {
  const {billing, check} = props;
  const [topLoading, setTopLoading] = useState(check);
  const [cancelLoading, setCancelLoading] = useState(false);
  const router = useRouter();
  const [period, setPeriod] = useState<'MONTHLY' | 'YEARLY'>((billing?.period || 'MONTHLY') as 'MONTHLY' | 'YEARLY');
  const fetchObject = useFetch();

  useEffect(() => {
    if (check === topLoading) {
      return ;
    }
    setTopLoading(check);
  }, [check, topLoading]);

  const changePeriod = useCallback(() => {
    setPeriod(period === 'MONTHLY' ? 'YEARLY' : 'MONTHLY');
  }, [period]);

  const cancel = useCallback(async () => {
    try {
      await deleteDialog('Are you sure you want to continue? Some data will be deleted', 'Yes', 'Subscription set to cancel');
      setCancelLoading(true);
      const {data} = await fetchObject.post('/billing/cancel');
      setCancelLoading(false);
      router.push(`/billing?check=${data.id}`)
    }
    catch (err) {}
  }, []);

  const undoCancel = useCallback(async () => {
    try {
      setCancelLoading(true);
      const {data} = await fetchObject.post('/billing/cancel');
      setCancelLoading(false);
      router.push(`/billing?check=${data.id}`);
    }
    catch (err) {}
  }, []);

  const modifyPayment = useCallback(async () => {
    try {
      setCancelLoading(true);
      const {data} = await fetchObject.post('/billing/modify');
      window.open(data.portal, '_blank');
      setCancelLoading(false);
    }
    catch (err) {}
  }, []);

  return (
      <Block>
        {topLoading && (
          <Loader id={topLoading} onSuccess={() => {
            router.push(`/billing?b=${Math.random()}`);
          }} />
        )}
        <div className="flex flex-col w-full p-5 space-y-8">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <div className="flex items-center bg-gray-300 dark:bg-gray-700 rounded-md w-full sm:w-auto p-2">
            <span className="text-gray-500 dark:text-gray-400 mr-3">Monthly</span>
            <div className="relative bg-white rounded-full w-20 border-gray border h-8 p-1" onClick={changePeriod}>
              <div className={clsx("pointer-events-none absolute h-full p-1 top-0 transition-all", period == 'MONTHLY' ? 'left-0 translate-x-0' : 'left-[100%] -translate-x-[100%]')}>
                <div className="bg-btn left-0 h-full top-1 rounded-full w-10" />
              </div>
            </div>
            <span className="text-gray-500 dark:text-gray-400 ml-3">Yearly</span>
          </div>
          <div className="gap-6 h-full flex">
            {Object.keys(pricing).filter(f => !(period === 'YEARLY' && f === 'FREE')).map(p => (
              <PricingComponent key={p} pricing={pricing} period={period} billing={billing} p={p as 'FREE' | 'BASIC' | 'PRO'} />
            ))}
          </div>
          <div>
            {billing && (
              <div className="text-right w-full flex justify-end">
                <div className="w-[200px] mr-3">
                  <Button onClick={modifyPayment} size="small" loading={cancelLoading}>Change Payment Method</Button>
                </div>
                <div className="w-[220px]">
                  {billing.cancelAt ? (
                    <div>
                      <div className="text-center mb-2">
                        Set to cancel on <strong>{new Date(billing.cancelAt).toLocaleString('en-US', {dateStyle: 'medium'})}</strong>
                      </div>
                      <Button onClick={undoCancel} loading={cancelLoading}>
                        Undo cancellation
                      </Button>
                    </div>
                    ) : (
                    <Button btnStyle="error" size="small" onClick={cancel} loading={cancelLoading}>
                      Cancel subscription
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Block>
  )
});
