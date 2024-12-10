import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Select, MenuItem } from '@mui/material';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BoxContainer, FormContainer } from './SystemUsageListStyle';
import LogoutIcon from '@mui/icons-material/Logout';
import { USAGE_LIST, USER_LIST } from '../../apiinterface';

interface SystemUsage {
    remoteId: string;
    remoteName: string;
    usedBy: string;
    role: string;
}

interface User {
    id: string;
    name: string;
}


export default function SystemUsageList() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [data, setData] = useState<SystemUsage[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchData();
        fetchUserList();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(USAGE_LIST, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result)
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUserList = async () => {
        try {
            const response = await fetch(USER_LIST, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result)
            setUsers(result.data);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const updateUsedBy = async (remoteId: string, newUsedBy: string) => {
        try {
            const response = await fetch(`${USAGE_LIST}/${remoteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usedBy: newUsedBy }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(`Updated remoteId: ${remoteId} with usedBy: ${newUsedBy}`);
        } catch (error) {
            console.error("Error updating usedBy:", error);
        }
    };

    const handleUsedByChange = (remoteId: string, newUsedBy: string) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.remoteId === remoteId
                    ? { ...item, usedBy: newUsedBy }
                    : item
            )
        );
        updateUsedBy(remoteId, newUsedBy); // Trigger the API call to save changes
    };




    const filteredData = Array.isArray(data)
        ? data.filter((item) =>
            item.remoteId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.remoteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.usedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <FormContainer style={{ padding: '20px', fontFamily: 'Arial', marginBottom: 50 }}>
            <h2 style={{ color: '#5F27CD' }}>System Usage List</h2>
            <Button variant="contained" color="primary" style={{ backgroundColor: '#5F27CD', marginLeft: 1200 }}>
                <LogoutIcon />
                Logout
            </Button>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: 620 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: <AiOutlineSearch size={20} style={{ color: '#5F27CD' }} />
                    }}
                />
            </div>
            <BoxContainer>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#5F27CD' }}>
                            <TableRow>
                                <TableCell>Remote ID</TableCell>
                                <TableCell>Remote Name</TableCell>
                                <TableCell>Used By</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.remoteId}>
                                    <TableCell>{item.remoteId}</TableCell>
                                    <TableCell>{item.remoteName}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={item.usedBy || ""} // Ensure the value corresponds to a valid user ID or is empty
                                            onChange={(e) => handleUsedByChange(item.remoteId, e.target.value)} // Update the usedBy state
                                            displayEmpty
                                            fullWidth
                                        >
                                            <MenuItem value="" disabled>
                                                Select User
                                            </MenuItem>
                                            {users.map((user) => (
                                                <MenuItem key={user.id} value={user.name}>
                                                    {user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>{item.role}</TableCell>
                                    <TableCell>
                                        <AiOutlineEdit
                                            size={20}
                                            style={{ marginRight: '10px', cursor: 'pointer' }}
                                            onClick={() => console.log('Edit clicked for ID:', item.remoteId)}
                                        />
                                        <AiOutlineDelete
                                            size={20}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setData(data.filter((d) => d.remoteId !== item.remoteId))}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button variant="contained" color="primary" style={{ backgroundColor: '#5F27CD' }}>
                        + Add
                    </Button>
                </TableContainer>
            </BoxContainer>
        </FormContainer>
    );
}
