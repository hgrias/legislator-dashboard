import { Legislator, State, Party, Chamber } from "@prisma/client";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/utils/api";
import { z } from "zod";

interface Props {
  onSuccess: (newLegislator: Legislator) => void;
  onError: (error: Error) => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  state: State;
  party: Party;
  chamber: Chamber;
}

const formSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "Name can only contain letters",
    })
    .regex(new RegExp("^[a-zA-Z]+$"), {
      message: "Cannot contain numbers or symbols",
    })
    .trim()
    .min(1, { message: "Must be at least 1 character long" }),
  lastName: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Name can only contain letters",
    })
    .regex(new RegExp("^[a-zA-Z]+$"), {
      message: "Cannot contain numbers or symbols",
    })
    .trim()
    .min(1, { message: "Must be at least 1 character long" }),
  state: z.nativeEnum(State).refine((val) => val !== "UNKNOWN", {
    message: "Please select a valid state",
  }),
  party: z.nativeEnum(Party).refine((val) => val !== "UNKNOWN", {
    message: "Please select a valid party",
  }),
  chamber: z.nativeEnum(Chamber).refine((val) => val !== "UNKNOWN", {
    message: "Please select a valid chamber",
  }),
});

const NewLegislatorForm = ({ onSuccess, onError }: Props) => {
  const stateOptionElements = Object.keys(State).map((state) => {
    if (state === "UNKNOWN") {
      return null;
    }
    return (
      <option key={state} value={state}>
        {state}
      </option>
    );
  });

  const createLegislator = api.legislator.create.useMutation();

  function handleSubmit(values: FormValues) {
    console.log(values);
  }

  // Render custom error message with styling
  const errorMessage = (message: string) => {
    return <p className="text-error">{message}</p>;
  };

  return (
    <div className="card m-10 bg-neutral p-6">
      <div className="prose pb-4">
        <h2 className="text-center">Create New Legislator</h2>
      </div>
      <Formik
        validationSchema={toFormikValidationSchema(formSchema)}
        validateOnBlur={false}
        initialValues={{
          firstName: "",
          lastName: "",
          state: "UNKNOWN",
          party: "UNKNOWN",
          chamber: "UNKNOWN",
        }}
        onSubmit={(
          values: FormValues,
          { setSubmitting }: FormikHelpers<FormValues>
        ) => {
          handleSubmit(values);
        }}
      >
        <Form className="grid place-items-start gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="firstName">First Name</label>
            <div>
              <Field className="input-bordered input" name="firstName" />
              <ErrorMessage
                name="firstName"
                render={(msg) => errorMessage(msg)}
              />
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="lastName">Last Name</label>
            <div>
              <Field className="input-bordered input" name="lastName" />
              <ErrorMessage
                name="lastName"
                render={(msg) => errorMessage(msg)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="state">State</label>
            <div>
              <Field
                className="select-bordered select"
                as="select"
                name="state"
              >
                {stateOptionElements}
              </Field>
              <ErrorMessage name="state" render={(msg) => errorMessage(msg)} />
            </div>
          </div>
          <div>
            <label htmlFor="party">Party</label>
            <div>
              <Field
                className="select-bordered select"
                as="select"
                name="party"
              >
                <option value="Democrat">Democrat</option>
                <option value="Republican">Republican</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="party" render={(msg) => errorMessage(msg)} />
            </div>
          </div>
          <div>
            <label htmlFor="chamber">Chamber</label>
            <div>
              <Field
                className="select-bordered select"
                as="select"
                name="chamber"
              >
                <option value="House">House</option>
                <option value="Senate">Senate</option>
              </Field>
              <ErrorMessage
                name="chamber"
                render={(msg) => errorMessage(msg)}
              />
            </div>
          </div>
          <div className="">
            <button className="btn-success btn" type="submit">
              Create
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewLegislatorForm;
