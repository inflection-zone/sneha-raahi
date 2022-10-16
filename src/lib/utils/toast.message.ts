import { toast } from '@zerodevx/svelte-toast'

//////////////////////////////////////////////////////////////

export const success = m => toast.push(m, {
    theme: {
        '--toastBackground': '#87DA90',
        '--toastColor': 'white',
        '--toastBarBackground': 'olive'
    }
});

export const warning = m => toast.push(m, {
    theme: {
        '--toastBackground': '#FCF81E',
        '--toastColor': '#646462',
        '--toastBarBackground': '#B0AD0B'
    }
});

export const failure = m => toast.push(m, {
    theme: {
        '--toastBackground': '#FF7F50',
        '--toastColor': 'white',
        '--toastBarBackground': '#DE3163'
    }
});
