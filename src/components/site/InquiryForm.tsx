"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitInquiryAction, type InquiryActionState } from "@/actions/public";
import {
  buildGeneralInquiryMessage,
  buildVehicleInquiryMessage,
  buildWhatsAppLink,
  formatScheduleDateTime,
} from "@/lib/whatsapp";

type ServiceTypeOption = { id: string; name: string };

export function InquiryForm({
  serviceTypes,
  vehicle,
  whatsapp,
  compact = false,
}: {
  serviceTypes?: ServiceTypeOption[];
  vehicle?:
    | {
        id: string;
        name: string;
        vehicleType: string | null;
        seats: number | null;
        ac: boolean;
        luggageCapacity: string | null;
      }
    | null;
  whatsapp: string | null;
  compact?: boolean;
}) {
  const initialState: InquiryActionState = null;
  const [state, formAction, isPending] = useActionState(
    submitInquiryAction,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  useEffect(() => {
    if (state?.success && state.whatsappData) {
      setSubmittedOnce(true);
      formRef.current?.reset();
    }
  }, [state]);

  const whatsappLink =
    state?.success && state.whatsappData && whatsapp
      ? buildWhatsAppLink(
          whatsapp,
          state.whatsappData.carName
            ? buildVehicleInquiryMessage({
                name: state.whatsappData.name,
                phone: state.whatsappData.phone,
                carName: state.whatsappData.carName,
                carSpecs: state.whatsappData.carSpecs ?? "N/A",
                pickupLocation: state.whatsappData.pickupLocation,
                dropoffLocation: state.whatsappData.dropoffLocation,
                dateTime: formatScheduleDateTime(
                  state.whatsappData.dateTime.split(" ")[0],
                  state.whatsappData.dateTime.split(" ")[1]
                ),
              })
            : buildGeneralInquiryMessage({
                name: state.whatsappData.name,
                phone: state.whatsappData.phone,
                serviceType: state.whatsappData.serviceType,
                pickupLocation: state.whatsappData.pickupLocation,
                dropoffLocation: state.whatsappData.dropoffLocation,
                dateTime: formatScheduleDateTime(
                  state.whatsappData.dateTime.split(" ")[0],
                  state.whatsappData.dateTime.split(" ")[1]
                ),
              })
        )
      : null;

  const inputClass =
    "w-full rounded-xl border border-[var(--color-border)] bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/40";

  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]";

  return (
    <div
      className={
        compact
          ? ""
          : "glass-panel rounded-3xl p-6 shadow-2xl sm:p-8"
      }
    >
      {!compact && (
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl brand-gradient text-white">
            📅
          </span>
          <div>
            <h3 className="text-lg font-bold text-white">
              Check Ride Availability
            </h3>
            <p className="text-sm text-[var(--color-muted)]">
              Tell us your trip details and we&apos;ll get back to you.
            </p>
          </div>
        </div>
      )}

      {submittedOnce && whatsappLink ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
          <p className="text-base font-semibold text-emerald-300">
            Your request has been received!
          </p>

          <p className="text-sm text-emerald-100/80">
            Click below to open WhatsApp with your pre-filled request. Please
            review the message and press send.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 focus-ring"
          >
            Open WhatsApp &amp; Send Request
          </a>

          <button
            type="button"
            onClick={() => setSubmittedOnce(false)}
            className="text-xs font-medium text-[var(--color-muted)] underline underline-offset-4"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form ref={formRef} action={formAction} className="space-y-4">
          {vehicle && (
            <input
              type="hidden"
              name="selectedVehicleId"
              value={vehicle.id}
            />
          )}

          {vehicle && (
            <div className="rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                Selected Vehicle
              </p>

              <p className="text-sm font-semibold text-white">
                {vehicle.name}
                {vehicle.vehicleType
                  ? ` · ${vehicle.vehicleType}`
                  : ""}
              </p>

              <p className="text-xs text-slate-300">
                {[
                  vehicle.seats ? `${vehicle.seats} Seats` : null,
                  vehicle.ac ? "AC" : "Non-AC",
                  vehicle.luggageCapacity,
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="passengerName"
                className={labelClass}
              >
                Passenger Name
              </label>

              <input
                id="passengerName"
                name="passengerName"
                required
                className={inputClass}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="contactNumber"
                className={labelClass}
              >
                Contact Number
              </label>

              <input
                id="contactNumber"
                name="contactNumber"
                required
                className={inputClass}
                placeholder="+971 5XXXXXXXX"
              />
            </div>
          </div>

          {!vehicle &&
            serviceTypes &&
            serviceTypes.length > 0 && (
              <div>
                <label
                  htmlFor="serviceTypeId"
                  className={labelClass}
                >
                  Service Type{" "}
                  <span className="normal-case text-slate-400">
                    (optional)
                  </span>
                </label>

                <select
                  id="serviceTypeId"
                  name="serviceTypeId"
                  className={inputClass}
                  defaultValue=""
                >
                  <option
                    value=""
                    className="bg-slate-900 text-white"
                  >
                    Select a service (optional)
                  </option>

                  {serviceTypes.map((st) => (
                    <option
                      key={st.id}
                      value={st.id}
                      className="bg-slate-900 text-white"
                    >
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="pickupLocation"
                className={labelClass}
              >
                Pickup Location
              </label>

              <input
                id="pickupLocation"
                name="pickupLocation"
                required
                className={inputClass}
                placeholder="Enter pickup location"
              />
            </div>

            <div>
              <label
                htmlFor="dropoffLocation"
                className={labelClass}
              >
                Drop-off Location
              </label>

              <input
                id="dropoffLocation"
                name="dropoffLocation"
                required
                className={inputClass}
                placeholder="Enter dropoff location"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="scheduleDate"
                className={labelClass}
              >
                Schedule Date
              </label>

              <input
                id="scheduleDate"
                type="date"
                name="scheduleDate"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="scheduleTime"
                className={labelClass}
              >
                Schedule Time
              </label>

              <input
                id="scheduleTime"
                type="time"
                name="scheduleTime"
                required
                className={inputClass}
              />
            </div>
          </div>

          {state?.error && (
            <p
              role="alert"
              className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-300"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-[var(--color-button)] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[var(--color-button-hover)] disabled:opacity-60 focus-ring"
          >
            {isPending
              ? "Submitting..."
              : vehicle
                ? "Request This Vehicle"
                : "Check Availability"}
          </button>

          <p className="text-center text-xs text-slate-400">
            We&apos;ll open WhatsApp with your request pre-filled — you stay
            in control and press send.
          </p>
        </form>
      )}
    </div>
  );
}