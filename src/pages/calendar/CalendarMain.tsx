import type TabInfoMessages from '@shared/messages/TabInfoMessages';
import Calendar from '@views/components/calendar/Calendar';
import DialogProvider from '@views/components/common/DialogProvider/DialogProvider';
import ExtensionRoot from '@views/components/common/ExtensionRoot/ExtensionRoot';
import { MessageListener } from 'chrome-extension-toolkit';
import useKC_DABR_WASM from 'kc-dabr-wasm';
import React, { useEffect } from 'react';

/**
 * Calendar page
 * @returns entire page
 */
export default function CalendarMain() {
    useKC_DABR_WASM();
    useEffect(() => {
        const tabInfoListener = new MessageListener<TabInfoMessages>({
            getTabInfo: ({ sendResponse }) => {
                sendResponse({
                    url: window.location.href,
                    title: document.title,
                });
            },
        });

        tabInfoListener.listen();

        return () => tabInfoListener.unlisten();
    }, []);

    return (
        <ExtensionRoot className='h-full w-full'>
            <DialogProvider>
                <Calendar />
            </DialogProvider>
        </ExtensionRoot>
    );
}
