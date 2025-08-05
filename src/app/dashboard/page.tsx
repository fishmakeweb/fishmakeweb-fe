"use client";

import { useAuth, withAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle, XCircle, AlertCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { authService } from "@/lib/auth";
import Link from "next/link";

interface Enrollment {
  id: string;
  courseCode: string;
  courseName: string;
  status: string;
  requestDate: string;
  message?: string;
}

function StudentDashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestingEnrollment, setIsRequestingEnrollment] = useState(false);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      if (!user?.userId) return;

      const response = await authService.authenticatedFetch(
        `https://localhost:7001/api/v1/enrollment/student/${user.userId}`
      );

      if (response.ok) {
        const result = await response.json();
        setEnrollments(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestEnrollment = async () => {
    if (!user?.userId) return;
    
    setIsRequestingEnrollment(true);
    try {
      const response = await authService.authenticatedFetch(
        'https://localhost:7001/api/v1/enrollment/request',
        {
          method: 'POST',
          body: JSON.stringify({
            studentId: user.userId,
            courseCode: 'WED201c',
            message: 'Tôi muốn đăng ký khóa học Web Development Basics để học lập trình web.'
          }),
        }
      );

      if (response.ok) {
        await fetchEnrollments(); // Refresh the list
      } else {
        const result = await response.json();
        alert(result.message || 'Không thể gửi yêu cầu đăng ký');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi yêu cầu đăng ký');
    } finally {
      setIsRequestingEnrollment(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Đã duyệt</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" />Từ chối</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1" />Chờ duyệt</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100"><AlertCircle className="w-3 h-3 mr-1" />Chưa rõ</Badge>;
    }
  };

  const hasWED201cEnrollment = enrollments.some(e => e.courseCode === 'WED201c');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Chào mừng {user?.fullname}! Quản lý khóa học của bạn.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khóa học đã đăng ký</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrollments.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khóa học đã duyệt</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrollments.filter(e => e.status.toLowerCase() === 'approved').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đang chờ duyệt</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrollments.filter(e => e.status.toLowerCase() === 'pending').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Courses */}
        {!hasWED201cEnrollment && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Khóa học có sẵn</CardTitle>
              <CardDescription>Đăng ký khóa học để bắt đầu học lập trình</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">WED201c - Web Development Basics</h3>
                  <p className="text-sm text-gray-600">
                    Học HTML, CSS và JavaScript cơ bản để xây dựng website
                  </p>
                </div>
                <Button 
                  onClick={requestEnrollment}
                  disabled={isRequestingEnrollment}
                  className="ml-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isRequestingEnrollment ? 'Đang gửi...' : 'Đăng ký'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enrolled Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Khóa học của tôi</CardTitle>
            <CardDescription>Danh sách các khóa học bạn đã đăng ký</CardDescription>
          </CardHeader>
          <CardContent>
            {enrollments.length > 0 ? (
              <div className="space-y-4">
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{enrollment.courseName}</h3>
                          {getStatusBadge(enrollment.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Mã khóa học: {enrollment.courseCode}
                        </p>
                        <p className="text-sm text-gray-500">
                          Ngày đăng ký: {new Date(enrollment.requestDate).toLocaleDateString('vi-VN')}
                        </p>
                        {enrollment.message && (
                          <p className="text-sm text-gray-600 mt-2 italic">
                            &quot;{enrollment.message}&quot;
                          </p>
                        )}
                      </div>
                      <div className="ml-4">
                        {enrollment.status.toLowerCase() === 'approved' && (
                          <Link href={`/programs/${enrollment.courseCode.toLowerCase()}`}>
                            <Button size="sm">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Vào học
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Bạn chưa đăng ký khóa học nào</p>
                <p className="text-sm">Hãy đăng ký khóa học WED201c để bắt đầu học lập trình!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(StudentDashboard, 'Student');