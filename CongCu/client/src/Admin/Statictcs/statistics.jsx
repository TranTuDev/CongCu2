
import React, { useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
    ResponsiveContainer
} from 'recharts';
import {
    CreditCard,
    Film,
    Ticket,
    Popcorn,
    Coffee,
    MoreHorizontal
} from 'lucide-react';
import './Statistics.css';

const Statistics = () => {
    const [activeTab, setActiveTab] = useState('Weekly');
    const spendingData = [
        { name: 'Movie Tickets', value: 45, color: '#8B5CF6' },
        { name: 'Concessions', value: 25, color: '#3B82F6' },
        { name: 'VIP Seats', value: 20, color: '#EF4444' },
        { name: 'Beverages', value: 10, color: '#F59E0B' }
    ];
    const comparisonData = [
        { day: 'Mon', lastWeek: 450, currentWeek: 520 },
        { day: 'Tue', lastWeek: 380, currentWeek: 420 },
        { day: 'Wed', lastWeek: 320, currentWeek: 380 },
        { day: 'Thu', lastWeek: 600, currentWeek: 650 },
        { day: 'Fri', lastWeek: 850, currentWeek: 920 },
        { day: 'Sat', lastWeek: 1200, currentWeek: 1350 },
        { day: 'Sun', lastWeek: 1100, currentWeek: 1180 }
    ];

    // Data cho biểu đồ đường Revenue Trend
    const revenueData = [
        { month: 'Dec 23', revenue: 1000 },
        { month: 'Jan 24', revenue: 4000 },
        { month: 'Feb 24', revenue: 4500 },
        { month: 'Mar 24', revenue: 5000 },
        { month: 'Apr 24', revenue: 7500 },
        { month: 'May 24', revenue: 6000 },
        { month: 'Jun 24', revenue: 7000 },
        { month: 'Jul 24', revenue: 4500 },
        { month: 'Aug 24', revenue: 3000 },
        { month: 'Sep 24', revenue: 5000 },
        { month: 'Oct 24', revenue: 6000 },
        { month: 'Nov 24', revenue: 6500 }
    ];

    // Data cho Top 10 Cinema Transactions
    const expensesData = [
        {
            id: 1,
            name: 'Avatar: The Way of Water',
            date: 'Tue, Dec 1',
            time: '10:18 AM',
            method: 'VISA',
            card: '*5439',
            amount: '$45.00',
            icon: Film,
            color: '#E91E63',
            type: 'Movie Ticket'
        },
        {
            id: 2,
            name: 'Top Gun: Maverick',
            date: 'Wed, Dec 4',
            time: '5:05 PM',
            method: 'VISA',
            card: '*5129',
            amount: '$35.50',
            icon: Ticket,
            color: '#2196F3',
            type: 'VIP Seat'
        },
        {
            id: 3,
            name: 'Large Popcorn Combo',
            date: 'Wed, Dec 4',
            time: '5:39 PM',
            method: 'VISA',
            card: '*9789',
            amount: '$18.75',
            icon: Popcorn,
            color: '#4CAF50',
            type: 'Concession'
        },
        {
            id: 4,
            name: 'Spider-Man: No Way Home',
            date: 'Fri, Dec 6',
            time: '4:27 PM',
            method: 'VISA',
            card: '*2346',
            amount: '$42.00',
            icon: Film,
            color: '#FF9800',
            type: 'Movie Ticket'
        },
        {
            id: 5,
            name: 'Medium Soda & Nachos',
            date: 'Fri, Dec 6',
            time: '10:02 AM',
            method: 'VISA',
            card: '',
            amount: '$15.50',
            icon: Coffee,
            color: '#4CAF50',
            type: 'Beverage'
        },
        {
            id: 6,
            name: 'Black Panther: Wakanda Forever',
            date: 'Wed, Dec 4',
            time: '2:34 PM',
            method: 'VISA',
            card: '',
            amount: '$38.00',
            icon: Film,
            color: '#9C27B0',
            type: 'Movie Ticket'
        },
        {
            id: 7,
            name: 'Premium Candy Pack',
            date: 'Fri, Dec 6',
            time: '12:35 PM',
            method: 'VISA',
            card: '*5846',
            amount: '$12.25',
            icon: Popcorn,
            color: '#795548',
            type: 'Concession'
        }
    ];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize="12"
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="statistics-container">
            {/* Top Row */}
            <div className="dashboard-grid">
                {/* Spending Categories */}
                <div className="chart-card">
                    <div className="card-header">
                        <h3 className="card-title">Spending Categories</h3>
                        <div className="card-options">
                            <button className={`option-btn ${activeTab === 'Weekly' ? 'active' : ''}`}>
                                Weekly
                            </button>
                            <button className="option-btn">Monthly</button>
                            <button className="option-btn">Custom</button>
                        </div>
                    </div>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={spendingData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {spendingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="spending-summary">
                        <h2 className="total-amount">$2,440.65</h2>
                        <p className="period-text">Cinema revenue for this period</p>
                        <p className="period-text">from Jul 7 to Jul 13</p>
                    </div>
                    <div className="legend">
                        {spendingData.map((item) => (
                            <div key={item.name} className="legend-item">
                                <div
                                    className="legend-color"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span>{item.name} ({item.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cinema Sales Comparison */}
                <div className="chart-card">
                    <div className="card-header">
                        <h3 className="card-title">Cinema Sales Comparison</h3>
                        <div className="card-options">
                            <MoreHorizontal size={20} />
                            <button className="option-btn active">Weekly</button>
                            <button className="option-btn">Monthly</button>
                            <button className="option-btn">Custom</button>
                        </div>
                    </div>

                    <div className="bar-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={comparisonData} barCategoryGap="20%">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="lastWeek" fill="#E5E7EB" name="Last week" />
                                <Bar dataKey="currentWeek" fill="#F97316" name="Current week" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="dashboard-bottom">
                {/* Top 10 Cinema Transactions */}
                <div className="chart-card">
                    <div className="card-header">
                        <h3 className="card-title">Top 10 Cinema Transactions</h3>
                        <div className="card-options">
                            <button className="option-btn active">Weekly</button>
                            <button className="option-btn">Monthly</button>
                            <button className="option-btn">Custom</button>
                        </div>
                    </div>

                    <div className="expense-list">
                        {expensesData.map((expense) => {
                            const IconComponent = expense.icon;
                            return (
                                <div key={expense.id} className="expense-item">
                                    <div
                                        className="expense-icon"
                                        style={{ backgroundColor: expense.color }}
                                    >
                                        <IconComponent size={20} />
                                    </div>
                                    <div className="expense-details">
                                        <h4 className="expense-name">{expense.name}</h4>
                                        <p className="expense-date">{expense.date}, {expense.time}</p>
                                        <div className="expense-method">
                                            <span className="expense-type">{expense.type}</span>
                                            <span>{expense.method}</span>
                                            {expense.card && <span>{expense.card}</span>}
                                        </div>
                                    </div>
                                    <div className="expense-amount">{expense.amount}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Revenue Trend */}
                <div className="chart-card">
                    <div className="card-header">
                        <h3 className="card-title">Revenue Trend</h3>
                        <div className="card-options">
                            <MoreHorizontal size={20} />
                            <button className="option-btn active">Weekly</button>
                            <button className="option-btn">Monthly</button>
                            <button className="option-btn">Custom</button>
                        </div>
                    </div>

                    <div className="line-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;