import "./Wave.css"

interface IWave {
    className?: string
    amount?: number
}

const Wave = ({ className = "", amount = 1 }: IWave) => {
    return (
        <div className={["wave", ...className.split(" ")].join(" ")}>
            <svg
                width="100%"
                height="100%"
                id="svg"
                viewBox="0 0 1440 690"
                xmlns="http://www.w3.org/2000/svg"
                className="transition delay-150 duration-300 ease-in-out"
            >
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="5%" stop-color="#a8dadc"></stop>
                        <stop offset="95%" stop-color="#457b9d"></stop>
                    </linearGradient>
                </defs>
                {amount >= 3 && (
                    <path
                        d="M 0,700 L 0,131 C 84.17224880382773,104.86602870813397 168.34449760765546,78.73205741626793 261,80 C 353.65550239234454,81.26794258373207 454.7942583732058,109.9377990430622 556,116 C 657.2057416267942,122.0622009569378 758.4784688995214,105.51674641148325 860,103 C 961.5215311004786,100.48325358851675 1063.2918660287082,111.99521531100478 1160,119 C 1256.7081339712918,126.00478468899522 1348.3540669856459,128.5023923444976 1440,131 L 1440,700 L 0,700 Z"
                        stroke="none"
                        stroke-width="0"
                        fill="url(#gradient)"
                        fill-opacity="0.4"
                        className="path-0 transition-all delay-150 duration-300 ease-in-out"
                    ></path>
                )}
                {amount >= 2 && (
                    <path
                        d="M 0,700 L 0,306 C 90.31578947368422,299.6937799043062 180.63157894736844,293.3875598086124 282,282 C 383.36842105263156,270.6124401913876 495.7894736842105,254.14354066985646 598,247 C 700.2105263157895,239.85645933014354 792.2105263157896,242.03827751196172 869,247 C 945.7894736842104,251.96172248803828 1007.3684210526314,259.70334928229664 1100,270 C 1192.6315789473686,280.29665071770336 1316.3157894736842,293.1483253588517 1440,306 L 1440,700 L 0,700 Z"
                        stroke="none"
                        stroke-width="0"
                        fill="url(#gradient)"
                        fill-opacity="0.53"
                        className="path-1 transition-all delay-150 duration-300 ease-in-out"
                    ></path>
                )}

                {amount >= 1 && (
                    <path
                        d="M 0,700 L 0,481 C 120.35406698564591,459.88038277511964 240.70813397129183,438.7607655502392 328,460 C 415.29186602870817,481.2392344497608 469.52153110047846,544.8373205741627 547,534 C 624.4784688995215,523.1626794258373 725.2057416267943,437.88995215311 824,427 C 922.7942583732057,416.11004784689 1019.6555023923445,479.6028708133972 1122,501 C 1224.3444976076555,522.3971291866028 1332.1722488038276,501.6985645933014 1440,481 L 1440,700 L 0,700 Z"
                        stroke="none"
                        stroke-width="0"
                        fill="url(#gradient)"
                        fill-opacity="1"
                        className="path-2 transition-all delay-150 duration-300 ease-in-out"
                    ></path>
                )}
            </svg>
        </div>
    )
}

export default Wave
