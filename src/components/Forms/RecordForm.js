import React, { useEffect, useState } from 'react';
import { useCategories } from "../../contexts/CategoriesContext";
import {
    Alert, AlertIcon,
    Button,
    FormControl,
    Grid,
    GridItem,
    Input,
    NumberInput,
    NumberInputField,
} from "@chakra-ui/react";
import Select from 'react-select';
import Buttons from "../MyButtons/Buttons";
import moment from "moment";
import DeleteButton from "../MyButtons/DeleteButton";
import {useModal} from "../../contexts/ModalContext";

const RecordForm = ({ isEdit, existingRecord, dateFromCal, refreshEvents }) => {
    const { closeModal } = useModal();
    const { categories } = useCategories();
    const [error, setError] = useState(null);
    const [recordId, setRecordId] = useState(isEdit ? existingRecord.cashflowRecordId : null);
    const [amount, setAmount] = useState(existingRecord ? existingRecord.amount : '');
    const [desc, setDesc] = useState(existingRecord ? existingRecord.desc : '');
    const [recordType, setRecordType] = useState(existingRecord ? existingRecord.recordType : 1);
    const [prevCategory, setPrevCategory] = useState(null); //do wyświetlenia w formie
    const [presentCategory, setPresentCategory] = useState(null);
    const [startDate, setStartDate] = useState(
        existingRecord ? existingRecord.startDate : dateFromCal ? moment(dateFromCal).format('YYYY-MM-DD') : ''
    );
    const [selectedDate, setSelectedDate] = useState(
        dateFromCal ? moment(dateFromCal).format('YYYY-MM-DD') : ''
    );

    useEffect(() => {
        if (isEdit && existingRecord && existingRecord.categoryId) {
            const matchingCategory = categories.find(
                (category) => category.categoryId === existingRecord.categoryId
            );
            if (matchingCategory) {
                setPrevCategory(matchingCategory);
                setPresentCategory({
                    value: matchingCategory.categoryId,
                    label: matchingCategory.title,
                    color: matchingCategory.color,
                });
            }
        }
    }, [isEdit, existingRecord, categories]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount || isNaN(parseFloat(amount))) {
            setError("Please enter a valid amount");
            return;
        }
        if (!desc) {
            setError("Description cannot be empty");
            return;
        }
        if (!startDate) {
            setError("Please select a date");
            return;
        }

        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');

        const finalStartDate = startDate || selectedDate;

        if (!finalStartDate) {
            console.error("Start date is missing");
            return;
        }

        const adjustedStartDate = moment(finalStartDate, 'YYYY-MM-DD')
            .set({ hour: 12, minute: 0, second: 0 })
            .toISOString();

        const categoryId = presentCategory?.value;

        // Przygotowanie danych w formie listy (nawet jeśli jest to pojedynczy rekord)
        const records = [
            {
                cashflowRecordId: isEdit ? recordId : null, // Jeśli edytujemy, dodajemy ID
                amount: parseFloat(amount),
                startDate: adjustedStartDate,
                recordType: recordType,
                desc,
                categoryId,
            },
        ];

        const url = isEdit
            ? `http://localhost:8080/user/${userId}/editRecords`
            : `http://localhost:8080/user/${userId}/addExpense`;

        fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(records), // Wysyłamy listę rekordów
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(isEdit ? 'Records updated:' : 'Records added:', data);
                console.log('refreshEvents in RecordForm:', refreshEvents);
                setError("");
                closeModal();
                refreshEvents();
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };


    // Przygotowanie opcji dla react-select
    const categoryOptions = categories.map((category) => ({
        value: category.categoryId,
        label: category.title,
        color: category.color,
    }));

    // Niestandardowe style dla react-select
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: presentCategory ? presentCategory.color : '#fff',
            borderColor: '#ffffff',
            margin: '12px',
            boxShadow: state.isFocused ? null : null,
        }),
        option: (provided, { data, isFocused, isSelected }) => ({
            ...provided,
            backgroundColor: isFocused ? data.color : isSelected ? data.color : null,
            color: '#000',
            cursor: 'pointer',
        }),
        singleValue: (provided, { data }) => ({
            ...provided,
            color: '#000',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999, // Aby menu było na wierzchu
        }),
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <Grid
                    m={3}
                    templateColumns="auto auto 1fr"
                    gap={4}
                    alignItems="center"
                >
                    {/*<GridItem>*/}
                    {/*    <Button*/}
                    {/*        onClick={() => setRecordType(false)}*/}
                    {/*        opacity={recordType ? '45%' : '100%'}*/}
                    {/*    >*/}
                    {/*        +*/}
                    {/*    </Button>*/}
                    {/*</GridItem>*/}
                    <GridItem>
                        <Button
                            onClick={() => setRecordType(true)}
                            opacity={recordType ? '100%' : '45%'}
                        >
                            -
                        </Button>
                    </GridItem>
                    <GridItem>
                        <NumberInput
                            borderColor="#ffffff"
                            precision={2}
                            value={amount === "" ? "" : amount} // Pokaż pusty ciąg, jeśli pole jest puste
                            max={999999}
                            placeholder="Cashflow amount"
                            onChange={(valueAsString) => {
                                // Zamiana przecinka na kropkę i obsługa pustego pola
                                const normalizedValue = valueAsString.replace(",", ".");
                                if (normalizedValue === "") {
                                    setAmount("");
                                    return;
                                }

                                // Walidacja wartości jako liczby
                                if (!isNaN(normalizedValue) && /^[0-9]*\.?[0-9]*$/.test(normalizedValue)) {
                                    setAmount(normalizedValue);
                                }
                            }}
                            onBlur={() => {
                                // Formatowanie wartości na liczbę z dwoma miejscami po przecinku po utracie focusu
                                if (amount === "" || isNaN(amount)) {
                                    setAmount(""); // Pole pozostaje puste
                                } else {
                                    setAmount(parseFloat(amount).toFixed(2)); // Formatowanie do dwóch miejsc po przecinku
                                }
                            }}
                        >
                            <NumberInputField
                                onKeyDown={(e) => {
                                    // Umożliwienie wpisania przecinka jako separatora dziesiętnego
                                    if (e.key === ",") {
                                        e.preventDefault();
                                        const inputElement = e.target;
                                        const cursorPosition = inputElement.selectionStart;

                                        const newValue =
                                            amount.slice(0, cursorPosition) + "." + amount.slice(cursorPosition);
                                        setAmount(newValue);
                                    }
                                }}
                            />
                        </NumberInput>
                    </GridItem>
                </Grid>

                <Input
                    borderColor='#ffffff'
                    m={3}
                    placeholder="Your cashflow description :)"
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <Input
                    borderColor='#ffffff'
                    m={3}
                    type="date"
                    value={startDate ? startDate : selectedDate}
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <Select
                    styles={customStyles}
                    options={categoryOptions}
                    value={presentCategory}
                    placeholder="Choose a category"
                    onChange={(selectedOption) => setPresentCategory(selectedOption)}
                />
            </FormControl>
            <Buttons label="Confirm" onClick={handleSubmit} />
            {isEdit && (
                <DeleteButton
                    recordIds={existingRecord.cashflowRecordId}
                    onDelete={(id) => {
                        console.log(`Record with id ${id} deleted.`);
                        console.log('refreshEvents in RecordForm:', refreshEvents);
                        refreshEvents();
                        closeModal();
                    }}
                />
            )}

            {error && (
                <Alert status="error" marginY={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}
        </form>
    );
};

export default React.memo(RecordForm);
