import { Pedometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import React, { createContext, FC, useEffect, useState } from "react";

interface ContextValue {
    isPedometerAvailable: string | undefined;
    pastStepCount: number | undefined;
    currentStepCount: number | undefined;
}

export const PedometerContext = createContext<ContextValue>({
    isPedometerAvailable: undefined,
    pastStepCount: undefined,
    currentStepCount: undefined
});

const PedometerProvider: FC = (props) => {
    const [subscription, setSubscription] = useState<Subscription>();
    const [isPedometerAvailable, setIsPedometerAvailable] = useState<string>();
    const [pastStepCount, setPastStepCount] = useState<number>();
    const [currentStepCount, setCurrentStepCount] = useState<number>();

    useEffect(() => {
        Pedometer.isAvailableAsync().then(
            (result) => {
                if (String(result) !== isPedometerAvailable) {
                    setIsPedometerAvailable(String(result));
                }
            },
            (error) => {
                setIsPedometerAvailable("Could not get isPedometerAvailable: " + error);
            }
        );
    });

    useEffect(() => {
        if (isPedometerAvailable === "true") {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);
            Pedometer.getStepCountAsync(start, end)
                .then(
                    (result) => {
                        setPastStepCount(result.steps);
                    },
                    (error) => {
                        setPastStepCount(undefined);
                    }
                )
                .catch((error) => { });
        }
    }, [isPedometerAvailable]);

    useEffect(() => {
        if (isPedometerAvailable === "true") {
            setSubscription(
                Pedometer.watchStepCount((result) => {
                    setCurrentStepCount(result.steps);
                })
            );
        }
        return () => {
            subscription && subscription.remove();
            setSubscription(undefined);
        }
    }, [isPedometerAvailable]);

    return (
        <PedometerContext.Provider
            value={{
                isPedometerAvailable,
                pastStepCount,
                currentStepCount
            }}
        >
            {props.children}
        </PedometerContext.Provider>
    );
};

export default PedometerProvider;