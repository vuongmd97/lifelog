export default function IconEye({ closeEye = false }) {
    if (closeEye) {
        return (
            <svg width={24} height={24} viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.443 0.182a0.015 0.015 0 0 1 0.005 0.021 0.285 0.285 0 0 1 -0.047 0.057l0.036 0.036a0.015 0.015 0 0 1 -0.021 0.021l-0.038 -0.038a0.255 0.255 0 0 1 -0.08 0.04l0.013 0.05a0.015 0.015 0 0 1 -0.029 0.008l-0.014 -0.051Q0.247 0.33 0.225 0.33q-0.022 0 -0.044 -0.004l-0.014 0.051a0.015 0.015 0 1 1 -0.029 -0.008l0.013 -0.05a0.255 0.255 0 0 1 -0.08 -0.04l-0.038 0.038a0.015 0.015 0 1 1 -0.021 -0.021l0.036 -0.036A0.285 0.285 0 0 1 0.002 0.203a0.015 0.015 0 0 1 0.025 -0.016 0.252 0.252 0 0 0 0.053 0.061A0.224 0.224 0 0 0 0.225 0.3c0.084 0 0.155 -0.045 0.197 -0.113a0.015 0.015 0 0 1 0.021 -0.005"
                    fill="currentColor"
                />
            </svg>
        );
    }

    return (
        <svg
            fill="currentColor"
            width={24}
            height={24}
            viewBox="0 0 1.08 1.08"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <title>eye-solid</title>
            <path
                d="M1.009 0.526c-0.101 -0.187 -0.278 -0.3 -0.475 -0.3S0.16 0.339 0.06 0.526l-0.008 0.014 0.008 0.014c0.101 0.187 0.278 0.3 0.475 0.3s0.374 -0.112 0.475 -0.3l0.008 -0.014Zm-0.475 0.267C0.365 0.793 0.21 0.699 0.12 0.54c0.09 -0.159 0.245 -0.253 0.414 -0.253S0.856 0.382 0.948 0.54c-0.091 0.159 -0.245 0.253 -0.414 0.253"
                className="clr-i-solid clr-i-solid-path-1"
            />
            <path
                cx={18.09}
                cy={18.03}
                r={6.86}
                className="clr-i-solid clr-i-solid-path-2"
                d="M0.748 0.541A0.206 0.206 0 0 1 0.543 0.747A0.206 0.206 0 0 1 0.337 0.541A0.206 0.206 0 0 1 0.748 0.541z"
            />
            <path x={0} y={0} width={36} height={36} fillOpacity={0} d="M0 0H1.08V1.08H0V0z" />
        </svg>
    );
}
