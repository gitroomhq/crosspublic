import {useMemo} from 'react'
import ConfiguredSectionPlaceholder from './configured-section-placeholder'
import clsx from 'clsx'

function getVerificationError(verificationResponse: {error: any}) {
    try {
        const error = verificationResponse.error
        if (error.code === 'missing_txt_record') {
            return null
        }
        return error.message
    } catch {
        return null
    }
}

const ConfiguredSection = ({ domainInfo }: {domainInfo: any}) => {
    const isSubDomain = useMemo(() => {
        return domainInfo?.name?.split('.').length === 3;
    }, [domainInfo?.name]);

    const subDomain = useMemo(() => {
        return domainInfo?.name?.split('.')?.[0];
    }, [domainInfo?.name]);

    if (!domainInfo) {
        return <ConfiguredSectionPlaceholder />
    }

    if (!domainInfo.verified) {
        const txtVerification = domainInfo?.verification?.find(
            (x: {type: string}) => x.type === 'TXT'
        )
        return (
            <>
                <div className="flex items-center space-x-3 my-3 text-pink">
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        shapeRendering="geometricPrecision"
                    >
                        <circle cx="12" cy="12" r="10" fill="currentColor" />
                        <path d="M12 8v4" stroke="white" />
                        <path d="M12 16h.01" stroke="white" />
                    </svg>
                    <p className="text-pink font-medium text-sm">
                        Domain is pending verification
                    </p>
                </div>

                <div className="w-full border-t border-gray-100 mt-5 mb-8" />

                <div>
                    <div className="flex justify-start space-x-4">
                        <div
                            className={`text-black border-black text-sm border-b-2 pb-1 transition-all ease duration-150`}
                        >
                            Verify Domain Ownership
                        </div>
                    </div>
                    <div className="my-3 text-left">
                        <p className="my-5 text-sm">
                            Please set the following TXT record on {domainInfo.apexName} to
                            prove ownership of {domainInfo.name}:
                        </p>
                        <div className="flex justify-start items-start space-x-10 bg-gray-50 rounded-md">
                            <div>
                                <p className="text-sm font-bold">Type</p>
                                <p className="text-sm font-mono mt-2">{txtVerification?.type}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Name</p>
                                <p className="text-sm font-mono mt-2">
                                    {txtVerification?.domain?.slice(
                                        0,
                                        txtVerification.domain.length -
                                        domainInfo.apexName.length -
                                        1
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Value</p>
                                <p className="text-sm font-mono mt-2">
                                    <span className="text-ellipsis">{txtVerification?.value}</span>
                                </p>
                            </div>
                        </div>
                        {getVerificationError(domainInfo.verificationResponse) && (
                            <p className="my-5 text-sm text-red-700">
                                {getVerificationError(domainInfo.verificationResponse)}
                            </p>
                        )}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={clsx("flex items-center space-x-3 my-3", domainInfo.configured ? 'text-pink' : 'text-red-500')}>
                <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    shapeRendering="geometricPrecision"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="currentColor"
                    />
                    {domainInfo.configured ? (
                        <>
                            <path
                                d="M8 11.8571L10.5 14.3572L15.8572 9"
                                fill="none"
                                stroke="white"
                            />
                        </>
                    ) : (
                        <>
                            <path d="M15 9l-6 6" stroke="white" />
                            <path d="M9 9l6 6" stroke="white" />
                        </>
                    )}
                </svg>
                <p
                    className={`${
                        domainInfo.configured
                            ? 'text-black font-normal'
                            : 'text-red-700 font-medium'
                    } text-sm`}
                >
                    {domainInfo.configured ? 'Domain is active' : 'Invalid Configuration'}
                </p>
            </div>

            {!domainInfo.configured && (
                <>
                    <div className="border-t border-gray-100 mt-5 mb-8" />

                    <div>
                        <div className="flex justify-start space-x-4">
                            <button
                                className={`text-black border-black ext-sm border-b-2 pb-1 transition-all ease duration-150`}
                            >
                                {isSubDomain ? 'CNAME' : 'A'} Record
                            </button>
                        </div>
                        <div className="my-3 text-left">
                            <p className="my-5 text-sm">
                                Set the following record on your DNS provider to continue:
                            </p>
                            <div className="flex justify-start items-center space-x-10 bg-gray-50 rounded-md">
                                <div>
                                    <p className="text-sm font-bold">Type</p>
                                    <p className="text-sm font-mono mt-2">{isSubDomain ? 'CNAME' : 'A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Name</p>
                                    <p className="text-sm font-mono mt-2">
                                        {isSubDomain ? subDomain : '@'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Value</p>
                                    <p className="text-sm font-mono mt-2">
                                        {isSubDomain
                                            ? `cname.vercel-dns.com.`
                                            : `76.76.21.21`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ConfiguredSection;
