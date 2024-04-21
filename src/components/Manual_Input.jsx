import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, TextInput, Label } from "flowbite-react";
import { setAlert } from "../features/alert/alertSlice";
import { setBank } from "../features/bankMode/bankSlice";
import { useNavigate } from "react-router-dom";

export default function InputArea() {
  let navigate = useNavigate();
  const [qrdata, setQrData] = useState("");
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [decode, setDecode] = useState("");

  const handelonchange1 = (e) => {
    setName(e.target.value);
  };

  const handelonchange2 = (e) => {
    setNumber(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) {
      dispatch(
        setAlert({
          message: "Name and number cannot be empty.",
          type: "warning",
        })
      );
    } else if (
      number.length !== 10 ||
      !(number.startsWith("97") || number.startsWith("98"))
    ) {
      dispatch(
        setAlert({
          message: "Number must be a 10-digit number starting with 97 or 98.",
          type: "warning",
        })
      );
    } else {
      const data = {
        eSewa_id: number,
        name: name,
      };
      setQrData(JSON.stringify(data));
    }
  };

  const handleSubmit_Decoded = (e) => {
    e.preventDefault();
    let parsedDecode;
    try {
      parsedDecode = JSON.parse(decode);
    } catch (error) {
      console.error("Invalid JSON:", error);
      dispatch(
        setAlert({
          message: "Invalid JSON input.",
          type: "warning",
        })
      );
      return;
    }
    if (!parsedDecode.eSewa_id || !parsedDecode.name) {
      dispatch(
        setAlert({
          message: "Decoded code must contain 'eSewa_id' and 'name'.",
          type: "warning",
        })
      );
      return;
    }
    if (
      parsedDecode.eSewa_id.length !== 10 ||
      !(
        parsedDecode.eSewa_id.startsWith("97") ||
        parsedDecode.eSewa_id.startsWith("98")
      )
    ) {
      dispatch(
        setAlert({
          message:
            "'eSewa_id' must be a 10-digit number starting with 97 or 98.",
          type: "warning",
        })
      );
      return;
    }
    setQrData(decode);
  };

  useEffect(() => {
    if (qrdata) {
      dispatch(setBank({ decodedCode: qrdata }));
      navigate("/output", { state: qrdata });
    }
  }, [qrdata]);

  return (
    <>
      <div className="w-full mt-5 flex flex-col md:flex-row md:justify-around mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-2/5 flex flex-col gap-4 mb-4 md:mb-0 md:mr-2"
        >
          <p className="py-1 text-xl font-mono font-medium">
            Fill your eSewa details
          </p>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="eSewa Name" />
            </div>
            <TextInput
              id="text"
              type="text"
              value={name}
              placeholder="Raju Sharma"
              onChange={handelonchange1}
              required
            />
          </div>
          <div>
            <div className="mb-2 block ">
              <Label htmlFor="number" value="eSewa Number" />
            </div>
            <TextInput
              id="number"
              type="number"
              value={number}
              placeholder="10 digit number"
              onChange={handelonchange2}
              required
            />
          </div>
          <Button type="submit">Generate</Button>
        </form>

        <form
          onSubmit={handleSubmit_Decoded}
          className="w-full md:w-2/5 flex flex-col gap-4 md:ml-2"
        >
          <p className="py-1 text-xl font-mono font-medium">
            Input your decode code of esewa only:
          </p>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Decoded code" />
            </div>
            <TextInput
              id="text"
              type="text"
              placeholder='{"eSewa_id":"9819898080","name":"Ranju Thakur"}'
              value={decode}
              onChange={(e) => {
                setDecode(e.target.value);
              }}
              required
            />
          </div>
          <Button type="submit">Generate</Button>
        </form>
      </div>
    </>
  );
}
