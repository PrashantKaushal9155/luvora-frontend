import React, { useState } from "react";
import Step1 from "./step1-name";
import Step2 from "./step2-dob";
import Step3 from "./step3-gender";
import Step4 from "./step4-preference";
import Step5 from "./step5-agePreference";
import Step6 from "./step6-location";
import Step7 from "./step7-photo";
import Step8 from "./step8-bioAndOccupation";

export default function SetupFlow() {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        name: "",
        dateOfBirth: null,
        gender: null,
        preferredGender: null,
        relationshipStatus: 1,
        minPreferredAge: 18,
        maxPreferredAge: 60,
        city: "",
        customCity: "",
        bio: "",
        country: "",
        occupation: "",
        photos: [],
    });

    const next = () => setStep((s) => s + 1);
    const back = () => setStep((s) => s - 1);

    const props = { form, setForm, next, back };

    switch(step) {
        case 1:
            return <Step1 {...props} />;
        case 2:
            return <Step2 {...props} />;
        case 3:
            return <Step3 {...props} />;
        case 4:
            return <Step4 {...props} />;
        case 5:
            return <Step5 {...props} />;
        case 6:
            return <Step6 {...props} />;
        case 7:
            return <Step7 {...props} />;
        case 8:
            return <Step8 {...props} />;
        default:
            return null;
    }
}