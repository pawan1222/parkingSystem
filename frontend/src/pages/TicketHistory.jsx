import React, { useEffect, useState } from "react";
import axios from "axios";
import { Filter, Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

export default function TicketHistory() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [expandedTicketId, setExpandedTicketId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter and sort states
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest"); // 'latest' or 'oldest'
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(5);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/tickets", {
          withCredentials: true,
        });
        setTickets(res.data.tickets || []);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        setError("Could not load ticket history.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Apply filters and sorting whenever tickets, statusFilter, or sortOrder changes
  useEffect(() => {
    let filtered = [...tickets];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(ticket => {
        const status = ticket.status?.toLowerCase() || "confirmed";
        return status === statusFilter.toLowerCase();
      });
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      if (sortOrder === "latest") {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Oldest first
      }
    });

    setFilteredTickets(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [tickets, statusFilter, sortOrder]);

  const toggleTicket = (ticketId) => {
    setExpandedTicketId((prevId) => (prevId === ticketId ? null : ticketId));
  };

  const getStatusBadge = (status) => {
    const normalizedStatus = status?.toLowerCase() || "confirmed";
    const statusStyles = {
      booked: "bg-[#fca311]/20 text-[#fca311] border-[#fca311]/40",
      completed: "bg-[green]/20 text-[green] border-[#14213d]/40",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${statusStyles[normalizedStatus] || statusStyles.confirmed}`}>
        {status || "Confirmed"}
      </span>
    );
  };

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedTicketId(null); // Close expanded ticket when changing pages
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#14213d] to-[#000000] p-4">
        <div className="max-w-6xl mx-auto pt-20">
          <div className="text-center">
            <div className="relative mx-auto w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-[#e5e5e5]/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#fca311] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-[#e5e5e5] text-lg font-medium">Loading your tickets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#14213d] to-[#000000] p-4">
        <div className="max-w-6xl mx-auto pt-20">
          <div className="text-center bg-[#ffffff]/10 backdrop-blur-lg border border-[#e5e5e5]/20 rounded-2xl p-8">
            <p className="text-red-400 font-semibold text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14213d] to-[#000000] p-4">
      <div className="max-w-6xl mx-auto pt-20 pb-10">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ffffff] mb-4 tracking-tight">
            Your Ticket History
          </h1>
          <p className="text-[#e5e5e5]/80 text-lg max-w-2xl mx-auto">
            Manage and view all your parking tickets with advanced filtering and sorting options
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-[#ffffff]/10 backdrop-blur-lg rounded-2xl border border-[#e5e5e5]/20 p-6 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            
            {/* Status Filter */}
            <div className="flex items-center gap-4 group">
              <Filter className="w-5 h-5 text-[#fca311] transition-transform group-hover:scale-110" />
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-[#ffffff]">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#14213d]/80 border border-[#e5e5e5]/30 rounded-xl px-4 py-2 text-sm text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#fca311] focus:border-transparent transition-all duration-200 hover:border-[#fca311]/50"
                >
                  <option value="all">All Status</option>
                  <option value="booked">Booked</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-4 group">
              <Calendar className="w-5 h-5 text-[#fca311] transition-transform group-hover:scale-110" />
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-[#ffffff]">Sort:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-[#14213d]/80 border border-[#e5e5e5]/30 rounded-xl px-4 py-2 text-sm text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#fca311] focus:border-transparent transition-all duration-200 hover:border-[#fca311]/50"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="bg-[#fca311]/20 px-4 py-2 rounded-xl border border-[#fca311]/40">
              <span className="text-sm font-semibold text-[#fca311]">
                {filteredTickets.length} of {tickets.length} tickets
              </span>
            </div>
          </div>
        </div>

        {/* No Tickets Message */}
        {!tickets.length ? (
          <div className="text-center bg-[#ffffff]/10 backdrop-blur-lg border border-[#e5e5e5]/20 rounded-2xl p-16 shadow-xl">
            <div className="text-[#e5e5e5]/40 mb-6">
              <Calendar className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-[#ffffff] mb-4">No tickets found</h3>
            <p className="text-[#e5e5e5]/80 text-lg">You haven't booked any parking slots yet.</p>
          </div>
        ) : !filteredTickets.length ? (
          <div className="text-center bg-[#ffffff]/10 backdrop-blur-lg border border-[#e5e5e5]/20 rounded-2xl p-16 shadow-xl">
            <div className="text-[#e5e5e5]/40 mb-6">
              <Filter className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-[#ffffff] mb-4">No tickets match your filters</h3>
            <p className="text-[#e5e5e5]/80 text-lg">Try adjusting your filter criteria to see more results.</p>
          </div>
        ) : (
          <>
            {/* Tickets List */}
            <div className="space-y-6 mb-8">
              {currentTickets.map((ticket, index) => (
                <div
                  key={ticket._id}
                  className="bg-[#ffffff]/10 backdrop-blur-lg border border-[#e5e5e5]/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#fca311]/40 group"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div
                    className="flex justify-between items-center cursor-pointer p-6 hover:bg-[#ffffff]/5 transition-all duration-200 rounded-2xl"
                    onClick={() => toggleTicket(ticket._id)}
                  >
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <h3 className="font-bold text-xl text-[#ffffff] group-hover:text-[#fca311] transition-colors duration-200">
                          Ticket #{ticket._id.slice(-6).toUpperCase()}
                        </h3>
                        {getStatusBadge(ticket.status)}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-[#e5e5e5]/80">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#fca311]">Slot:</span>
                          <span>{ticket.slotId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#fca311]">Date:</span>
                          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#fca311]">Time:</span>
                          <span>{new Date(ticket.createdAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[#fca311] ml-6 transition-transform duration-200 group-hover:scale-110">
                      {expandedTicketId === ticket._id ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </div>

                  {expandedTicketId === ticket._id && (
                    <div className="border-t border-[#e5e5e5]/20 p-6 bg-[#000000]/20 rounded-b-2xl">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-6">
                          <div className="bg-[#ffffff]/5 p-4 rounded-xl border border-[#e5e5e5]/10">
                            <h4 className="font-bold text-[#fca311] mb-3 text-base">Lot Information</h4>
                            <p className="text-[#ffffff] mb-2 font-medium">{ticket.lotName}</p>
                            <p className="text-[#e5e5e5]/80">{ticket.lotAddress}</p>
                          </div>
                          
                          <div className="bg-[#ffffff]/5 p-4 rounded-xl border border-[#e5e5e5]/10">
                            <h4 className="font-bold text-[#fca311] mb-3 text-base">Slot Details</h4>
                            <p className="text-[#e5e5e5]/80 mb-2">
                              <span className="font-semibold text-[#ffffff]">Slot Number:</span> {ticket.slotNumber}
                            </p>
                            <p className="text-[#e5e5e5]/80">
                              <span className="font-semibold text-[#ffffff]">Vehicle:</span> {ticket.vehicleNumber}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-[#ffffff]/5 p-4 rounded-xl border border-[#e5e5e5]/10">
                            <h4 className="font-bold text-[#fca311] mb-3 text-base">Timing</h4>
                            <p className="text-[#e5e5e5]/80 mb-2">
                              <span className="font-semibold text-[#ffffff]">Start:</span> {new Date(ticket.startTime).toLocaleString()}
                            </p>
                            <p className="text-[#e5e5e5]/80">
                              <span className="font-semibold text-[#ffffff]">End:</span> {new Date(ticket.endTime).toLocaleString()}
                            </p>
                          </div>

                          <div className="bg-[#ffffff]/5 p-4 rounded-xl border border-[#e5e5e5]/10">
                            <h4 className="font-bold text-[#fca311] mb-3 text-base">Payment</h4>
                            <p className="text-[#e5e5e5]/80 mb-2">
                              <span className="font-semibold text-[#ffffff]">Charges:</span> {ticket.charges}
                            </p>
                            {ticket.paymentId && (
                              <p className="text-[#e5e5e5]/80">
                                <span className="font-semibold text-[#ffffff]">Payment ID:</span> {ticket.paymentId}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl bg-[#ffffff]/10 border border-[#e5e5e5]/20 text-[#e5e5e5] hover:bg-[#fca311]/20 hover:border-[#fca311]/40 hover:text-[#fca311] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 backdrop-blur-lg ${
                        currentPage === number
                          ? 'bg-[#fca311] text-[#000000] border border-[#fca311]'
                          : 'bg-[#ffffff]/10 border border-[#e5e5e5]/20 text-[#e5e5e5] hover:bg-[#fca311]/20 hover:border-[#fca311]/40 hover:text-[#fca311]'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl bg-[#ffffff]/10 border border-[#e5e5e5]/20 text-[#e5e5e5] hover:bg-[#fca311]/20 hover:border-[#fca311]/40 hover:text-[#fca311] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}