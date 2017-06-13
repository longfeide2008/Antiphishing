import numpy


def find_lcsubstr(s1, s2):
    m = [[0 for i in range(len(s2)+1)] for j in range(len(s1)+1)]  # 生成0矩阵，为方便后续计算，比字符串长度多了一列
    mmax = 0   # 最长匹配的长度
    p = 0  # 最长匹配对应在s1中的最后一位
    for i in range(len(s1)):
        for j in range(len(s2)):
            if s1[i] == s2[j]:
                m[i+1][j+1] = m[i][j]+1
                if m[i+1][j+1] > mmax:
                    mmax = m[i+1][j+1]
                    p = i+1
    return s1[p-mmax:p], mmax   # 返回最长子串及其长度
    # return s1[p-mmax:p]  # 只返回子串


def find_lcseque(s1, s2):
    # 生成字符串长度加1的0矩阵，m用来保存对应位置匹配的结果
    m = [[0 for x in range(len(s2)+1) ] for y in range(len(s1)+1) ]
    # d用来记录转移方向
    d = [[None for x in range(len(s2)+1) ] for y in range(len(s1)+1) ]

    for p1 in range(len(s1)):
        for p2 in range(len(s2)):
            if s1[p1] == s2[p2]:            # 字符匹配成功，则该位置的值为左上方的值加1
                m[p1+1][p2+1] = m[p1][p2]+1
                d[p1+1][p2+1] = 'ok'
            elif m[p1+1][p2] > m[p1][p2+1]:  # 左值大于上值，则该位置的值为左值，并标记回溯时的方向
                m[p1+1][p2+1] = m[p1+1][p2]
                d[p1+1][p2+1] = 'left'
            else:                           # 上值大于左值，则该位置的值为上值，并标记方向up
                m[p1+1][p2+1] = m[p1][p2+1]
                d[p1+1][p2+1] = 'up'
    (p1, p2) = (len(s1), len(s2))
    # print(numpy.array(d))
    s = []
    while m[p1][p2]:    # 不为None时
        c = d[p1][p2]
        if c == 'ok':   # 匹配成功，插入该字符，并向左上角找下一个
            s.append(s1[p1-1])
            p1 -= 1
            p2 -= 1
        if c == 'left':  # 根据标记，向左找下一个
            p2 -= 1
        if c == 'up':   # 根据标记，向上找下一个
            p1 -= 1
    s.reverse()
    return ''.join(s)


if __name__ == '__main__':
    print(find_lcsubstr('abcdfg', 'abdfg'))
    print(find_lcseque('abdfg', 'abcdfg'))