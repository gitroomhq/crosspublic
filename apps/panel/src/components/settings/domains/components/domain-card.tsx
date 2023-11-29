import ConfiguredSection from './configured-section'
import useSWR, { mutate } from 'swr'
import { useState } from 'react'
import LoadingDots from './loading-dots'
import fetcher from "@meetfaq/panel/src/helpers/fetcher";
import {Button} from "@meetfaq/panel/src/components/utils/button";
import {deleteDialog} from "@meetfaq/panel/src/helpers/delete.dialog";
import {useFetch} from "@meetfaq/panel/src/helpers/fetch.context";

const DomainCard = ({ domain, id, deleteDomain }: any) => {
    const fetchObject = useFetch();
    const { data: domainInfo, isValidating } = useSWR(
        `/settings/check-domain/${id}`,
        fetcher,
        { revalidateOnMount: true, refreshInterval: 5000 }
    );

    const [removing, setRemoving] = useState(false)
    return (
        <div className="flex flex-col mt-5">
            <div className="text-sm mb-2">Domain:</div>
            <div className="border-gray border rounded-container p-5">
                <div className="flex justify-between">
                    <a
                        href={`https://${domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xl text-left font-semibold flex items-center"
                    >
                        {domain}
                        <span className="inline-block ml-2">
                            <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                shapeRendering="geometricPrecision"
                            >
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                              <path d="M15 3h6v6" />
                              <path d="M10 14L21 3" />
                            </svg>
                      </span>
                    </a>
                    <div className="flex space-x-3">
                        <Button
                            onClick={() => {
                                mutate(`/api/check-domain?domain=${domain}`)
                            }}
                            disabled={isValidating}
                            btnStyle="secondary"
                            size="small"
                        >
                            {isValidating ? <LoadingDots /> : 'Refresh'}
                        </Button>
                        <Button
                            onClick={async () => {
                                try {
                                    const delDialog = await deleteDialog(`Are you sure you want to remove ${domain}?`);
                                    setRemoving(true)
                                    try {
                                        await fetchObject.delete(`/settings/delete-domain/${id}`);
                                        delDialog();
                                        deleteDomain();
                                    } catch (error) {
                                        alert(`Error removing domain`)
                                    } finally {
                                        setRemoving(false)
                                    }
                                }
                                catch (err) {
                                }
                            }}
                            size="small"
                            disabled={removing}
                        >
                            {removing ? <LoadingDots /> : 'Remove'}
                        </Button>
                    </div>
                </div>

                <ConfiguredSection domainInfo={domainInfo} />
            </div>
        </div>
    )
}

export default DomainCard;
